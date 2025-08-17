
export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
};

export const initialProducts: Product[] = [
  { id: "1", name: "Sunlight Soap", category: "Cleaning", quantity: 120, price: 50 },
  { id: "2", name: "Blueband 500g", category: "Spreads", quantity: 75, price: 250 },
  { id: "3", name: "Broadways Bread", category: "Bakery", quantity: 50, price: 65 },
  { id: "4", name: "KCC Milk 500ml", category: "Dairy", quantity: 90, price: 60 },
  { id: "5", name: "Jogoo Maize Flour 2kg", category: "Grains", quantity: 40, price: 200 },
  { id: "6", name: "Coca-Cola 1L", category: "Beverages", quantity: 200, price: 100 },
  { id: "7", name: "KDF", category: "Snacks", quantity: 5, price: 30 },
];
