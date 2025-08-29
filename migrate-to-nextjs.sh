#!/bin/bash
# Portfolio Migration Script
# This script will help migrate your current Vite React portfolio to Next.js

echo "🚀 Starting Portfolio Migration to Next.js with Advanced Features"

# Step 1: Backup current project
echo "📦 Creating backup of current project..."
cp -r . ../portfolio-backup

# Step 2: Install Next.js dependencies
echo "📥 Installing Next.js and required dependencies..."
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/node @types/react @types/react-dom

# Step 3: Install UI and Animation libraries
echo "🎨 Installing UI and Animation libraries..."
npm install framer-motion @prisma/client prisma zod @hookform/resolvers
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-aspect-ratio @radix-ui/react-avatar
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-navigation-menu @radix-ui/react-scroll-area
npm install @radix-ui/react-tabs @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge lucide-react sonner

# Step 4: Install AI SDK and Analytics
echo "🤖 Installing AI SDK and Analytics..."
npm install ai @ai-sdk/openai @ai-sdk/anthropic
npm install @vercel/analytics @vercel/speed-insights

# Step 5: Install dev dependencies
echo "🛠️ Installing development dependencies..."
npm install -D prettier husky lint-staged @tailwindcss/typography tailwindcss-animate

echo "✅ Dependencies installed! Next steps:"
echo "1. Configure Next.js app directory structure"
echo "2. Migrate components to new structure"
echo "3. Set up database with Prisma"
echo "4. Implement AI features"
echo "5. Deploy to Vercel"
