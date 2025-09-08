'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  Mail,
  Eye,
  TrendingUp,
  MessageCircle,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Mock data - in a real application, this would come from an API
const mockStats = {
  totalVisitors: 12847,
  monthlyVisitors: 2453,
  blogViews: 8934,
  contactMessages: 47,
  newsletterSubscribers: 234,
  resumeDownloads: 156
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'contact',
    message: 'New contact form submission from John Doe',
    timestamp: '2024-01-15T10:30:00Z',
    priority: 'high'
  },
  {
    id: 2,
    type: 'newsletter',
    message: 'New newsletter subscription: jane@example.com',
    timestamp: '2024-01-15T09:15:00Z',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'blog',
    message: 'Blog post "Building Scalable Microservices" reached 500 views',
    timestamp: '2024-01-15T08:45:00Z',
    priority: 'low'
  },
  {
    id: 4,
    type: 'resume',
    message: 'Resume downloaded 15 times today',
    timestamp: '2024-01-15T07:20:00Z',
    priority: 'low'
  }
];

const mockContacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Frontend Developer Position',
    message: 'Hi Gaurav, I came across your portfolio and I\'m impressed with your work. We have an opening for a Senior Frontend Developer position...',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'unread'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    subject: 'Project Collaboration',
    message: 'Hello! I\'d like to discuss a potential collaboration on a React.js project. Are you available for freelance work?',
    timestamp: '2024-01-14T16:45:00Z',
    status: 'read'
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@startup.io',
    subject: 'Full-Stack Developer Role',
    message: 'We\'re a growing startup looking for a full-stack developer with your skill set. Would you be interested in a discussion?',
    timestamp: '2024-01-14T11:20:00Z',
    status: 'replied'
  }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simple authentication - in production, use proper authentication
  const handleLogin = () => {
    if (password === 'admin123') { // This should be properly secured
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const statCards = [
    {
      title: "Total Visitors",
      value: mockStats.totalVisitors.toLocaleString(),
      change: "+12.5%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Monthly Visitors",
      value: mockStats.monthlyVisitors.toLocaleString(),
      change: "+8.2%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Blog Views",
      value: mockStats.blogViews.toLocaleString(),
      change: "+15.3%",
      icon: Eye,
      trend: "up"
    },
    {
      title: "Contact Messages",
      value: mockStats.contactMessages.toString(),
      change: "+3",
      icon: MessageCircle,
      trend: "up"
    },
    {
      title: "Newsletter Subscribers",
      value: mockStats.newsletterSubscribers.toString(),
      change: "+22",
      icon: Mail,
      trend: "up"
    },
    {
      title: "Resume Downloads",
      value: mockStats.resumeDownloads.toString(),
      change: "+7",
      icon: Download,
      trend: "up"
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>
                Enter the admin password to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <div className="text-center">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Portfolio
                  </Button>
                </Link>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                <p className="text-xs text-muted-foreground">
                  <strong>Demo Note:</strong> This is a demo admin panel. In production, proper authentication and authorization would be implemented.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div 
        className="container mx-auto px-4 py-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio and track performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-8 h-8 text-blue-500" />
                          <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest events and interactions on your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.priority === 'high' ? 'bg-red-500' :
                          activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Messages
                </CardTitle>
                <CardDescription>
                  Messages received through the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          <p className="text-sm font-medium mt-1">{contact.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            contact.status === 'unread' ? 'destructive' :
                            contact.status === 'read' ? 'secondary' : 'default'
                          }>
                            {contact.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {new Date(contact.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {contact.message}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm">Reply</Button>
                        <Button size="sm" variant="outline">Mark as Read</Button>
                        <Button size="sm" variant="ghost">Archive</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Website traffic for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">Chart visualization would go here</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Integration with analytics services like Google Analytics or Vercel Analytics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Content</CardTitle>
                  <CardDescription>Most viewed pages and blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Home Page', views: 3245, change: '+12%' },
                      { title: 'Building Scalable Microservices', views: 1892, change: '+28%' },
                      { title: 'About Section', views: 1654, change: '+5%' },
                      { title: 'Projects Section', views: 1423, change: '+15%' },
                      { title: 'Resume Assistant', views: 987, change: '+45%' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.views} views</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          {item.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Content Management
                  </CardTitle>
                  <CardDescription>
                    Manage blog posts and portfolio content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Create New Blog Post</Button>
                  <Button variant="outline" className="w-full">Edit About Section</Button>
                  <Button variant="outline" className="w-full">Update Projects</Button>
                  <Button variant="outline" className="w-full">Manage Skills</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { service: 'Website', status: 'online', icon: CheckCircle },
                    { service: 'Contact Form', status: 'online', icon: CheckCircle },
                    { service: 'Newsletter', status: 'online', icon: CheckCircle },
                    { service: 'Resume Assistant', status: 'online', icon: CheckCircle },
                    { service: 'Analytics', status: 'online', icon: CheckCircle }
                  ].map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-green-500" />
                          <span>{service.service}</span>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          {service.status}
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Demo Admin Panel</h4>
              <p className="text-sm text-muted-foreground">
                This is a demonstration admin panel showing potential features for portfolio management. 
                In a production environment, this would include:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground space-y-1">
                <li>Secure authentication with proper session management</li>
                <li>Real-time analytics integration</li>
                <li>Database-backed content management</li>
                <li>Email notification system</li>
                <li>Automated backup and monitoring</li>
                <li>Role-based access control</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
