'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Clock, 
  User, 
  Share2,
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react';

// This would normally come from a CMS or database
const getBlogPost = (slug: string) => {
  const posts = {
    '1': {
      id: 1,
      title: "Building Scalable Microservices with Node.js and Docker",
      excerpt: "Learn how to architect and deploy microservices that can handle enterprise-level traffic while maintaining code quality and performance.",
      content: `
# Building Scalable Microservices with Node.js and Docker

In today's fast-paced development environment, the ability to build and deploy scalable microservices has become crucial for enterprise applications. At Bosch Global Software Technologies, I've had the opportunity to architect and implement microservices that handle thousands of requests per minute while maintaining high availability and performance.

## Why Microservices?

The monolithic architecture, while simpler to start with, quickly becomes a bottleneck as your application grows. Here are the key advantages I've experienced with microservices:

- **Independent Scaling**: Scale individual services based on demand
- **Technology Diversity**: Use the right tool for the right job
- **Fault Isolation**: One service failure doesn't bring down the entire system
- **Team Autonomy**: Different teams can work on different services independently

## Architecture Overview

Our microservices architecture consists of:

\`\`\`
├── API Gateway (Kong/NGINX)
├── Service Discovery (Consul/Eureka)
├── Authentication Service (Node.js + JWT)
├── User Service (Node.js + PostgreSQL)
├── Notification Service (Node.js + Redis)
├── File Service (Node.js + AWS S3)
└── Analytics Service (Python + MongoDB)
\`\`\`

### Key Components

1. **API Gateway**: Central entry point for all client requests
2. **Service Discovery**: Automatic service registration and discovery
3. **Load Balancer**: Distribute traffic across service instances
4. **Message Queue**: Asynchronous communication between services

## Implementation with Node.js

Here's a basic microservice structure I use:

\`\`\`javascript
// user-service/src/app.js
const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');
const jwt = require('jsonwebtoken');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const redisClient = redis.createClient(process.env.REDIS_URL);

// Middleware
app.use(express.json());
app.use(authMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'user-service' });
});

// User endpoints
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check cache first
    const cached = await redisClient.get(\`user:\${id}\`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    // Query database
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Cache result
    await redisClient.setex(\`user:\${id}\`, 300, JSON.stringify(user));
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`User service listening on port \${PORT}\`);
});
\`\`\`

## Docker Configuration

Each microservice runs in its own Docker container:

\`\`\`dockerfile
# user-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY src/ ./src/

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["node", "src/app.js"]
\`\`\`

## Docker Compose for Development

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  api-gateway:
    image: kong:latest
    ports:
      - "8000:8000"
      - "8001:8001"
    environment:
      - KONG_DATABASE=off
      - KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml
    volumes:
      - ./kong.yml:/kong/declarative/kong.yml

  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/users
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
    depends_on:
      - postgres
      - redis

  notification-service:
    build: ./notification-service
    ports:
      - "3002:3002"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=users
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Performance Optimizations

Based on my experience at Bosch, here are key optimizations that helped us achieve **25% faster API response times**:

### 1. Database Query Optimization
- Use database indexes strategically
- Implement connection pooling
- Cache frequently accessed data with Redis

### 2. Service Communication
- Use HTTP/2 for internal service communication
- Implement circuit breakers for fault tolerance
- Use message queues for non-critical operations

### 3. Caching Strategy
\`\`\`javascript
// Redis caching middleware
const cacheMiddleware = (ttl = 300) => {
  return async (req, res, next) => {
    const key = \`cache:\${req.originalUrl}\`;
    const cached = await redisClient.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      redisClient.setex(key, ttl, JSON.stringify(data));
      return originalJson.call(this, data);
    };
    
    next();
  };
};
\`\`\`

## Monitoring and Logging

Implement comprehensive monitoring:

\`\`\`javascript
// metrics.js
const promClient = require('prom-client');

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

module.exports = { httpRequestDuration, httpRequestTotal };
\`\`\`

## Production Deployment

For production deployment, we use Kubernetes:

\`\`\`yaml
# user-service-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: your-registry/user-service:latest
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 3001
    targetPort: 3001
\`\`\`

## Lessons Learned

Through implementing microservices at Bosch, I've learned:

1. **Start Simple**: Begin with a well-defined monolith, then extract services
2. **Service Boundaries**: Define clear service boundaries based on business domains
3. **Data Consistency**: Use eventual consistency and saga patterns
4. **Testing Strategy**: Implement contract testing between services
5. **Monitoring**: Comprehensive logging and monitoring is crucial

## Results

The microservices architecture we implemented resulted in:

- **20% reduction in operational effort** through automation
- **25% faster API response times** through caching and optimization
- **80% faster deployment times** with CI/CD pipelines
- **Improved system reliability** with fault isolation

## Conclusion

Building scalable microservices requires careful planning, proper tooling, and a solid understanding of distributed systems. The combination of Node.js and Docker provides an excellent foundation for creating maintainable and scalable microservices.

The key is to start simple, measure everything, and iterate based on real-world usage patterns. With the right approach, microservices can significantly improve your application's scalability and team productivity.

## Related Resources

- [Docker Documentation](https://docs.docker.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Microservices Patterns by Chris Richardson](https://microservices.io/patterns/)
- [Kong API Gateway](https://konghq.com/kong/)

---

*Have questions about microservices architecture? Feel free to reach out to me on [LinkedIn](https://linkedin.com/in/gaurav-raj) or [GitHub](https://github.com/grajrb).*
      `,
      category: "Backend",
      tags: ["Node.js", "Docker", "Microservices", "DevOps", "PostgreSQL", "Redis", "Kubernetes"],
      readTime: "8 min read",
      publishDate: "2024-01-15",
      author: "Gaurav Raj",
      featured: true,
      views: 1247,
      likes: 89,
      comments: 12
    }
  };
  
  return posts[slug] || null;
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div 
        className="container mx-auto px-4 py-12 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="mb-4">
            <Badge className="mb-4">{post.category}</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Article Stats */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="w-4 h-4" />
              {post.likes}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <Separator className="mb-8" />

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
        />

        {/* Article Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Separator className="mb-8" />
          
          {/* Author Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle>About {post.author}</CardTitle>
                  <CardDescription>
                    Full-Stack Developer at Bosch Global Software Technologies
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gaurav is a passionate full-stack developer with 1.9+ years of experience in building scalable web applications. 
                He specializes in React.js, Node.js, and cloud technologies, with a proven track record of delivering 
                high-impact solutions that reduce operational costs and improve performance.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Link href="/portfolio">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Portfolio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Related Articles</CardTitle>
              <CardDescription>
                More content you might find interesting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "React Performance Optimization: Advanced Techniques",
                    category: "Frontend",
                    readTime: "12 min read",
                    link: "/blog/2"
                  },
                  {
                    title: "DevOps Best Practices: From Development to Production",
                    category: "DevOps",
                    readTime: "15 min read",
                    link: "/blog/3"
                  },
                  {
                    title: "Database Optimization: PostgreSQL Query Performance",
                    category: "Database",
                    readTime: "10 min read",
                    link: "/blog/4"
                  }
                ].map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <Link href={article.link}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/blog">
                  <Button variant="outline">
                    View All Articles
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
