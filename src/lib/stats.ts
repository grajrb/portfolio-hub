import { useQuery } from '@tanstack/react-query';

export interface SiteStats {
  totalSubscribers: number;
  recentSubscribers: number;
  totalContacts: number;
  recentContacts: number;
  totalProjects: number;
  totalBlogPosts: number;
  generatedAt: string;
}

export async function fetchStats(): Promise<SiteStats> {
  const res = await fetch('/api/stats', { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to load stats');
  return res.json();
}

export function useStats() {
  return useQuery<SiteStats, Error>({
    queryKey: ['site-stats'],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
