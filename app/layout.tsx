import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from '@/components/providers/query-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio Hub - Full Stack Developer & AI Engineer',
  description: 'Professional portfolio showcasing full-stack development, AI integration, and modern web technologies. Expert in React, Next.js, Python, and cloud solutions.',
  keywords: 'full stack developer, AI engineer, React, Next.js, Python, portfolio, web development',
  authors: [{ name: 'Gaurav Raj', url: 'https://www.linkedin.com/in/gaurav-raj1/' }],
  creator: 'Gaurav Raj',
  publisher: 'Gaurav Raj',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  url: 'https://portfolio-hub-chi.vercel.app',
    title: 'Portfolio Hub - Full Stack Developer & AI Engineer',
    description: 'Professional portfolio showcasing full-stack development, AI integration, and modern web technologies.',
    siteName: 'Portfolio Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Hub - Full Stack Developer & AI Engineer',
    description: 'Professional portfolio showcasing full-stack development, AI integration, and modern web technologies.',
  creator: '@gaurav_raj',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              {children}
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
