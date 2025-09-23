import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple in-memory cache (per serverless instance) to reduce DB hits
// Suitable for low/medium traffic; for production consider edge caching or KV.
let cached: any = null;
let cacheExpires = 0;
const TTL_MS = 60 * 1000; // 1 minute

// Simple aggregation endpoint combining various counts. In production you might cache this.
export async function GET() {
  try {
    const now = Date.now();
    if (cached && now < cacheExpires) {
      return NextResponse.json({ ...cached, cached: true });
    }
    const [totalSubscribers, recentSubscribers, totalContacts, recentContacts, totalProjects, totalBlogPosts] = await Promise.all([
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),
      prisma.newsletterSubscriber.count({
        where: {
          isActive: true,
          subscribedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.contact.count(),
      prisma.contact.count({
        where: {
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.project.count(),
      prisma.blogPost.count({ where: { isPublished: true } }),
    ]);

    cached = {
      totalSubscribers,
      recentSubscribers,
      totalContacts,
      recentContacts,
      totalProjects,
      totalBlogPosts,
      generatedAt: new Date().toISOString(),
    };
    cacheExpires = now + TTL_MS;

    return NextResponse.json({ ...cached, cached: false });
  } catch (error) {
    console.error('Stats aggregation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
