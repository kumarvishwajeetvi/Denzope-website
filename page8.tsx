'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, DollarSign, HdmiPort as Portfolio, MessageSquare, Bell, Settings, Home } from 'lucide-react';

const portfolioData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 12000 },
  { name: 'Mar', value: 11500 },
  { name: 'Apr', value: 15000 },
  { name: 'May', value: 18000 },
  { name: 'Jun', value: 22000 },
];

const allocationData = [
  { name: 'AI/ML', value: 40, color: '#3B82F6' },
  { name: 'HealthTech', value: 25, color: '#10B981' },
  { name: 'Defence Sector', value: 20, color: '#8B5CF6' },
  { name: 'FinTech', value: 15, color: '#F59E0B' },
];

const myInvestments = [
  {
    id: 1,
    name: "TechVision AI",
    shares: 150,
    avgPrice: 24.50,
    currentPrice: 28.15,
    totalValue: 4222.50,
    change: 14.9,
    category: "AI/ML"
  },
  {
    id: 2,
    name: "GreenEnergy Flow",
    shares: 80,
    avgPrice: 32.75,
    currentPrice: 35.20,
    totalValue: 2816.00,
    change: 7.5,
    category: "Defence Sector"
  },
  {
    id: 3,
    name: "HealthTech Pro",
    shares: 200,
    avgPrice: 28.90,
    currentPrice: 31.45,
    totalValue: 6290.00,
    change: 8.8,
    category: "HealthTech"
  }
];

const watchlist = [
  {
    name: "NanoBot Innovations",
    price: 18.75,
    change: 12.3,
    category: "AI/ML"
  },
  {
    name: "Solar Grid Systems",
    price: 42.10,
    change: -2.1,
    category: "Defence Sector"
  },
  {
    name: "Digital Health Hub",
    price: 25.60,
    change: 5.7,
    category: "HealthTech"
  }
];

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const totalPortfolioValue = myInvestments.reduce((sum, investment) => sum + investment.totalValue, 0);
  const totalGainLoss = myInvestments.reduce((sum, investment) => {
    const gain = (investment.currentPrice - investment.avgPrice) * investment.shares;
    return sum + gain;
  }, 0);
  const totalGainLossPercent = (totalGainLoss / (totalPortfolioValue - totalGainLoss)) * 100;

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
              <span className="text-white text-xl font-bold">Denzope</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Bell className="h-4 w-4" />
              </Button>
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
          <h1 className="text-3xl font-bold text-white mb-2">Investment Dashboard</h1>
          <p className="text-white/70">Track your portfolio, discover new opportunities, and manage your investments</p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Portfolio Value</CardTitle>
              <Portfolio className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalPortfolioValue.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-sm">
                {totalGainLoss >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-400" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-400" />
                )}
                <span className={totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(1)}% this month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Gain/Loss</CardTitle>
              <TrendingUp className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}
              </div>
              <div className="text-sm text-white/70">
                {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(1)}% return
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active Investments</CardTitle>
              <DollarSign className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{myInvestments.length}</div>
              <div className="text-sm text-white/70">Across {allocationData.length} sectors</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Available Cash</CardTitle>
              <DollarSign className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$5,750</div>
              <div className="text-sm text-white/70">Ready to invest</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-white/20">Portfolio</TabsTrigger>
            <TabsTrigger value="explore" className="data-[state=active]:bg-white/20">Explore</TabsTrigger>
            <TabsTrigger value="watchlist" className="data-[state=active]:bg-white/20">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Performance Chart */}
              <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Portfolio Performance</CardTitle>
                  <CardDescription className="text-white/70">Your investment growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Portfolio Allocation */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Portfolio Allocation</CardTitle>
                  <CardDescription className="text-white/70">Investment by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {allocationData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-white/80 text-sm">{item.name}</span>
                        </div>
                        <span className="text-white text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">Your latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">Purchased 50 shares of TechVision AI</p>
                        <p className="text-white/60 text-sm">2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-medium">+$1,225</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">Dividend received from HealthTech Pro</p>
                        <p className="text-white/60 text-sm">1 day ago</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-medium">+$45.50</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">New message from GreenEnergy Flow founder</p>
                        <p className="text-white/60 text-sm">3 days ago</p>
                      </div>
                    </div>
                    <Link href="/chat">
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {myInvestments.map((investment) => (
                <Card key={investment.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{investment.name}</h3>
                          <Badge variant="secondary" className="bg-white/20 text-white/80 mt-1">
                            {investment.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-xl font-bold">${investment.totalValue.toLocaleString()}</div>
                        <div className={`flex items-center space-x-1 ${investment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {investment.change >= 0 ? (
                            <ArrowUpIcon className="h-4 w-4" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4" />
                          )}
                          <span>{investment.change >= 0 ? '+' : ''}{investment.change.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">Shares Owned</p>
                        <p className="text-white font-medium">{investment.shares}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Avg. Price</p>
                        <p className="text-white font-medium">${investment.avgPrice}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Current Price</p>
                        <p className="text-white font-medium">${investment.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Gain/Loss</p>
                        <p className={`font-medium ${investment.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${((investment.currentPrice - investment.avgPrice) * investment.shares).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      <Link href={`/startup/${investment.id}`}>
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                        Buy More
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                        Sell
                      </Button>
                      <Link href="/chat">
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <div className="text-center py-8">
              <h3 className="text-white text-xl font-semibold mb-4">Discover New Investment Opportunities</h3>
              <p className="text-white/70 mb-6">Explore innovative startups ready for investment</p>
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Browse All Startups
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Your Watchlist</CardTitle>
                <CardDescription className="text-white/70">Startups you're tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <Badge variant="secondary" className="bg-white/20 text-white/80 mt-1">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-semibold">${item.price}</div>
                          <div className={`text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {item.change >= 0 ? '+' : ''}{item.change}%
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          Invest
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}