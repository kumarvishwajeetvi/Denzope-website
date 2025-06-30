'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Upload, DollarSign, Users, TrendingUp, MessageSquare, Settings, Home, Plus, FileImage, BarChart3, StopCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const mockData = [
  { month: 'Jan', users: 1200, revenue: 15000 },
  { month: 'Feb', users: 1800, revenue: 22000 },
  { month: 'Mar', users: 2400, revenue: 28000 },
  { month: 'Apr', users: 3200, revenue: 35000 },
  { month: 'May', users: 4100, revenue: 42000 },
  { month: 'Jun', users: 5200, revenue: 51000 },
];

export default function FounderDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [companyName, setCompanyName] = useState('TechVision AI');
  const [description, setDescription] = useState('Revolutionary AI-powered analytics platform for enterprise solutions');
  const [category, setCategory] = useState('AI/ML');
  const [valuation, setValuation] = useState('2500000');
  const [sharePrice, setSharePrice] = useState('28.15');
  const [isPublished, setIsPublished] = useState(true);
  const [showEndListingDialog, setShowEndListingDialog] = useState(false);
  const [endListingReason, setEndListingReason] = useState('');

  const handleEndListing = () => {
    if (endListingReason.trim()) {
      setIsPublished(false);
      setShowEndListingDialog(false);
      // Here you would typically make an API call to end the listing
      console.log('Listing ended with reason:', endListingReason);
    }
  };

  return (
    <div className="min-h-screen bg-custom-gradient">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-white text-xl font-bold">Denzope</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link href="/chat">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Founder Dashboard</h1>
          <p className="text-white/70">Manage your startup listing and connect with investors</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$245,000</div>
              <div className="text-sm text-green-400">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active Investors</CardTitle>
              <Users className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-white/70">8 new this month</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Share Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${sharePrice}</div>
              <div className="text-sm text-green-400">+15.3% growth</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-white/70">3 unread</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="listing" className="data-[state=active]:bg-white/20">Manage Listing</TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-white/20">Investors</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-white/20">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                  <CardDescription className="text-white/70">Your startup's growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Line type="monotone" dataKey="users" stroke="#61a5c2" strokeWidth={2} name="Users" />
                      <Line type="monotone" dataKey="revenue" stroke="#2c7da0" strokeWidth={2} name="Revenue" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/70">Latest investor interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">New investment from John Smith</p>
                          <p className="text-white/60 text-sm">2 hours ago</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-medium">$5,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">Message from Sarah Johnson</p>
                          <p className="text-white/60 text-sm">4 hours ago</p>
                        </div>
                      </div>
                      <Link href="/chat">
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          Reply
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">Listing viewed 47 times</p>
                          <p className="text-white/60 text-sm">1 day ago</p>
                        </div>
                      </div>
                      <span className="text-white/60">+47 views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Listing Status */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Current Listing Status</CardTitle>
                <CardDescription className="text-white/70">Your startup's current status on Denzope</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white text-lg font-semibold">{companyName}</h3>
                    <p className="text-white/70">{description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={isPublished ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {isPublished ? 'Active' : 'Ended'}
                    </Badge>
                    {isPublished && (
                      <Dialog open={showEndListingDialog} onOpenChange={setShowEndListingDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                            <StopCircle className="h-4 w-4 mr-2" />
                            End Listing
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-primary-900 border-white/20">
                          <DialogHeader>
                            <DialogTitle className="text-white">End Startup Listing</DialogTitle>
                            <DialogDescription className="text-white/70">
                              Are you sure you want to end your startup listing? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="reason" className="text-white">Reason for ending listing</Label>
                              <Textarea
                                id="reason"
                                value={endListingReason}
                                onChange={(e) => setEndListingReason(e.target.value)}
                                className="bg-white/10 border-white/30 text-white"
                                placeholder="Please provide a reason for ending the listing..."
                                rows={3}
                              />
                            </div>
                            <Alert className="bg-red-500/20 border-red-500/50">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription className="text-red-400">
                                Warning: Ending your listing will stop all new investments and hide your startup from potential investors.
                              </AlertDescription>
                            </Alert>
                            <div className="flex space-x-3">
                              <Button 
                                onClick={handleEndListing}
                                className="bg-red-500 hover:bg-red-600"
                                disabled={!endListingReason.trim()}
                              >
                                Confirm End Listing
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => setShowEndListingDialog(false)}
                                className="border-white/30 text-white hover:bg-white/10"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-white/60 text-sm">Current Valuation</p>
                    <p className="text-white text-xl font-bold">${parseInt(valuation).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-white/60 text-sm">Share Price</p>
                    <p className="text-white text-xl font-bold">${sharePrice}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-white/60 text-sm">Shares Available</p>
                    <p className="text-white text-xl font-bold">1,250</p>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Button 
                    onClick={() => setActiveTab('listing')}
                    className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
                    disabled={!isPublished}
                  >
                    Edit Listing
                  </Button>
                  <Link href={`/startup/1`}>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      View Public Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listing" className="space-y-6">
            {!isPublished && (
              <Alert className="bg-red-500/20 border-red-500/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-400">
                  Your listing has been ended and is no longer visible to investors. Contact support if you need to reactivate it.
                </AlertDescription>
              </Alert>
            )}
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Manage Your Startup Listing</CardTitle>
                <CardDescription className="text-white/70">Update your company information and presentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      disabled={!isPublished}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select value={category} onValueChange={setCategory} disabled={!isPublished}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="Defence Sector">Defence Sector</SelectItem>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="Aeronautics">Aeronautics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Company Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-white/10 border-white/30 text-white resize-none"
                    placeholder="Describe your startup, its mission, and what makes it unique..."
                    disabled={!isPublished}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="valuation" className="text-white">Company Valuation ($)</Label>
                    <Input
                      id="valuation"
                      type="number"
                      value={valuation}
                      onChange={(e) => setValuation(e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      disabled={!isPublished}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sharePrice" className="text-white">Share Price ($)</Label>
                    <Input
                      id="sharePrice"
                      type="number"
                      step="0.01"
                      value={sharePrice}
                      onChange={(e) => setSharePrice(e.target.value)}
                      className="bg-white/10 border-white/30 text-white"
                      disabled={!isPublished}
                    />
                  </div>
                </div>

                {/* Company Gallery Upload */}
                <div className="space-y-4">
                  <Label className="text-white">Company Photos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-white/5 border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                      <Plus className="h-8 w-8 text-white/60 mb-2" />
                      <span className="text-white/60 text-sm">Add Photo</span>
                    </div>
                    <img 
                      src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=200" 
                      alt="Company photo"
                      className="aspect-square object-cover rounded-lg"
                    />
                    <img 
                      src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=200" 
                      alt="Company photo"
                      className="aspect-square object-cover rounded-lg"
                    />
                    <img 
                      src="https://images.pexels.com/photos/7439134/pexels-photo-7439134.jpeg?auto=compress&cs=tinysrgb&w=200" 
                      alt="Company photo"
                      className="aspect-square object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Presentation Upload */}
                <div className="space-y-4">
                  <Label className="text-white">Pitch Deck & Documents</Label>
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-white/60 mx-auto mb-4" />
                    <p className="text-white mb-2">Drop your pitch deck here or click to upload</p>
                    <p className="text-white/60 text-sm">Supports PDF, PPT, PPTX (Max 50MB)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
                    disabled={!isPublished}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                    disabled={!isPublished}
                  >
                    Preview Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investors" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Your Investors</CardTitle>
                <CardDescription className="text-white/70">Manage relationships with your current investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Smith", investment: "$5,000", shares: 177, joined: "2 weeks ago" },
                    { name: "Sarah Johnson", investment: "$12,000", shares: 426, joined: "1 month ago" },
                    { name: "Mike Chen", investment: "$8,500", shares: 302, joined: "3 weeks ago" },
                    { name: "Lisa Wang", investment: "$15,000", shares: 533, joined: "1 month ago" }
                  ].map((investor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{investor.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{investor.name}</h4>
                          <p className="text-white/60 text-sm">Joined {investor.joined}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-white font-semibold">{investor.investment}</p>
                          <p className="text-white/60 text-sm">{investor.shares} shares</p>
                        </div>
                        <Link href="/chat">
                          <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="text-center py-8">
              <MessageSquare className="h-16 w-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">Message Center</h3>
              <p className="text-white/70 mb-6">Connect with investors and answer their questions</p>
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600">
                  Open Chat Interface
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}