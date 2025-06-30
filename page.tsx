'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PaymentModal } from '@/components/ui/payment-modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, MessageSquare, Heart, Share, TrendingUp, Users, DollarSign, Calendar, MapPin, Star, CreditCard } from 'lucide-react';

const startupData = {
  1: {
    id: 1,
    name: "TechVision AI",
    description: "Revolutionary AI-powered analytics platform for enterprise solutions that transforms how businesses understand and interact with their data.",
    founder: "Sarah Chen",
    founderBio: "Former Google AI researcher with 10+ years in machine learning and enterprise software development.",
    founderImage: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=300",
    valuation: "$2.5M",
    sharesAvailable: 1250,
    sharePrice: 28.15,
    totalShares: 10000,
    growth: "+15.3%",
    category: "AI/ML",
    founded: "2022",
    location: "San Francisco, CA",
    employees: "15-25",
    stage: "Series A",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/7439134/pexels-photo-7439134.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/7439135/pexels-photo-7439135.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    metrics: {
      revenue: "$450K",
      users: "50K+",
      funding: "Series A",
      mrr: "$37.5K",
      churn: "2.3%",
      cac: "$125"
    },
    financials: [
      { period: 'Q1 2023', revenue: 75000, expenses: 60000 },
      { period: 'Q2 2023', revenue: 95000, expenses: 70000 },
      { period: 'Q3 2023', revenue: 120000, expenses: 85000 },
      { period: 'Q4 2023', revenue: 160000, expenses: 100000 },
    ],
    userGrowth: [
      { month: 'Jan', users: 5000 },
      { month: 'Feb', users: 12000 },
      { month: 'Mar', users: 18000 },
      { month: 'Apr', users: 28000 },
      { month: 'May', users: 35000 },
      { month: 'Jun', users: 50000 },
    ],
    team: [
      { name: "Sarah Chen", role: "CEO & Founder", image: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Mike Rodriguez", role: "CTO", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Lisa Wang", role: "Head of Product", image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150" },
    ]
  }
};

export default function StartupDetail() {
  const params = useParams();
  const id = params?.id as string;
  const startup = startupData[parseInt(id)] || startupData[1];
  
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [shares, setShares] = useState(0);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleInvestmentChange = (value: string) => {
    setInvestmentAmount(value);
    const amount = parseFloat(value) || 0;
    setShares(Math.floor(amount / startup.sharePrice));
  };

  const handleInvestClick = () => {
    if (investmentAmount && shares > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
    // Handle successful payment - update UI, show success message, etc.
    setInvestmentAmount('');
    setShares(0);
    // You can add success notification here
  };

  const sharesOwned = Math.floor((startup.totalShares - startup.sharesAvailable) / startup.totalShares * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white text-xl font-bold">Movo</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startups
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Startup Info */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <img 
                    src={startup.image} 
                    alt={startup.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-white">{startup.name}</h1>
                      <Badge className={startup.growth.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                        {startup.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary" className="bg-white/20 text-white/80">
                        {startup.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white/60">4.8 (124 reviews)</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-lg leading-relaxed mb-4">{startup.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Founded</p>
                          <p className="text-white">{startup.founded}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Location</p>
                          <p className="text-white">{startup.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Team Size</p>
                          <p className="text-white">{startup.employees}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-white/60" />
                        <div>
                          <p className="text-white/60">Stage</p>
                          <p className="text-white">{startup.stage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Panel */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Investment Details</CardTitle>
                <CardDescription className="text-white/70">Current market information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Share Price</span>
                    <span className="text-white font-bold text-xl">${startup.sharePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Valuation</span>
                    <span className="text-white font-semibold">{startup.valuation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Available Shares</span>
                    <span className="text-white">{startup.sharesAvailable.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium">Investment Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount in USD"
                    value={investmentAmount}
                    onChange={(e) => handleInvestmentChange(e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                  {shares > 0 && (
                    <p className="text-white/70 text-sm">
                      ≈ {shares} shares at ${startup.sharePrice} per share
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    disabled={!investmentAmount || shares === 0}
                    onClick={handleInvestClick}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Invest ${investmentAmount || '0'}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10"
                      onClick={() => setIsWatchlisted(!isWatchlisted)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isWatchlisted ? 'fill-current text-red-400' : ''}`} />
                      {isWatchlisted ? 'Saved' : 'Save'}
                    </Button>
                    <Link href="/chat">
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70 text-sm">Ownership Distribution</span>
                    <span className="text-white text-sm">{sharesOwned}% owned</span>
                  </div>
                  <Progress value={sharesOwned} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="financials" className="data-[state=active]:bg-white/20">Financials</TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-white/20">Team</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-white/20">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Metrics */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">{startup.metrics.revenue}</div>
                      <div className="text-white/60 text-sm">Annual Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">{startup.metrics.users}</div>
                      <div className="text-white/60 text-sm">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">{startup.metrics.mrr}</div>
                      <div className="text-white/60 text-sm">Monthly Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">{startup.metrics.churn}</div>
                      <div className="text-white/60 text-sm">Churn Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth Chart */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">User Growth</CardTitle>
                  <CardDescription className="text-white/70">Monthly active users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={startup.userGrowth}>
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
                      <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Founder Section */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Meet the Founder</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <img 
                    src={startup.founderImage} 
                    alt={startup.founder}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2">{startup.founder}</h3>
                    <p className="text-white/80 leading-relaxed mb-4">{startup.founderBio}</p>
                    <div className="flex space-x-3">
                      <Link href="/chat">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Founder
                        </Button>
                      </Link>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Share className="h-4 w-4 mr-2" />
                        Share Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Financial Performance</CardTitle>
                <CardDescription className="text-white/70">Quarterly revenue and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={startup.financials}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="period" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Core Team</CardTitle>
                <CardDescription className="text-white/70">Meet the people building the future</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {startup.team.map((member, index) => (
                    <div key={index} className="text-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="text-white font-semibold">{member.name}</h3>
                      <p className="text-white/70 text-sm">{member.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Company Gallery</CardTitle>
                <CardDescription className="text-white/70">Photos from the team and office</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {startup.gallery.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${startup.name} gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={parseFloat(investmentAmount) || 0}
        startupName={startup.name}
        shares={shares}
        sharePrice={startup.sharePrice}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}