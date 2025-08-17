
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ResourcesPage() {
  const articles = [
    {
      title: "5 Tips for Effective Stock Management in Your Duka",
      description: "Learn the basics of inventory control to reduce waste and maximize profits.",
      image: "https://placehold.co/600x400.png",
      aiHint: "inventory management",
      link: "#",
    },
    {
      title: "How to Price Your Products for Better Sales",
      description: "A simple guide to pricing strategies that attract customers while protecting your margins.",
      image: "https://placehold.co/600x400.png",
      aiHint: "pricing strategy",
      link: "#",
    },
    {
      title: "Why Customer Service Matters for Small Shops",
      description: "Discover how great service can turn first-time visitors into loyal customers.",
      image: "https://placehold.co/600x400.png",
      aiHint: "customer service",
      link: "#",
    },
    {
      title: "Understanding Your Sales Data with DukaSmart Reports",
      description: "A walkthrough of how to use your dashboard reports to make smarter business decisions.",
      image: "https://placehold.co/600x400.png",
      aiHint: "business reports",
      link: "#",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <main className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Business Tips & Resources
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Guides and articles to help you grow your shop. We're invested in your success.
            </p>
          </motion.section>

          <section className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <CardHeader className="p-0">
                       <Image
                          src={article.image}
                          alt={article.title}
                          data-ai-hint={article.aiHint}
                          width={600}
                          height={400}
                          className="object-cover"
                        />
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
                      <CardDescription className="mt-2 text-muted-foreground flex-grow">
                        {article.description}
                      </CardDescription>
                      <Link href={article.link} className="mt-4 inline-flex items-center font-semibold text-primary">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
