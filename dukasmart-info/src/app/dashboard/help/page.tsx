"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I add a new product?",
      answer: "Navigate to the Inventory page and click the 'Add Product' button. A dialog will appear where you can enter the product details. If your category is not listed, select 'Other' and our AI can help you find a suitable one.",
    },
    {
      question: "How can I view my sales report?",
      answer: "Go to the Reports page. The 'Sales' tab is selected by default, showing you an overview of your sales performance over time.",
    },
    {
      question: "What does the 'Low Stock Items' card on the dashboard mean?",
      answer: "This card alerts you to products that have fallen below a certain quantity threshold (e.g., less than 10 units). This helps you know when to reorder.",
    },
    {
      question: "Can I use DukaSmart in Swahili?",
      answer: "No but the feature is coming soon",
    },
    {
      question: "How do I edit a product's details?",
      answer: "On the Inventory page, find the product you want to edit. Click the three-dots icon on the right side of its row and select 'Edit' from the menu.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold font-headline">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions here.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions (FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
