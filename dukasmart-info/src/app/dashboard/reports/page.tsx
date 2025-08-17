"use client";

import { useEffect, useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useDashboardState } from "../state-provider";

const chartConfig: ChartConfig = {
  sales: {
    label: "Sales (KSh)",
    color: "hsl(var(--primary))",
  },
  quantity: {
    label: "Quantity",
    color: "hsl(var(--primary))",
  }
};

export default function ReportsPage() {
    const { products, sales } = useDashboardState();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const salesChartData = useMemo(() => {
        const monthlySales: { [key: string]: number } = {};
        sales.forEach(sale => {
            const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
            if (!monthlySales[month]) {
                monthlySales[month] = 0;
            }
            monthlySales[month] += sale.total;
        });

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        return monthOrder.map(month => ({
            date: month,
            sales: monthlySales[month] || 0
        })).filter(d => d.sales > 0);
        
    }, [sales]);

    const stockChartData = useMemo(() => {
        return products.map(product => ({
            name: product.name,
            quantity: product.quantity
        }));
    }, [products]);


    if (!isMounted) {
        return null;
    }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold font-headline">Reports</h1>
        <p className="text-muted-foreground">
          View sales, purchase, and stock level reports.
        </p>
      </div>
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
             <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <LineChart
                  data={salesChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" name="Sales" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Purchases</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-12">
              Purchase reporting is coming soon.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stock">
            <Card>
                <CardHeader>
                    <CardTitle>Current Stock Levels</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[350px] w-full">
                        <BarChart data={stockChartData} margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 80,
                          }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                            <YAxis />
                            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent/>}/>
                            <Bar dataKey="quantity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Quantity" />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
