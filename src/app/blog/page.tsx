'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Filter,
  BookOpen,
  Code2,
  Lightbulb,
  Rocket,
  TrendingUp
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Microservices with Node.js and Docker",
    excerpt: "Learn how to architect and deploy microservices that can handle enterprise-level traffic while maintaining code quality and performance.",
    category: "Backend",
    tags: ["Node.js", "Docker", "Microservices", "DevOps"],
    readTime: "8 min read",
    publishDate: "2024-01-15",
    author: "Gaurav Raj",
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "React Performance Optimization: Advanced Techniques",
    excerpt: "Discover advanced React optimization strategies including code splitting, memoization, and virtual DOM optimization for lightning-fast UIs.",
    category: "Frontend",
    tags: ["React", "Performance", "JavaScript", "Optimization"],
    readTime: "12 min read",
    publishDate: "2024-01-10",
    author: "Gaurav Raj",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "DevOps Best Practices: From Development to Production",
    excerpt: "A comprehensive guide to implementing DevOps practices that reduced our deployment time by 80% and improved system reliability.",
    category: "DevOps",
    tags: ["DevOps", "CI/CD", "Jenkins", "Azure", "Automation"],
    readTime: "15 min read",
    publishDate: "2024-01-05",
    author: "Gaurav Raj",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Database Optimization: PostgreSQL Query Performance",
    excerpt: "How we achieved 25% faster API response times through strategic database indexing and query optimization techniques.",
    category: "Database",
    tags: ["PostgreSQL", "Database", "Performance", "SQL"],
    readTime: "10 min read",
    publishDate: "2023-12-28",
    author: "Gaurav Raj",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "The Future of Web Development: What's Next in 2024",
    excerpt: "Exploring emerging trends in web development including AI integration, edge computing, and the evolution of JavaScript frameworks.",
    category: "Industry",
    tags: ["Web Development", "Trends", "AI", "Future Tech"],
    readTime: "7 min read",
    publishDate: "2023-12-20",
    author: "Gaurav Raj",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "System Design Interview: Designing a Chat Application",
    excerpt: "Step-by-step approach to designing a scalable chat application for system design interviews with real-world considerations.",
    category: "System Design",
    tags: ["System Design", "Interviews", "Architecture", "Scalability"],
    readTime: "20 min read",
    publishDate: "2023-12-15",
    author: "Gaurav Raj",
    image: "/api/placeholder/400/250"
  }
];

const categories = [
  { name: "All", count: blogPosts.length, icon: BookOpen },
  { name: "Frontend", count: blogPosts.filter(p => p.category === "Frontend").length, icon: Code2 },
  { name: "Backend", count: blogPosts.filter(p => p.category === "Backend").length, icon: Rocket },
  { name: "DevOps", count: blogPosts.filter(p => p.category === "DevOps").length, icon: TrendingUp },
  { name: "Database", count: blogPosts.filter(p => p.category === "Database").length, icon: Lightbulb },
  { name: "System Design", count: blogPosts.filter(p => p.category === "System Design").length, icon: BookOpen },
  { name: "Industry", count: blogPosts.filter(p => p.category === "Industry").length, icon: TrendingUp }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentTab, setCurrentTab] = useState('recent');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 5);
  const popularTags = ["React", "Node.js", "TypeScript", "DevOps", "PostgreSQL", "System Design", "Performance"];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div 
        className="container mx-auto px-4 py-12 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Development Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and experiences from building modern web applications
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    ⭐ Featured Post
                  </Badge>
                  <CardTitle className="text-2xl mb-4 line-clamp-2">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${featuredPost.id}`}>
                    <Button size="lg" className="group">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className="lg:p-8 p-4">
                  <div className="w-full h-64 lg:h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                    <Code2 className="w-24 h-24 text-blue-500/50" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles, topics, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2 md:w-auto w-full">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name} ({category.count})
                </Button>
              );
            })}
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="recent">Recent Posts</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-8">
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center relative overflow-hidden">
                      <Code2 className="w-16 h-16 text-blue-500/30 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.id}`} className="block">
                        <Button variant="ghost" size="sm" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or category selection.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts
                .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
                .map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 flex items-center justify-center relative overflow-hidden">
                        <TrendingUp className="w-16 h-16 text-green-500/30 group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-500">#{index + 1} Popular</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <Link href={`/blog/${post.id}`} className="block">
                          <Button variant="ghost" size="sm" className="w-full group-hover:bg-green-50 dark:group-hover:bg-green-950/50">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Code2 className="w-6 h-6 text-purple-500" />
                      </div>
                      <h3 className="font-semibold mb-2">{tag}</h3>
                      <p className="text-sm text-muted-foreground">
                        {blogPosts.filter(post => post.tags.includes(tag)).length} articles
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Coming Soon Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mt-16"
        >
          <Card className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="text-2xl">More Content Coming Soon!</CardTitle>
              <CardDescription className="text-lg">
                I'm constantly writing about new technologies and sharing development insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Subscribe to my newsletter to get notified when new articles are published.
              </p>
              <Link href="/newsletter">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Subscribe to Newsletter
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
