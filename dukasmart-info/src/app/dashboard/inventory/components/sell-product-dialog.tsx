"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/lib/inventory-data";

interface SellProductDialogProps {
  product: Product;
  onRecordSale: (sale: { productId: string; productName: string, quantity: number; price: number, total: number }) => void;
  children: React.ReactNode;
}

export function SellProductDialog({ product, onRecordSale, children }: SellProductDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  const handleSell = () => {
    if (quantity > 0 && quantity <= product.quantity) {
      onRecordSale({
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        total: product.price * quantity,
      });
      setOpen(false);
      setQuantity(1);
    } else {

    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full" onClick={() => setOpen(true)}>{children}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sell Product: {product.name}</DialogTitle>
          <DialogDescription>
            Enter the quantity you are selling. The inventory will be updated automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
              max={product.quantity}
              min={1}
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total Price</Label>
                <div className="col-span-3 font-bold">
                    KSh {(product.price * quantity).toFixed(2)}
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSell} disabled={quantity <= 0 || quantity > product.quantity}>Record Sale</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
