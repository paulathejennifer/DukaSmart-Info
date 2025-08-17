
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });

    const form = e.target as HTMLFormElement;
    form.reset();
  };

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
              Get in Touch
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </motion.section>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="How can we help you?" required rows={5} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">Submit</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>


            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-muted-foreground">
                You can also reach us through the following channels. Our support team is available from 9am to 5pm EAT, Monday to Friday.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:support@dukasmart.com" className="text-muted-foreground hover:text-primary">
                      support@dukasmart.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+254 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-muted-foreground">
                      123 Innovation Drive, Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
