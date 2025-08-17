"use client";
import * as React from "react";
import { initialProducts, type Product } from "@/lib/inventory-data";
import { initialSales, type Sale } from "@/lib/sales-data";

interface DashboardState {
  products: Product[];
  sales: Sale[];
  onUpdateProducts: (updatedProducts: Product[]) => void;
  onRecordSale: (sale: Omit<Sale, "id" | "date">) => void;
  isClient: boolean; 
}

const DashboardContext = React.createContext<DashboardState | undefined>(undefined);

export function DashboardStateProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = React.useState<Product[]>(() => {
    if (typeof window === "undefined") {
      return initialProducts;
    }
    try {
      const storedProducts = localStorage.getItem("products");
      return storedProducts ? JSON.parse(storedProducts) : initialProducts;
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      return initialProducts;
    }
  });

  const [sales, setSales] = React.useState<Sale[]>(() => {
    if (typeof window === "undefined") {
      return initialSales;
    }
    try {
      const storedSales = localStorage.getItem("sales");
      const parsedSales = storedSales ? JSON.parse(storedSales) : initialSales;
      return parsedSales.map((sale: any) => ({ ...sale, date: new Date(sale.date) }));
    } catch (error) {
      console.error("Failed to parse sales from localStorage", error);
      return initialSales;
    }
  });

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Failed to save products to localStorage", error);
    }
  }, [products]);

  React.useEffect(() => {
    try {
      localStorage.setItem("sales", JSON.stringify(sales));
    } catch (error) {
      console.error("Failed to save sales to localStorage", error);
    }
  }, [sales]);

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const handleRecordSale = (sale: Omit<Sale, "id" | "date">) => {
    const soldProduct = products.find((p) => p.id === sale.productId);
    if (!soldProduct) return;
    const newSale: Sale = {
      ...sale,
      id: (sales.length + 1).toString(),
      date: new Date(),
    };
    const updatedProducts = products.map((p) =>
      p.id === sale.productId ? { ...p, quantity: p.quantity - sale.quantity } : p
    );
    setSales((prevSales) => [...prevSales, newSale]);
    setProducts(updatedProducts);
  };

  const value = {
    products,
    sales,
    onUpdateProducts: handleUpdateProducts,
    onRecordSale: handleRecordSale,
    isClient, // provide isClient to consumers
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboardState() {
  const context = React.useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboardState must be used within a DashboardStateProvider");
  }
  return context;
}
