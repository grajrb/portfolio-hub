import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple aggregation endpoint combining various counts. In production you might cache this.
export async function GET() {
  try {
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

    return NextResponse.json({
      totalSubscribers,
      recentSubscribers,
      totalContacts,
      recentContacts,
      totalProjects,
      totalBlogPosts,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Stats aggregation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
