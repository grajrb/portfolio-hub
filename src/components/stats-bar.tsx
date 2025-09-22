"use client";
import { useStats } from '@/lib/stats';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatsBarProps {
  className?: string;
}

const items: { key: keyof ReturnType<typeof mapStatsToDisplay>[number]; label: string }[] = [];

function mapStatsToDisplay(stats: any) {
  return [
    { key: 'totalSubscribers', label: 'Subscribers', value: stats.totalSubscribers },
    { key: 'totalContacts', label: 'Messages', value: stats.totalContacts },
    { key: 'totalProjects', label: 'Projects', value: stats.totalProjects },
    { key: 'totalBlogPosts', label: 'Blog Posts', value: stats.totalBlogPosts },
  ];
}

export function StatsBar({ className }: StatsBarProps) {
  const { data, isLoading, isError } = useStats();

  if (isError || !data) return null;

  const display = mapStatsToDisplay(data).filter((d) => d.value > 0);
  if (!display.length) return null;

  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10', className)}>
      {display.map((item, i) => (
        <motion.div
          key={item.key}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className='rounded-md border bg-card p-4 text-center shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='text-2xl font-bold tabular-nums'>{item.value}</div>
          <div className='mt-1 text-xs uppercase tracking-wide text-muted-foreground'>{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
