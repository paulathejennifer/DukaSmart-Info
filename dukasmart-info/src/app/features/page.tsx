
"use client";

import { motion } from "framer-motion";
import { Package, BarChart, Users, Zap, ShieldCheck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  const featureList = [
    {
      icon: <Package className="w-10 h-10 text-primary" />,
      title: "Effortless Inventory Management",
      description: "Say goodbye to spreadsheets. Add products, track stock levels in real-time, and get automatic low-stock alerts so you never miss a sale.",
    },
    {
      icon: <BarChart className="w-10 h-10 text-primary" />,
      title: "Insightful Sales Reports",
      description: "Make data-driven decisions. Visualize your sales trends, identify best-selling products, and understand your revenue with easy-to-read charts and reports.",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Customer Tracking (Coming Soon)",
      description: "Build loyalty by understanding your customers. Keep a simple record of your regulars and their preferences to provide personalized service.",
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Fast and Simple Interface",
      description: "DukaSmart is designed for speed. Record sales and update inventory in seconds, even on a slow connection. No training required.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Secure & Reliable",
      description: "Your business data is safe with us. We use modern, secure cloud technology to ensure your information is protected and always available.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-primary" />,
      title: "Bilingual Support (English & Swahili)",
      description: "Use DukaSmart in the language you're most comfortable with. Switch between English and Swahili with a single click.",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <main>

        <motion.section
          className="py-20 md:py-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Features Built for Your Duka
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              DukaSmart is packed with powerful tools that are simple to use. Discover how we can help you streamline your operations and grow your business.
            </p>
          </div>
        </motion.section>

    
        <section className="py-20 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureList.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg bg-card shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-start gap-4">
                    {feature.icon}
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to take control of your inventory?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join hundreds of shop owners who are running their business smarter with DukaSmart.
            </p>
            <div className="mt-8">
              <Button href="/signup" size="lg">
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
