
export type Sale = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
};

export const initialSales: Sale[] = [];
