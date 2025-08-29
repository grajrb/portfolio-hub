import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PageTransition } from '@/components/layout/page-transition';
import { ScrollProgress } from '@/components/layout/scroll-progress';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Portfolio',
    default: 'Portfolio - Full Stack Developer & AI Engineer',
  },
  description: 'Portfolio website showcasing full-stack development skills, AI engineering projects, and innovative web solutions.',
  keywords: [
    'Full Stack Developer',
    'AI Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Machine Learning',
    'Web Development',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('https://grajrb.github.io/portfolio-hub'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://grajrb.github.io/portfolio-hub',
    title: 'Portfolio - Full Stack Developer & AI Engineer',
    description: 'Portfolio website showcasing full-stack development skills, AI engineering projects, and innovative web solutions.',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Full Stack Developer & AI Engineer',
    description: 'Portfolio website showcasing full-stack development skills, AI engineering projects, and innovative web solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              <ScrollProgress />
              <PageTransition>
                {children}
              </PageTransition>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
