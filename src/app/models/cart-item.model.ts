export interface CartItem {
  id: number;
  name: string;
  price: number;
  unitPrice?: number;
  quantity: number;
  image: string;
  key?: string;
  uid?: string;
  observation?: string;
}
