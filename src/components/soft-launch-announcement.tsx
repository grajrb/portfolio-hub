"use client";
import { useEffect, useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SoftLaunchAnnouncementProps {
  featureName: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
  stage?: 'alpha' | 'beta' | 'preview';
  storageKey?: string; // for independent dismissal if multiple banners
  className?: string;
  icon?: React.ReactNode;
}

export function SoftLaunchAnnouncement({
  featureName,
  message = 'We\'re rolling this out gradually. Feedback is welcome! ❤️',
  ctaLabel,
  ctaHref,
  stage = 'beta',
  storageKey,
  className,
  icon,
}: SoftLaunchAnnouncementProps) {
  const key = storageKey || `soft-launch-${featureName.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(key);
      if (!dismissed) setOpen(true);
    } catch {}
  }, [key]);

  function dismiss() {
    try { localStorage.setItem(key, '1'); } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className={cn('relative overflow-hidden rounded-md border bg-gradient-to-r from-primary/10 via-primary/5 to-background p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 shadow-sm', className)}>
      <div className='flex items-start gap-3 text-sm'>
        <div className='mt-0.5 text-primary'>
          {icon || <Megaphone className='h-5 w-5' />}
        </div>
        <div>
          <p className='font-medium'>New: {featureName} <span className='ml-2 text-xs rounded bg-primary/20 text-primary px-2 py-0.5 uppercase tracking-wide'>{stage}</span></p>
          <p className='text-muted-foreground mt-1 leading-relaxed'>{message}</p>
          {ctaLabel && ctaHref && (
            <Button asChild size='sm' variant='outline' className='mt-3'>
              <a href={ctaHref} target='_blank' rel='noreferrer'>{ctaLabel}</a>
            </Button>
          )}
        </div>
      </div>
      <button onClick={dismiss} aria-label='Dismiss announcement' className='absolute top-2 right-2 rounded p-1 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors'>
        <X className='h-4 w-4' />
      </button>
    </div>
  );
}
