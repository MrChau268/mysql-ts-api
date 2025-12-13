export interface Customer {
  customer_id: number;
  name: string;
  signup_date: Date;
  country: string;
}

export interface Product {
  product_id: number;
  name: string;
  category: string;
  price: number;
}

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: Date;
}

export interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface UserEvent {
  event_id: number;
  customer_id: number;
  event_type: string;
  event_time: Date;
}
