"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { ArrowRight, Check, Layers } from "lucide-react"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Layers className="h-6 w-6" />
          <span>ModernCMS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:underline underline-offset-4">
            Documentation
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                  >
                    The Next Generation CMS for Modern Websites
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
                  >
                    Build beautiful, responsive websites with our intuitive content management system. No coding
                    required.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  {session ? (
                    <Link href="/dashboard">
                      <Button size="lg" className="gap-2">
                        Go to Dashboard <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button size="lg">Get Started</Button>
                      </Link>
                      <Link href="/demo">
                        <Button variant="outline" size="lg">
                          View Demo
                        </Button>
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-background">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background" />
                  <img
                    src="/placeholder.svg?height=500&width=800"
                    alt="Dashboard Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted-foreground/20 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Build Amazing Websites
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our CMS combines the ease of WordPress with the power of Next.js to give you the ultimate website
                  building experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-lg border bg-background p-6"
                >
                  <div className="flex flex-col space-y-2">
                    <feature.icon className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already building amazing websites with ModernCMS.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg">Sign Up Now</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ModernCMS. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Visual Page Builder",
    description: "Drag and drop components to build beautiful pages without writing code.",
    icon: Layers,
  },
  {
    title: "E-commerce Ready",
    description: "Sell products online with built-in shopping cart and payment processing.",
    icon: Check,
  },
  {
    title: "SEO Optimized",
    description: "Rank higher in search results with our SEO-friendly structure.",
    icon: Check,
  },
  {
    title: "Form Builder",
    description: "Create custom forms to collect information from your visitors.",
    icon: Check,
  },
  {
    title: "Plugin System",
    description: "Extend functionality with our growing library of plugins.",
    icon: Check,
  },
  {
    title: "Theme Customization",
    description: "Choose from multiple themes or create your own custom design.",
    icon: Check,
  },
]
