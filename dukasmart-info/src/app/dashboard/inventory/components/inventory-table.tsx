"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShoppingCart } from "lucide-react";
import { AddProductDialog } from "./add-product-dialog";
import type { Product } from "@/lib/inventory-data";
import { SellProductDialog } from "./sell-product-dialog";

interface InventoryTableProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onRecordSale: (sale: any) => void;
}

export function InventoryTable({ products, onUpdateProducts, onRecordSale }: InventoryTableProps) {
  const handleDelete = (productId: string) => {
    onUpdateProducts(products.filter((p) => p.id !== productId));
  };
  
  const handleSave = (product: Product) => {
    const exists = products.find(p => p.id === product.id);
    if(exists) {
        onUpdateProducts(products.map(p => p.id === product.id ? product : p));
    } else {
        onUpdateProducts([...products, { ...product, id: (products.length + 1).toString() }]);
    }
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price (KSh)</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{product.category}</Badge>
              </TableCell>
              <TableCell className={`text-right ${product.quantity < 10 ? 'text-destructive' : ''}`}>
                {product.quantity}
              </TableCell>
              <TableCell className="text-right">{product.price.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <SellProductDialog product={product} onRecordSale={onRecordSale}>
                        <div className="w-full text-left px-2 py-1.5 text-sm cursor-pointer hover:bg-muted rounded-sm flex items-center">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Sell
                        </div>
                    </SellProductDialog>
                    <DropdownMenuSeparator />
                    <AddProductDialog product={product} onSave={handleSave}>
                      <div className="w-full text-left px-2 py-1.5 text-sm cursor-pointer hover:bg-muted rounded-sm">Edit</div>
                    </AddProductDialog>
                    <DropdownMenuItem
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
