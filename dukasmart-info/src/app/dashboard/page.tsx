"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Landmark,
  Users,
  CreditCard,
  TriangleAlert,
  HelpCircle,
  Archive,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { useDashboardState } from "./state-provider";


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { products, sales } = useDashboardState();
  const { toast } = useToast();

  const handleTour = () => {
    toast({
      title: "Guided Tour Started",
      description: "Follow the highlights to learn about DukaSmart.",
    });
  };

  const { lowStockItemsCount, totalInventoryValue, totalRevenue } = useMemo(() => {
    const lowStockItemsCount = products.filter(p => p.quantity < 10).length;
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.quantity * p.price), 0);
    const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
    return { lowStockItemsCount, totalInventoryValue, totalRevenue };
  }, [products, sales]);


  const stats = [
    {
      title: "Total Revenue",
      amount: `KSh ${totalRevenue.toLocaleString()}`,
      icon: Landmark,
      change: "+20.1% from last month",
      tooltip: "Total revenue from all sales.",
    },
    {
      title: "Inventory Value",
      amount: `KSh ${totalInventoryValue.toLocaleString()}`,
      icon: Archive,
      change: "+2% from yesterday",
      tooltip: "Total value of all items in stock.",
    },
    {
      title: "New Customers",
      amount: "+573",
      icon: Users,
      change: "+201 this week",
      tooltip: "New customers who made their first purchase.",
    },
    {
      title: "Low Stock Items",
      amount: `${lowStockItemsCount} items`,
      icon: TriangleAlert,
      change: "2 more than yesterday",
      isAlert: true,
      tooltip: "Items that are running low on stock.",
    },
  ];

  const recentSales = useMemo(() => {
      return [...sales].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3);
  }, [sales]);


  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">Welcome Back</h1>
            <p className="text-muted-foreground">Here's a snapshot of your business today.</p>
          </div>
          <Button onClick={handleTour} variant="outline">
            <HelpCircle className="mr-2 h-4 w-4" /> Start Tour
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className={
                          stat.isAlert ? "text-destructive" : "text-primary"
                        }
                      >
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stat.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.amount}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                    <div className="flex items-center" key={sale.id}>
                        <p dangerouslySetInnerHTML={{ __html: `Sale of <strong>${sale.quantity}x ${sale.productName}</strong> recorded.`}} />
                        <Badge variant="secondary" className="ml-auto">
                            {formatDistanceToNow(sale.date, { addSuffix: true })}
                        </Badge>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
