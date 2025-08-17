"use client";

import { InventoryTable } from "./components/inventory-table";
import { AddProductDialog } from "./components/add-product-dialog";
import type { Product } from "@/lib/inventory-data";
import { useDashboardState } from "../state-provider";


export default function InventoryPage() {
  const { products, onUpdateProducts, onRecordSale } = useDashboardState();
  
  const handleSave = (product: Product) => {
    const exists = products.find(p => p.id === product.id);
    if(exists) {
        onUpdateProducts(products.map(p => p.id === product.id ? product : p));
    } else {
        onUpdateProducts([...products, { ...product, id: (products.length + 1).toString() }]);
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Manage Inventory</h1>
          <p className="text-muted-foreground">
            Add, edit, and track your products.
          </p>
        </div>
        <AddProductDialog onSave={handleSave} />
      </div>
      <InventoryTable products={products} onUpdateProducts={onUpdateProducts} onRecordSale={onRecordSale} />
    </div>
  );
}
