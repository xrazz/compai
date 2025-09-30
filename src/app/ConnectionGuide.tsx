"use client";

import { System } from "./page";

type GuideContent = {
  title: string;
  description: string;
  whatToMonitor: string[];
  howToConnect: string[];
  sdk: {
    name: string;
    install: string;
  };
  apiExample: string;
};

const guides: Record<System, GuideContent> = {
  aws: {
    title: "Connect to AWS",
    description:
      "To monitor AWS, you need to provide read-only credentials for your Compliance AI backend to access logging and configuration services.",
    whatToMonitor: [
      "AWS CloudTrail (for API call logging)",
      "AWS Config (for resource configuration changes)",
      "IAM (for user permissions and roles)",
      "S3 Bucket Policies (for public access)",
    ],
    howToConnect: [
      "Create a read-only IAM Role in your AWS account with permissions for CloudTrail, Config, and IAM.",
      "Store the Role ARN and an External ID securely in your Compliance AI backend.",
      "Your backend will use the AWS SDK to assume this role and fetch compliance data.",
      "For real-time events, set up an Amazon EventBridge rule to forward events to a webhook API endpoint in your app.",
    ],
    sdk: {
      name: "AWS SDK for JavaScript v3",
      install: "npm install @aws-sdk/client-cloudtrail @aws-sdk/client-config",
    },
    apiExample: `// src/app/api/aws/route.ts
import { CloudTrailClient, DescribeTrailsCommand } from "@aws-sdk/client-cloudtrail";

export async function GET(request: Request) {
  // WARNING: Securely manage credentials. Do not hardcode them.
  const client = new CloudTrailClient({ region: "us-east-1" });
  const command = new DescribeTrailsCommand({});
  const response = await client.send(command);
  
  // Check if trails have encryption enabled, etc.
  return new Response(JSON.stringify(response.trailList));
}`,
  },
  github: {
    title: "Connect to GitHub",
    description:
      "Connect to GitHub by installing the Compliance AI GitHub App into your organization or repositories. This grants permission to read settings and receive webhooks.",
    whatToMonitor: [
      "Branch protection rules (e.g., required reviews)",
      "Repository settings (e.g., private vs. public)",
      "Team member access and permissions",
      "Webhook configurations",
    ],
    howToConnect: [
      "Create a GitHub App for your Compliance AI service.",
      "Users will install this app, granting it read-only access to repository metadata.",
      "Your backend will receive an installation ID, which it uses to authenticate with the GitHub API.",
      "Subscribe to webhooks for events like `repository`, `push`, and `branch_protection_rule` to get real-time updates.",
    ],
    sdk: {
      name: "Octokit.js",
      install: "npm install octokit",
    },
    apiExample: `// src/app/api/github/route.ts
import { Octokit } from "octokit";

export async function GET(request: Request) {
  // WARNING: Authenticate properly using a GitHub App installation token.
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const response = await octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner: "vercel",
    repo: "next.js",
  });

  // Check branch protection status for each branch.
  return new Response(JSON.stringify(response.data));
}`,
  },
  database: {
    title: "Connect to a Database",
    description:
      "Database monitoring requires shipping audit logs to a central location that your Compliance AI can process. This is an advanced integration.",
    whatToMonitor: [
      "Access logs to sensitive tables (e.g., `users`, `credit_cards`)",
      "Database configuration (e.g., encryption-at-rest)",
      "User privileges and grants",
      "Network access policies",
    ],
    howToConnect: [
      "Enable audit logging on your database (e.g., `pgaudit` for PostgreSQL).",
      "Configure a log shipper (e.g., Vector, Fluentd) to send audit logs to a webhook API endpoint in your app.",
      "Your backend will parse the incoming log streams to detect non-compliant queries or access patterns.",
    ],
    sdk: {
      name: "Varies by database (e.g., `pg`, `mysql2`)",
      install: "npm install pg",
    },
    apiExample: `// src/app/api/db-webhook/route.ts
// This endpoint would receive log data from a log shipper.

export async function POST(request: Request) {
  const logEvents = await request.json();

  for (const event of logEvents) {
    // Example: Check if a non-approved user accessed a sensitive table
    if (event.table === 'credit_cards' && event.user !== 'billing_service') {
      // FLAG A PCI-DSS VIOLATION
      console.log('Compliance violation detected:', event);
    }
  }

  return new Response("OK", { status: 200 });
}`,
  },
  gcp: {
    title: "Connect to Google Cloud",
    description:
      "Monitor Google Cloud resources by providing read-only credentials for services like Cloud Audit Logs and IAM.",
    whatToMonitor: [
      "Cloud Audit Logs (for API activity)",
      "IAM Policies (for user and service account permissions)",
      "VPC Firewall Rules",
      "Cloud Storage bucket permissions",
    ],
    howToConnect: [
      "Create a read-only Service Account in your GCP project.",
      "Grant it roles like 'Logs Viewer' and 'IAM Security Reviewer'.",
      "Securely store the service account key JSON in your backend.",
      "Use the Google Cloud client libraries to authenticate and fetch data.",
    ],
    sdk: {
      name: "Google Cloud Client Libraries for Node.js",
      install: "npm install @google-cloud/logging @google-cloud/iam",
    },
    apiExample: `// src/app/api/gcp/route.ts
import { Logging } from "@google-cloud/logging";

export async function GET(request: Request) {
  // WARNING: Securely manage credentials.
  const logging = new Logging();
  const [entries] = await logging.getEntries({
    filter: 'resource.type="gce_instance" AND severity>=ERROR',
    pageSize: 5,
  });

  // Analyze entries for compliance issues.
  return new Response(JSON.stringify(entries));
}`,
  },
};

export function ConnectionGuide({ system }: { system: System }) {
  const guide = guides[system];

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{guide.title}</h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">{guide.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">What We Monitor</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {guide.whatToMonitor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">How to Connect</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {guide.howToConnect.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold mb-2">Required SDK</h4>
        <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-md font-mono text-sm">
          <p className="text-gray-500 dark:text-gray-400"># {guide.sdk.name}</p>
          <p className="text-green-600 dark:text-green-400">{guide.sdk.install}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold mb-2">Example Backend API Route</h4>
        <div className="p-4 bg-gray-900 rounded-md text-sm overflow-x-auto">
          <pre><code className="language-typescript text-gray-300">{guide.apiExample}</code></pre>
        </div>
      </div>
    </div>
  );
}