import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Layers, Zap, Code, Database, PaintBucket, Lock, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Layers className="h-6 w-6" />
            <span>ModernCMS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">The Modern CMS for the Modern Web</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              Build beautiful websites and online stores without code. Combine the ease of WordPress with the power of
              Next.js.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
            <div className="mt-16 relative w-full max-w-5xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur-lg opacity-75"></div>
              <div className="relative bg-background rounded-lg border overflow-hidden">
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  alt="ModernCMS Dashboard Preview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Everything You Need to Build Modern Websites
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<PaintBucket />}
                title="Visual Page Builder"
                description="Drag-and-drop interface to build pages visually without writing code."
              />
              <FeatureCard
                icon={<Code />}
                title="Developer Friendly"
                description="Built with React, Next.js, and TypeScript for maximum flexibility."
              />
              <FeatureCard
                icon={<Database />}
                title="Headless Architecture"
                description="Connect to any database or API with our flexible backend."
              />
              <FeatureCard
                icon={<Zap />}
                title="Lightning Fast"
                description="Optimized for performance with server-side rendering and static generation."
              />
              <FeatureCard
                icon={<Lock />}
                title="Multi-tenant Ready"
                description="Host multiple websites under one account with role-based permissions."
              />
              <FeatureCard
                icon={<Globe />}
                title="Deploy Anywhere"
                description="One-click deployment to Vercel or export as Docker containers."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Next Website?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of businesses building better websites with ModernCMS.
            </p>
            <Link href="/dashboard">
              <Button size="lg">Start Building Now</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold mb-4 md:mb-0">
            <Layers className="h-5 w-5" />
            <span>ModernCMS</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ModernCMS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-background rounded-lg border p-6 transition-all hover:shadow-md">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
