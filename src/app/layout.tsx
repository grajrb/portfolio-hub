import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | Gaurav Raj Portfolio',
    default: 'Gaurav Raj - Full Stack Developer & Software Engineer',
  },
  description: 'Portfolio of Gaurav Raj - Full-Stack Developer with 2 years of experience at Bosch Global Software Technologies. Expert in React.js, Node.js, microservices, and cloud technologies.',
  keywords: [
    'Gaurav Raj',
    'Full Stack Developer',
    'Software Engineer',
    'React.js',
    'Node.js',
    'TypeScript',
    'Next.js',
    'Bosch Global Software Technologies',
    'MERN Stack',
    'DevOps',
    'AWS',
    'Azure',
    'Microservices',
    'System Design',
  ],
  authors: [{ name: 'Gaurav Raj' }],
  creator: 'Gaurav Raj',
  metadataBase: new URL('https://portfolio-hub-chi.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
  url: 'https://portfolio-hub-chi.vercel.app',
    title: 'Gaurav Raj - Full Stack Developer & Software Engineer',
    description: 'Portfolio of Gaurav Raj - Full-Stack Developer with 2 years of experience. Expert in React.js, Node.js, microservices, and cloud technologies.',
    siteName: 'Gaurav Raj Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaurav Raj - Full Stack Developer & Software Engineer',
    description: 'Portfolio of Gaurav Raj - Full-Stack Developer with expertise in modern web technologies and cloud solutions.',
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
