'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  Code2, 
  Brain, 
  Rocket,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  interests: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const interests = [
  { id: 'web-dev', label: 'Web Development', icon: Code2 },
  { id: 'ai-ml', label: 'AI & Machine Learning', icon: Brain },
  { id: 'startups', label: 'Startup Stories', icon: Rocket },
  { id: 'career', label: 'Career Tips', icon: TrendingUp },
  { id: 'tutorials', label: 'Tutorials & Guides', icon: Award },
  { id: 'industry', label: 'Industry Insights', icon: Users },
];

const benefits = [
  'Weekly insights on latest web development trends',
  'Exclusive tutorials and code snippets',
  'Behind-the-scenes project stories',
  'Career advice and industry tips',
  'Early access to new tools and resources',
  'Community highlights and discussions',
];

const stats = [
  { number: '2.5K+', label: 'Subscribers' },
  { number: '95%', label: 'Open Rate' },
  { number: '4.8/5', label: 'Rating' },
  { number: 'Weekly', label: 'Frequency' },
];

export default function NewsletterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interestId]);
    } else {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          interests: selectedInterests,
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        toast({
          title: "Welcome aboard! 🎉",
          description: "You've successfully subscribed to my newsletter.",
          duration: 5000,
        });
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-4">Welcome to the Community!</h1>
          <p className="text-muted-foreground mb-8">
            Thanks for subscribing! You'll receive your first newsletter soon. 
            Check your email for a confirmation link.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft size={16} className="mr-2" />
                Back to Portfolio
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/resume-assistant">
                Try Resume Assistant
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 py-20">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Mail size={16} className="mr-2" />
            Newsletter
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Stay In The
            <span className="text-primary"> Loop</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers and get weekly insights on web development, 
            AI integration, career tips, and exclusive behind-the-scenes content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="text-primary" size={24} />
                  <span>Subscribe Now</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your.email@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Your name"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>What interests you? (Optional)</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {interests.map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest.id}
                            checked={selectedInterests.includes(interest.id)}
                            onCheckedChange={(checked) => 
                              handleInterestChange(interest.id, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={interest.id}
                            className="text-sm font-normal flex items-center space-x-2 cursor-pointer"
                          >
                            <interest.icon size={16} className="text-primary" />
                            <span>{interest.label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Mail className="mr-2 h-4 w-4 animate-pulse" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                        Subscribe for Free
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    No spam, ever. Unsubscribe with one click anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="text-center p-4 border-2 hover:border-primary/20 transition-all duration-300">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* What You'll Get */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sample Newsletter Preview */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="text-primary" size={20} />
                  <span className="font-semibold">Latest Issue Preview</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="font-medium text-foreground">
                    "Building AI-Powered Apps with Next.js and OpenAI"
                  </div>
                  <div>📚 Tutorial: Creating a smart resume analyzer</div>
                  <div>🚀 Project spotlight: Real-time collaboration tools</div>
                  <div>💡 Tip: Optimizing React performance with useMemo</div>
                  <div>📈 Industry insight: The future of web development</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
