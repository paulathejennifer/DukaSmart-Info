
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";

export default function AboutPage() {
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
              Our Mission: Empowering Local Shops
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              We believe in the power of small businesses. DukaSmart was born from a desire to provide local shop owners with the simple, modern tools they need to succeed in a competitive market.
            </p>
          </motion.section>


          <motion.section
            className="mt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://placehold.co/1200x500.png"
              alt="A bustling local market"
              data-ai-hint="local market africa"
              width={1200}
              height={500}
              className="rounded-lg object-cover mx-auto"
            />
          </motion.section>


          <section className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                DukaSmart started with a simple observation: while large retail chains have access to sophisticated inventory and sales technology, the small "duka" owner—the backbone of local economies across Africa—is often left with a pen and paper. This manual process is time-consuming, prone to errors, and makes it difficult to track business health.
              </p>
              <p>
                We knew there had to be a better way. Our team, composed of developers and entrepreneurs with deep roots in local communities, set out to build a solution that was:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong className="text-primary">Simple to Use:</strong> So intuitive that anyone can start using it in minutes, no training required.</li>
                <li><strong className="text-primary">Affordable:</strong> Priced fairly to be accessible to even the smallest businesses.</li>
                <li><strong className="text-primary">Powerful:</strong> Providing valuable insights to help owners make smarter decisions, reduce waste, and increase profits.</li>
              </ul>
              <p>
                Today, DukaSmart is more than just an app. It's a partner for growth, dedicated to helping local entrepreneurs thrive.
              </p>
            </div>
          </section>


          <section className="mt-20 text-center">
            <Gem className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Join the DukaSmart Community</h2>
            <p className="mt-2 text-muted-foreground">
              Take the first step towards a more organized and profitable business.
            </p>
            <div className="mt-6">
              <Button size="lg">
                <Link href="/signup">Get Started Now</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
