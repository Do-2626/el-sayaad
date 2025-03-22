export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  // يمكنك إضافة المزيد من الخصائص حسب الحاجة
}

export interface Order {
  id: string;
  products: Product[];
  status: string;
  // يمكنك إضافة المزيد من الخصائص حسب الحاجة
}
