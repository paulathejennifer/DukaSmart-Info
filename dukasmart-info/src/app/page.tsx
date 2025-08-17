
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gem, BarChart, Package, Users, Zap, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function LandingPage() {

  const features = [
    {
      icon: <Package className="w-8 h-8 text-primary" />,
      title: "Effortless Inventory",
      description: "Keep track of your stock with a simple, intuitive interface. Get low-stock alerts so you never run out."
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Insightful Reports",
      description: "Understand your business better with easy-to-read reports on sales, stock levels, and revenue."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Customer Management",
      description: "Build a loyal customer base by keeping track of their purchases and preferences (coming soon)."
    },
     {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Fast & Reliable",
      description: "Built on a modern, secure, and fast technology stack to ensure your data is safe and accessible anytime."
    }
  ];
  
  const navLinks = [
      { href: "/features", label: "Features" },
      { href: "/about", label: "About" },
      { href: "/resources", label: "Resources" },
      { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Gem className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">DukaSmart</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary" prefetch={false}>
                    {link.label}
                </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" href="/login">
                Login
            </Button>
            <Button href="/signup">
                Get Started
            </Button>
          </div>
           <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid gap-6 p-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Gem className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">DukaSmart</span>
                        </Link>
                        <nav className="grid gap-4">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="grid gap-2">
                             <Button variant="ghost" href="/">
                                Login
                            </Button>
                            <Button href="/signup">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
           </div>
        </div>
      </header>
      
      <main className="flex-1">
        <motion.section 
          className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 py-24 text-center md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            Smart Duka, Smart Life
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Stop guessing, start selling. DukaSmart is the easiest way for small retail businesses in Africa to track stock, manage sales, and grow.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" href="/signup">
                Get Started for Free
            </Button>
             <Button size="lg" variant="outline" href="/login">
                Login to Dashboard
            </Button>
          </div>
        </motion.section>
        

        <section id="features" className="w-full bg-muted/40 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                 <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Key Features</div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything you need to run your shop smarter.</h2>
                 <p className="text-muted-foreground">
                    DukaSmart is designed to be powerful yet easy to use. Spend less time on paperwork and more time with your customers.
                 </p>
              </div>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                    <motion.div 
                        key={feature.title}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        {feature.icon}
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-muted/40 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <div className="flex items-center gap-2">
                <Gem className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold">DukaSmart</span>
            </div>
            <p className="text-sm text-muted-foreground">&copy; 2024 DukaSmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
