"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center font-inter">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Main Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Compliance AI
        </h1>
        
        {/* Description */}
        <p className="text-sm text-text mb-6">
          Automated compliance monitoring and reporting for your infrastructure. 
          Connect your systems and ensure regulatory compliance across all platforms.
        </p>
        
        {/* Dashboard Button */}
        <Link href="/dashboard">
          <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-foreground hover:bg-foreground/90 transition-colors rounded-lg">
            Go to Dashboard
          </button>
        </Link>
        
        {/* Bottom Text */}
        <div className="mt-16 text-sm text-muted">
          <p>⭐ Small landing page - yet to be done ⭐</p>
        </div>
      </div>
    </div>
  );
}
