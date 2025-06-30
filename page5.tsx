'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Clock, Search, Filter, Users, Building, DollarSign, TrendingUp, Home, Eye, MessageSquare, FileText, Download, AlertTriangle, Star } from 'lucide-react';

const pendingStartups = [
  {
    id: 4,
    name: "NanoBot Innovations",
    founder: "Dr. Alex Kim",
    email: "alex@nanobot.com",
    phone: "+91 9876543210",
    description: "Advanced nanotechnology solutions for medical applications",
    category: "HealthTech",
    valuation: "$1.8M",
    requestedShares: 2000,
    sharePrice: 18.75,
    submittedDate: "2024-01-15",
    companyType: "Private Limited",
    gstNumber: "29ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    registrationNumber: "U72900KA2022PTC123456",
    foundedYear: "2022",
    teamSize: "8-12",
    stage: "Prototype/MVP",
    documents: [
      { name: "Business Plan", type: "PDF", size: "2.4 MB", verified: true },
      { name: "Financial Projections", type: "Excel", size: "1.2 MB", verified: true },
      { name: "Team Profiles", type: "PDF", size: "3.1 MB", verified: false },
      { name: "PAN Card", type: "Image", size: "0.8 MB", verified: true },
      { name: "GST Certificate", type: "PDF", size: "1.5 MB", verified: true },
      { name: "Incorporation Certificate", type: "PDF", size: "2.0 MB", verified: true }
    ],
    status: "pending",
    riskLevel: "Medium",
    complianceScore: 85
  },
  {
    id: 5,
    name: "Solar Grid Systems",
    founder: "Maria Rodriguez",
    email: "maria@solargrid.com",
    phone: "+91 8765432109",
    description: "Smart solar energy distribution networks for urban areas",
    category: "Defence Sector",
    valuation: "$3.2M",
    requestedShares: 1500,
    sharePrice: 42.10,
    submittedDate: "2024-01-18",
    companyType: "Private Limited",
    gstNumber: "27FGHIJ5678K2L6",
    panNumber: "FGHIJ5678K",
    registrationNumber: "U40300MH2021PTC234567",
    foundedYear: "2021",
    teamSize: "15-20",
    stage: "Revenue Generation",
    documents: [
      { name: "Pitch Deck", type: "PDF", size: "5.2 MB", verified: true },
      { name: "Technical Specifications", type: "PDF", size: "4.8 MB", verified: true },
      { name: "Market Analysis", type: "PDF", size: "3.5 MB", verified: true },
      { name: "PAN Card", type: "Image", size: "0.9 MB", verified: true },
      { name: "GST Certificate", type: "PDF", size: "1.8 MB", verified: true },
      { name: "Incorporation Certificate", type: "PDF", size: "2.2 MB", verified: true }
    ],
    status: "pending",
    riskLevel: "Low",
    complianceScore: 92
  },
  {
    id: 6,
    name: "Digital Health Hub",
    founder: "James Wilson",
    email: "james@digitalhealthhub.com",
    phone: "+91 7654321098",
    description: "Comprehensive telemedicine platform for rural communities",
    category: "HealthTech",
    valuation: "$2.1M",
    requestedShares: 1800,
    sharePrice: 25.60,
    submittedDate: "2024-01-20",
    companyType: "Private Limited",
    gstNumber: "29KLMNO9012P3Q7",
    panNumber: "KLMNO9012P",
    registrationNumber: "U85110KA2023PTC345678",
    foundedYear: "2023",
    teamSize: "10-15",
    stage: "Beta Testing",
    documents: [
      { name: "Business Model", type: "PDF", size: "2.8 MB", verified: true },
      { name: "User Research", type: "PDF", size: "4.2 MB", verified: false },
      { name: "Compliance Documents", type: "PDF", size: "6.1 MB", verified: true },
      { name: "PAN Card", type: "Image", size: "0.7 MB", verified: true },
      { name: "GST Certificate", type: "PDF", size: "1.6 MB", verified: false },
      { name: "Incorporation Certificate", type: "PDF", size: "1.9 MB", verified: true }
    ],
    status: "pending",
    riskLevel: "High",
    complianceScore: 78
  }
];

const approvedStartups = [
  {
    id: 1,
    name: "TechVision AI",
    founder: "Sarah Chen",
    category: "AI/ML",
    valuation: "$2.5M",
    sharePrice: 28.15,
    approvedDate: "2024-01-10",
    status: "approved",
    totalRaised: "$245,000",
    investors: 47,
    sharesAvailable: 1250,
    growth: "+15.3%",
    riskLevel: "Low"
  },
  {
    id: 2,
    name: "GreenEnergy Flow",
    founder: "Marcus Rodriguez",
    category: "Defence Sector",
    valuation: "$4.2M",
    sharePrice: 35.20,
    approvedDate: "2024-01-05",
    status: "approved",
    totalRaised: "$380,000",
    investors: 62,
    sharesAvailable: 800,
    growth: "+22.1%",
    riskLevel: "Medium"
  },
  {
    id: 3,
    name: "HealthTech Pro",
    founder: "Dr. Emily Watson",
    category: "HealthTech",
    valuation: "$3.8M",
    sharePrice: 31.45,
    approvedDate: "2024-01-08",
    status: "approved",
    totalRaised: "$520,000",
    investors: 89,
    sharesAvailable: 950,
    growth: "+18.7%",
    riskLevel: "Low"
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [approvalMessage, setApprovalMessage] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const handleApprove = (startupId: number) => {
    setApprovalMessage(`Startup ${startupId} has been approved and is now live on the platform.`);
    setTimeout(() => setApprovalMessage(''), 3000);
  };

  const handleReject = (startupId: number, reason: string) => {
    setApprovalMessage(`Startup ${startupId} has been rejected. Reason: ${reason}. The founder has been notified.`);
    setTimeout(() => setApprovalMessage(''), 5000);
  };

  const handleInvest = (startup: any, amount: string) => {
    const shares = Math.floor(parseFloat(amount) / startup.sharePrice);
    setApprovalMessage(`Successfully invested $${amount} (${shares} shares) in ${startup.name}.`);
    setTimeout(() => setApprovalMessage(''), 3000);
    setInvestmentAmount('');
    setSelectedInvestment(null);
  };

  const totalUsers = 5247;
  const totalStartups = approvedStartups.length;
  const pendingCount = pendingStartups.length;
  const totalInvested = 1145000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-white text-xl font-bold">Denzope Admin</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Main Site</span>
              </Link>
              <Badge className="bg-red-500/20 text-red-400">Admin Access</Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage startup approvals, monitor platform activity, and make investments</p>
        </div>

        {/* Alert for approval actions */}
        {approvalMessage && (
          <Alert className="mb-6 bg-green-500/20 border-green-500/50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-400">
              {approvalMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Users</CardTitle>
              <Users className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</div>
              <div className="text-sm text-green-400">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active Startups</CardTitle>
              <Building className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalStartups}</div>
              <div className="text-sm text-white/70">All approved</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
              <div className="text-sm text-white/70">Awaiting review</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${(totalInvested / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-green-400">+24% growth</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-white/20 relative">
              Pending Approvals
              {pendingCount > 0 && (
                <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-white/20">Approved Startups</TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-white/20">My Investments</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/70">Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">New startup submission</p>
                          <p className="text-white/60 text-sm">Digital Health Hub - 2 hours ago</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => setActiveTab('pending')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Review
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">Large investment made</p>
                          <p className="text-white/60 text-sm">$25,000 in TechVision AI - 4 hours ago</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-medium">$25,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">New user registration surge</p>
                          <p className="text-white/60 text-sm">147 new users today</p>
                        </div>
                      </div>
                      <span className="text-blue-400 font-medium">+147</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Startups */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Startups</CardTitle>
                  <CardDescription className="text-white/70">Based on total investment raised</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {approvedStartups
                      .sort((a, b) => parseInt(b.totalRaised.replace(/[$,]/g, '')) - parseInt(a.totalRaised.replace(/[$,]/g, '')))
                      .map((startup, index) => (
                        <div key={startup.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{startup.name}</h4>
                              <p className="text-white/60 text-sm">{startup.investors} investors</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">{startup.totalRaised}</p>
                            <Badge variant="secondary" className="bg-white/20 text-white/80 mt-1">
                              {startup.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Pending Startup Approvals</CardTitle>
                <CardDescription className="text-white/70">Review and approve new startup listings</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingStartups.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">All caught up!</h3>
                    <p className="text-white/70">No pending startup approvals at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pendingStartups.map((startup) => (
                      <div key={startup.id} className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-white text-xl font-semibold">{startup.name}</h3>
                              <Badge className={`${
                                startup.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                                startup.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {startup.riskLevel} Risk
                              </Badge>
                              <Badge className="bg-blue-500/20 text-blue-400">
                                {startup.complianceScore}% Compliance
                              </Badge>
                            </div>
                            <p className="text-white/80 mb-3">{startup.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-white/60">Founder</p>
                                <p className="text-white">{startup.founder}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Email</p>
                                <p className="text-white">{startup.email}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Phone</p>
                                <p className="text-white">{startup.phone}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Submitted</p>
                                <p className="text-white">{new Date(startup.submittedDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-white/20 text-white/80">
                              {startup.category}
                            </Badge>
                            <Badge className="bg-yellow-500/20 text-yellow-400">
                              Pending
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-white/60">Valuation</p>
                                <p className="text-white font-medium">{startup.valuation}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Share Price</p>
                                <p className="text-white font-medium">${startup.sharePrice}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Company Type</p>
                                <p className="text-white">{startup.companyType}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Founded</p>
                                <p className="text-white">{startup.foundedYear}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Team Size</p>
                                <p className="text-white">{startup.teamSize}</p>
                              </div>
                              <div>
                                <p className="text-white/60">Stage</p>
                                <p className="text-white">{startup.stage}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-white/60 text-sm font-medium">Legal Information</p>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-white/60">GST Number:</span>
                                <span className="text-white">{startup.gstNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">PAN Number:</span>
                                <span className="text-white">{startup.panNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Registration:</span>
                                <span className="text-white text-xs">{startup.registrationNumber}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-white/60 text-sm font-medium">Documents ({startup.documents.length})</p>
                            <div className="space-y-1">
                              {startup.documents.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-3 w-3 text-white/60" />
                                    <span className="text-white/80">{doc.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {doc.verified ? (
                                      <CheckCircle className="h-3 w-3 text-green-400" />
                                    ) : (
                                      <AlertTriangle className="h-3 w-3 text-yellow-400" />
                                    )}
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button 
                            onClick={() => handleApprove(startup.id)}
                            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-white/20">
                              <DialogHeader>
                                <DialogTitle className="text-white">Reject Startup Application</DialogTitle>
                                <DialogDescription className="text-white/70">
                                  Please provide a reason for rejecting {startup.name}'s application.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="reason" className="text-white">Rejection Reason</Label>
                                  <Textarea
                                    id="reason"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="bg-white/10 border-white/30 text-white"
                                    placeholder="Explain why this application is being rejected..."
                                    rows={4}
                                  />
                                </div>
                                <div className="flex space-x-3">
                                  <Button 
                                    onClick={() => {
                                      handleReject(startup.id, rejectionReason);
                                      setRejectionReason('');
                                    }}
                                    className="bg-red-500 hover:bg-red-600"
                                    disabled={!rejectionReason.trim()}
                                  >
                                    Confirm Rejection
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Eye className="h-4 w-4 mr-2" />
                            Review Details
                          </Button>
                          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Founder
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Approved Startups</CardTitle>
                <CardDescription className="text-white/70">Currently live startups on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedStartups.map((startup) => (
                    <div key={startup.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-white font-medium">{startup.name}</h4>
                            <Badge className={startup.growth.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {startup.growth}
                            </Badge>
                            <Badge className={`${
                              startup.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                              startup.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {startup.riskLevel} Risk
                            </Badge>
                          </div>
                          <p className="text-white/60 text-sm">Founder: {startup.founder}</p>
                          <p className="text-white/60 text-sm">Approved: {new Date(startup.approvedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-white/20 text-white/80 mb-2">
                            {startup.category}
                          </Badge>
                          <p className="text-white font-semibold">${startup.sharePrice}/share</p>
                          <p className="text-white/60 text-sm">{startup.sharesAvailable} available</p>
                          <p className="text-white/60 text-sm">{startup.totalRaised} raised</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link href={`/startup/${startup.id}`}>
                            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 w-full"
                                onClick={() => setSelectedInvestment(startup)}
                              >
                                <DollarSign className="h-4 w-4 mr-2" />
                                Invest
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-white/20">
                              <DialogHeader>
                                <DialogTitle className="text-white">Invest in {startup.name}</DialogTitle>
                                <DialogDescription className="text-white/70">
                                  Make an investment as platform admin
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-white/70">Share Price</p>
                                    <p className="text-white font-bold text-lg">${startup.sharePrice}</p>
                                  </div>
                                  <div>
                                    <p className="text-white/70">Available Shares</p>
                                    <p className="text-white font-bold text-lg">{startup.sharesAvailable}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="investment" className="text-white">Investment Amount ($)</Label>
                                  <Input
                                    id="investment"
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(e.target.value)}
                                    className="bg-white/10 border-white/30 text-white"
                                    placeholder="Enter investment amount"
                                  />
                                  {investmentAmount && (
                                    <p className="text-white/60 text-sm mt-1">
                                      ≈ {Math.floor(parseFloat(investmentAmount) / startup.sharePrice)} shares
                                    </p>
                                  )}
                                </div>
                                <Button 
                                  onClick={() => handleInvest(startup, investmentAmount)}
                                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                  disabled={!investmentAmount || parseFloat(investmentAmount) <= 0}
                                >
                                  Confirm Investment
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 w-full">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">My Investment Portfolio</CardTitle>
                <CardDescription className="text-white/70">Your investments as platform admin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 text-white/60 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Start Building Your Portfolio</h3>
                  <p className="text-white/70 mb-6">As platform admin, you can invest in approved startups to show confidence in the platform.</p>
                  <Button 
                    onClick={() => setActiveTab('approved')}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    View Investment Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Platform Growth</CardTitle>
                  <CardDescription className="text-white/70">User and startup growth metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Monthly Active Users</span>
                      <span className="text-white font-semibold">4,856</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">New User Growth</span>
                      <span className="text-green-400 font-semibold">+23.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Avg. Investment Size</span>
                      <span className="text-white font-semibold">$5,840</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Platform Revenue</span>
                      <span className="text-white font-semibold">$28,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Approval Rate</span>
                      <span className="text-green-400 font-semibold">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Category Distribution</CardTitle>
                  <CardDescription className="text-white/70">Startup categories on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { category: 'AI/ML', count: 8, percentage: 35 },
                      { category: 'HealthTech', count: 6, percentage: 26 },
                      { category: 'Defence Sector', count: 5, percentage: 22 },
                      { category: 'FinTech', count: 4, percentage: 17 }
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80">{item.category}</span>
                          <span className="text-white/60 text-sm">{item.count} startups</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}