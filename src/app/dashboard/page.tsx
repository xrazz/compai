"use client";

import {
  SidebarOpen, X, User, Plus, CreditCard,
  ArrowUpRight, ChevronDown, ArrowLeft, AlertCircle,
  RefreshCcw, SortDesc, SortAsc, Copy, Check, Settings,
  CheckCircle2, XCircle, Trash2, Save,
  ArrowUpDown,
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BellDot,
  Bell,
  Monitor,
  Shield,
  Clock,
  ArrowDown,
  Search,
  MessageCircle
} from "lucide-react"
import { useState, useEffect, useCallback, useRef, memo } from "react"
import Link from "next/link"

// Types
interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  createdAt: Date;
  status: 'active' | 'inactive';
}

interface ComplianceApp {
  id: string;
  name: string;
  type: 'aws' | 'github' | 'database' | 'gcp' | 'azure' | 'docker' | 'kubernetes' | 'slack' | 'jira' | 'jenkins' | 'terraform' | 'vault';
  status: 'connected' | 'disconnected' | 'error';
  lastChecked: Date;
  complianceScore: number;
  violations: number;
}

interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement;
  status: 'compliant' | 'non-compliant' | 'pending';
  lastAudit: Date;
}

interface ConnectionGuide {
  system: string;
  steps: string[];
  codeExamples: string[];
  requirements: string[];
  troubleshooting: string[];
}

interface Evidence {
  id: string;
  violationId: string;
  timestamp: Date;
  description: string;
  severity: 'low' | 'medium' | 'high';
  proof: string;
  hash: string;
}

const getFaviconUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}/favicon.ico`;
  } catch {
    return '/webplaceholder.svg';
  }
}

// Feedback Dialog Component - moved outside to prevent re-creation
const FeedbackDialog = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [feedbackText, setFeedbackText] = useState("")

  const handleSubmit = () => {
    // Mock feedback submission
    alert("Feedback submitted! Thank you for your input.")
    setFeedbackText("")
    onClose()
  }

  const handleClose = () => {
    setFeedbackText("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20">
      <div className="bg-background w-full max-w-md rounded-xl border border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-foreground">Send Feedback</h2>
              <p className="text-xs text-text mt-1">Help us improve Compliance AI</p>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-filler transition-colors rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Text Input */}
          <div>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Ideas to improve this page..."
              className="w-full h-24 p-3 text-sm bg-filler text-text placeholder-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground resize-none"
              autoFocus
            />
          </div>

          {/* Help Text */}
          <div className="text-xs text-text">
            Need help? <a href="/contact" className="text-foreground underline">Contact us</a> or <a href="/docs" className="text-foreground underline">see docs</a>.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-filler text-text hover:bg-filler/80 transition-colors rounded-lg border border-border text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-foreground text-white hover:bg-foreground/90 transition-colors rounded-lg text-xs font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

FeedbackDialog.displayName = 'FeedbackDialog'

// Add Project Dialog Component
const AddProjectDialog = memo(({ isOpen, onClose, onSave }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (project: Omit<Project, 'id' | 'createdAt'>) => void;
}) => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!title.trim() || !url.trim() || !description.trim()) {
      alert("Please fill in all fields")
      return
    }
    
    onSave({
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      status: 'active'
    })
    
    setTitle("")
    setUrl("")
    setDescription("")
    onClose()
  }

  const handleClose = () => {
    setTitle("")
    setUrl("")
    setDescription("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20">
      <div className="bg-background w-full max-w-md rounded-xl border border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-foreground">Add New Project</h2>
              <p className="text-xs text-text mt-1">Create a new compliance project</p>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-filler transition-colors rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-medium text-text mb-2">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title..."
              className="w-full p-3 text-sm bg-filler text-text placeholder-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
              autoFocus
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-medium text-text mb-2">Project URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 text-sm bg-filler text-text placeholder-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs font-medium text-text mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your project..."
              className="w-full h-20 p-3 text-sm bg-filler text-text placeholder-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-filler text-text hover:bg-filler/80 transition-colors rounded-lg border border-border text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-foreground text-white hover:bg-foreground/90 transition-colors rounded-lg text-xs font-medium"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

AddProjectDialog.displayName = 'AddProjectDialog'

export default function ComplianceDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [complianceStandards, setComplianceStandards] = useState<ComplianceStandard[]>([])
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showConnectionDialog, setShowConnectionDialog] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)
  const [isRunningCheck, setIsRunningCheck] = useState(false)
  const [complianceReport, setComplianceReport] = useState<any>(null)
  const [userPlan, setUserPlan] = useState<string>("free")
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false)

  // System categories for integration
const systemCategories = {
  "Cloud Providers": ["aws", "gcp", "azure"],
  "Development": ["github", "jenkins", "terraform"],
  "Infrastructure": ["docker", "kubernetes", "vault"],
  "Communication": ["slack", "jira"],
  "Data": ["database"]
};

  // Compliance standards
  const complianceStandardsData = [
    { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation", icon: <Shield className="w-4 h-4" /> },
    { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability and Accountability Act", icon: <Shield className="w-4 h-4" /> },
    { id: "pci-dss", name: "PCI-DSS", description: "Payment Card Industry Data Security Standard", icon: <Shield className="w-4 h-4" /> },
    { id: "soc2", name: "SOC 2", description: "Service Organization Control 2", icon: <Shield className="w-4 h-4" /> },
    { id: "iso27001", name: "ISO 27001", description: "Information Security Management System", icon: <Shield className="w-4 h-4" /> },
    { id: "nist", name: "NIST", description: "National Institute of Standards and Technology", icon: <Shield className="w-4 h-4" /> }
  ];

  // Mock user data
  const user = {
    uid: "mock-user-id",
    displayName: "John Doe",
    email: "john@example.com",
    photoURL: null
  }

  // Local storage functions
  const saveProjectsToStorage = (projects: Project[]) => {
    try {
      localStorage.setItem('compliance-projects', JSON.stringify(projects))
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error)
    }
  }

  const loadProjectsFromStorage = (): Project[] => {
    try {
      const stored = localStorage.getItem('compliance-projects')
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.map((project: any) => ({
          ...project,
          createdAt: new Date(project.createdAt)
        }))
      }
    } catch (error) {
      console.error('Failed to load projects from localStorage:', error)
    }
    return []
  }

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    saveProjectsToStorage(updatedProjects)
    setSelectedProjectId(newProject.id)
  }

  // Initialize data
  useEffect(() => {
    setComplianceStandards(complianceStandardsData.map(standard => ({
      ...standard,
      status: 'pending' as const,
      lastAudit: new Date()
    })))
    
    // Load projects from localStorage
    const savedProjects = loadProjectsFromStorage()
    setProjects(savedProjects)
    
    // Select first project if available
    if (savedProjects.length > 0) {
      setSelectedProjectId(savedProjects[0].id)
    }
  }, [])

  const getSystemIcon = (system: string) => {
    return (
      <img 
        src={`/systems/${system}.svg`} 
        alt={system}
        className="w-4 h-4"
        onError={(e) => {
          // Fallback to a default icon if SVG fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-50'
      case 'disconnected':
        return 'text-gray-500 bg-gray-50'
      case 'error':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-50'
      case 'non-compliant':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleSystemClick = (system: string) => {
    setSelectedSystem(system)
    setShowConnectionDialog(true)
  }

  const handleRunComplianceCheck = async () => {
    if (!selectedProject) return
    
    setIsRunningCheck(true)
    // Mock compliance check
    setTimeout(() => {
      setComplianceReport({
        projectName: selectedProject.title,
        overallScore: 87, // Hardcoded 87%
        totalViolations: 3, // Hardcoded 3 violations
        standards: complianceStandards.map(standard => ({
          ...standard,
          status: Math.random() > 0.3 ? 'compliant' : 'non-compliant', // 70% chance of compliant
          violations: Math.floor(Math.random() * 2) // 0-1 violations per standard
        }))
      })
      setIsRunningCheck(false)
    }, 3000)
  }

  // Get selected project
  const selectedProject = projects.find(p => p.id === selectedProjectId)

  // Connection Guide Dialog Component
  const ConnectionGuideDialog = ({ isOpen, onClose, system }: { isOpen: boolean; onClose: () => void; system: string | null }) => {
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const [isAtBottom, setIsAtBottom] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10
      setIsAtBottom(isAtBottom)
      setShowScrollIndicator(!isAtBottom)
    }

    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    }

    if (!isOpen || !system) return null

    const getConnectionSteps = (system: string) => {
      const guides: Record<string, ConnectionGuide> = {
        aws: {
          system: "AWS",
          steps: [
            "1. Create an IAM user with CloudWatch and S3 permissions",
            "2. Generate access keys for the IAM user",
            "3. Install AWS CLI and configure credentials",
            "4. Deploy our compliance agent to your AWS account",
            "5. Configure monitoring for your services"
          ],
          codeExamples: [
            "aws configure",
            "aws s3 ls",
            "aws logs describe-log-groups"
          ],
          requirements: [
            "AWS Account with admin access",
            "IAM permissions for CloudWatch, S3, and EC2",
            "Python 3.8+ installed"
          ],
          troubleshooting: [
            "Check IAM permissions",
            "Verify AWS credentials",
            "Ensure security groups allow outbound HTTPS"
          ]
        },
        github: {
          system: "GitHub",
          steps: [
            "1. Create a GitHub Personal Access Token",
            "2. Install our GitHub App in your organization",
            "3. Configure repository access permissions",
            "4. Set up webhook for real-time monitoring",
            "5. Enable compliance scanning for selected repos"
          ],
          codeExamples: [
            "gh auth login",
            "gh repo list",
            "gh api repos/owner/repo/commits"
          ],
          requirements: [
            "GitHub account with repository access",
            "Personal Access Token with repo permissions",
            "Organization admin access (for GitHub App)"
          ],
          troubleshooting: [
            "Verify token permissions",
            "Check repository access",
            "Ensure webhook URL is accessible"
          ]
        }
      }
      return guides[system] || {
        system: system.toUpperCase(),
        steps: ["Integration guide coming soon..."],
        codeExamples: [],
        requirements: [],
        troubleshooting: []
      }
    }

    const guide = getConnectionSteps(system)

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20"
        onClick={onClose}
      >
        <div 
          className="bg-background w-full max-w-2xl max-h-[90vh] rounded-xl border border-border relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm">{getSystemIcon(system)}</span>
                <div>
                  <h2 className="text-sm font-medium text-foreground">Connect {guide.system}</h2>
                  <p className="text-xs text-text">Follow these steps to integrate {guide.system} with Compliance AI</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-filler transition-colors rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div 
            ref={scrollRef}
            className="overflow-y-auto scrollbar-thin max-h-[calc(90vh-120px)]"
            onScroll={handleScroll}
          >
            <div className="p-4 space-y-4">
            {/* Steps */}
            <div>
              <h3 className="text-xs font-medium text-foreground mb-3">Integration Steps</h3>
              <div className="space-y-2">
                {guide.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-filler rounded-lg border border-border">
                    <div className="w-5 h-5 bg-foreground text-white flex items-center justify-center text-xs font-medium flex-shrink-0 rounded-full">
                      {index + 1}
                    </div>
                    <p className="text-xs font-medium text-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Examples */}
            {guide.codeExamples.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-foreground mb-3">Code Examples</h3>
                <div className="bg-foreground text-white p-3 font-mono text-xs rounded-lg">
                  {guide.codeExamples.map((code, index) => (
                    <div key={index} className="mb-1">$ {code}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            <div>
              <h3 className="text-xs font-medium text-foreground mb-3">Requirements</h3>
              <ul className="space-y-2">
                {guide.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs font-medium text-text">
                    <Check className="w-3 h-3 text-foreground" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Troubleshooting */}
            <div>
              <h3 className="text-xs font-medium text-foreground mb-3">Troubleshooting</h3>
              <ul className="space-y-2">
                {guide.troubleshooting.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs font-medium text-text">
                    <AlertCircle className="w-3 h-3 text-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-filler text-text hover:bg-filler/80 transition-colors rounded-lg border border-border text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Mock connection
                  alert(`${guide.system} connection initiated!`)
                  onClose()
                }}
                className="px-4 py-2 bg-foreground text-white hover:bg-foreground/90 transition-colors rounded-lg text-xs font-medium"
              >
                Connect {guide.system}
              </button>
            </div>

            </div>
          </div>

          {/* Scroll Indicator */}
          {showScrollIndicator && !isAtBottom && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={scrollToBottom}
                className="w-8 h-8 bg-filler hover:bg-filler/80 transition-colors rounded-full flex items-center justify-center animate-bounce border border-border"
              >
                <ArrowDown className="w-4 h-4 text-text" />
              </button>
            </div>
          )}

          {/* Bottom Border */}
          <div className="border-t border-border"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen font-inter bg-background overflow-hidden">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-60 bg-background border-r border-t border-border flex flex-col
          transform transition-transform duration-200 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Compliance AI"
                className="w-6 h-6 rounded-lg"
                onError={(e) => {
                  // Fallback to text if logo fails
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="w-6 h-6 bg-foreground rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white text-xs font-medium">C</span>
              </div>
            </div>
            <span className="text-base font-semibold text-text">Compliance AI</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-2 lg:hidden"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-4 flex flex-col h-full">
          <nav className="flex-1">
            {/* Projects */}
            <div>
              {projects.length === 0 ? (
                <div className="p-4 text-center bg-filler rounded">
                  <p className="text-sm text-text">No projects added</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`w-full p-2 text-left rounded-xl transition-colors ${
                        selectedProjectId === project.id
                          ? 'bg-filler/50 text-text'
                          : 'hover:bg-filler/30 text-text'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={getFaviconUrl(project.url)} 
                            alt={project.title}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              // Fallback to first letter if favicon fails
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center" style={{display: 'none'}}>
                            <span className="text-white text-xs font-medium">
                              {project.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-normal truncate text-text">{project.title}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Bottom Section - Profile and Billing */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="space-y-1">
              {/* Profile Section */}
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-filler/30 transition-colors rounded-xl"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-6 h-6 rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-sm font-normal text-text truncate">
                        {user.displayName || 'User'}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform flex-shrink-0 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProfileOpen && (
                  <div className="px-2 pb-2 space-y-0.5">
                    <div className="px-2 pt-2 flex items-center gap-2">
                      <p className="text-xs font-medium text-text truncate flex-1">
                        {user.email}
                      </p>
                      <button
                        onClick={() => copyToClipboard(user.email)}
                        className="p-1 hover:bg-filler transition-colors rounded"
                        title="Copy email"
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-foreground" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted" />
                        )}
                      </button>
                    </div>
                    <button className="w-full flex items-center gap-3 p-2 text-left text-sm text-text hover:bg-red-50 hover:text-red-600 transition-colors rounded-xl">
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Billing */}
              <Link href="/billing">
                <button className="w-full flex items-center gap-3 p-2 text-left hover:bg-filler/30 transition-colors rounded-xl">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-normal text-text">Billing</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-filler transition-colors rounded lg:hidden"
          >
            <SidebarOpen className="w-4 h-4" />
          </button>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAddProjectDialog(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-foreground text-white hover:bg-foreground/90 transition-colors rounded-lg"
            >
              <Plus className="w-3 h-3" strokeWidth={2} />
              Add Project
            </button>
            <button 
              onClick={() => setShowFeedbackDialog(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-normal bg-filler text-text hover:bg-filler/80 transition-colors rounded-lg border border-border"
            >
              <MessageCircle className="w-3 h-3" strokeWidth={2} />
              Support
            </button>
            <Link href="/docs" className="text-sm text-text hover:text-foreground transition-colors underline decoration-1 underline-offset-2">
              Docs
            </Link>
            {subscriptionStatus === 'free' && (
              <Link href="/billing">
                <button className="flex items-center text-sm font-medium gap-2 px-4 py-2 bg-foreground text-white hover:bg-foreground/90 transition-colors rounded border border-border">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-foreground text-xs font-medium">P</span>
                  </div>
                  <span>Join Pro</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 max-w-4xl mx-auto py-6">
            
            {/* Header Section */}
            <div className="mb-4">
              {selectedProject ? (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={getFaviconUrl(selectedProject.url)} 
                        alt={selectedProject.title}
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          // Fallback to first letter if favicon fails
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center" style={{display: 'none'}}>
                        <span className="text-white text-lg font-medium">
                          {selectedProject.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-foreground">{selectedProject.title}</h1>
                    </div>
                  </div>
                  <p className="text-sm text-text mb-2">{selectedProject.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-foreground hover:underline"
                    >
                      {selectedProject.url}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedProject.url)}
                      className="p-1 hover:bg-filler transition-colors rounded"
                      title="Copy URL"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-foreground" />
                      ) : (
                        <Copy className="w-3 h-3 text-muted" />
                      )}
                    </button>
                  </div>
                  
                  {/* Compliance Stats */}
                  <div className="mb-4">
                    <div className="text-sm text-text">
                      <span className="font-medium text-foreground">87% compliant</span> • <span className="text-red-500 font-medium">3 violations</span> • <span className="text-orange-500 font-medium">5 standards</span> • Last checked: 2 hours ago
                    </div>
                  </div>
                </>
              ) : projects.length === 0 ? (
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Compliance AI</h1>
                  <p className="text-sm text-text mb-6">Get started by creating your first project</p>
                  <button
                    onClick={() => setShowAddProjectDialog(true)}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-foreground hover:bg-foreground/90 transition-colors rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Your First Project
                  </button>
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-foreground mb-2">Compliance AI</h1>
              )}
            </div>

            {/* System Integration Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-medium text-foreground">Connect Systems</h2>
                <button className="px-3 py-2 text-sm font-normal bg-filler text-text hover:bg-filler/80 transition-colors rounded-lg border border-border">
                  + Create API key
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Search className="w-4 h-4 text-muted" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search systems..."
                    className="w-full pl-10 pr-3 py-2 text-sm bg-filler text-text placeholder-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
                  />
                </div>
                <div className="relative">
                  <div className="relative rounded-lg border-2 border-border bg-filler hover:border-foreground/50 focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/20 transition-colors overflow-hidden">
                    <select className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-filler text-text focus:outline-none cursor-pointer border-0">
                      <option className="bg-filler text-text">All Permissions</option>
                      <option className="bg-filler text-text">Read Only</option>
                      <option className="bg-filler text-text">Write Access</option>
                      <option className="bg-filler text-text">Admin Access</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-muted" />
                    </div>
                  </div>
                </div>
                <button className="p-2 bg-filler text-text hover:bg-filler/80 transition-colors rounded-lg border border-border">
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-filler rounded-lg border border-border overflow-hidden">
                {/* Table Header */}
                <div className="bg-filler/50 px-4 py-3 border-b border-border">
                  <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-muted">
                    {Object.keys(systemCategories).map((category) => (
                      <div key={category}>{category}</div>
                    ))}
                  </div>
                </div>
                
                {/* Table Body */}
                <div className="divide-y divide-border">
                  {Array.from({ length: Math.max(...Object.values(systemCategories).map(systems => systems.length)) }).map((_, rowIndex) => (
                    <div key={rowIndex} className="px-4 py-3">
                      <div className="grid grid-cols-5 gap-4">
                        {Object.values(systemCategories).map((systems, colIndex) => {
                          const system = systems[rowIndex];
                          return system ? (
                            <button
                              key={`${colIndex}-${rowIndex}`}
                              onClick={() => handleSystemClick(system)}
                              className="flex items-center justify-between hover:bg-filler/30 transition-colors text-left group p-2 rounded"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{getSystemIcon(system)}</span>
                                <span className="text-xs font-medium capitalize text-text">
                                  {system}
                                </span>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-muted group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                          ) : (
                            <div key={`${colIndex}-${rowIndex}`} className="flex items-center space-x-2 p-2 text-muted">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">Coming soon...</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>

            {/* Compliance Standards Section */}
            <div className="mb-4">
              <h2 className="text-base font-medium text-foreground mb-3">Standards</h2>
              <div className="bg-filler rounded-lg border border-border overflow-hidden">
                {/* Table Header */}
                <div className="bg-filler/50 px-4 py-3 border-b border-border">
                  <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-muted">
                    <div>Name</div>
                    <div>Status</div>
                    <div>Score</div>
                    <div>Last Checked</div>
                  </div>
                </div>
                
                {/* Table Rows */}
                <div className="divide-y divide-border">
                  {complianceStandards.map((standard) => (
                    <div key={standard.id} className="px-4 py-3 hover:bg-filler/30 transition-colors">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{standard.icon}</span>
                          <span className="text-sm font-normal text-text">{standard.name}</span>
                        </div>
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-normal rounded ${getComplianceStatusColor(standard.status)}`}>
                            {standard.status}
                          </span>
                        </div>
                        <div className="text-sm text-text">
                          {Math.floor(Math.random() * 40) + 60}%
                        </div>
                        <div className="text-sm text-text">
                          {Math.floor(Math.random() * 7) + 1} days ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Run Compliance Check Section */}
            {selectedProject && (
              <div className="text-center">
                <button
                  onClick={handleRunComplianceCheck}
                  disabled={isRunningCheck}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-normal text-white bg-foreground hover:bg-foreground/90 disabled:bg-muted disabled:cursor-not-allowed transition-colors rounded-lg border border-border"
                >
                  {isRunningCheck ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    `Run Check for ${selectedProject.title}`
                  )}
                </button>
              </div>
            )}

            {/* Compliance Report */}
            {complianceReport && selectedProject && (
              <div className="mt-4">
                <h2 className="text-base font-medium text-foreground text-center mb-4">
                  Report - {selectedProject.title}
                </h2>
                
                <div className="bg-filler p-4 mb-4 rounded">
                  <div className="text-center">
                    <div className="text-3xl font-medium text-foreground mb-1">
                      {complianceReport.overallScore}%
                    </div>
                    <p className="text-sm text-text">
                      {complianceReport.totalViolations} violations
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {complianceReport.standards.map((standard: any) => (
                    <div
                      key={standard.id}
                      className={`p-3 bg-filler rounded ${
                        standard.status === 'compliant'
                          ? "border-l-4 border-foreground"
                          : "border-l-4 border-muted"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{standard.icon}</span>
                          <h4 className="text-sm font-medium text-text">
                              {standard.name}
                            </h4>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            standard.status === 'compliant'
                              ? "bg-foreground text-white"
                              : "bg-muted text-white"
                          }`}
                        >
                          {standard.status === 'compliant' ? 'Compliant' : 'Needs Attention'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )}
          </div>
        </div>
      </div>

      {/* Connection Guide Dialog */}
      <ConnectionGuideDialog
        isOpen={showConnectionDialog}
        onClose={() => setShowConnectionDialog(false)}
        system={selectedSystem}
      />

      {/* Add Project Dialog */}
      <AddProjectDialog
        isOpen={showAddProjectDialog}
        onClose={() => setShowAddProjectDialog(false)}
        onSave={addProject}
      />

      {/* Feedback Dialog */}
      <FeedbackDialog
        isOpen={showFeedbackDialog}
        onClose={() => setShowFeedbackDialog(false)}
      />
    </div>
  );
}
