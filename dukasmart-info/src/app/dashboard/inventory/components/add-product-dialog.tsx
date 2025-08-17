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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import type { Product } from "@/lib/inventory-data";

interface AddProductDialogProps {
  product?: Product;
  onSave?: (product: Product) => void;
  children?: React.ReactNode;
}

export function AddProductDialog({ product, onSave, children }: AddProductDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(product?.name || "");
  const [category, setCategory] = React.useState(product?.category || "");
  const [quantity, setQuantity] = React.useState(product?.quantity || 0);
  const [price, setPrice] = React.useState(product?.price || 0);

  const isEditMode = !!product;

  const handleSubmit = () => {
    if (onSave) {
        onSave({ id: product?.id || Date.now().toString(), name, category, quantity, price });
    }
    setOpen(false);
  };
  
  React.useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setQuantity(product.quantity);
      setPrice(product.price);
    }
  }, [product]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <span className="w-full" onClick={() => setOpen(true)}>{children}</span>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Make changes to your product here. Click save when you're done."
              : "Add a new product to your inventory. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Spreads">Spreads</SelectItem>
                <SelectItem value="Bakery">Bakery</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Grains">Grains</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{isEditMode ? "Save Changes" : "Save Product"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
