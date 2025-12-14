export interface CustomerRow {
  customer_id: number;
  name: string;
  signup_date: string;
  country: string;
}

export interface ProductRow {
  product_id: number;
  name: string;
  category: string;
  price: number;
}

export interface OrderRow {
  order_id: number;
  customer_id: number;
  order_date: string;
}

export interface OrderItemRow {
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface UserEventRow {
  event_id: number;
  customer_id: number;
  event_type: string;
  event_time: string;
}

// Customer rank by total orders
export interface CustomRankRow{
  customer_id: number;
  name: string;
  total_orders: number;
  rank_by_orders: number
}

// Product rank per customer
export interface ProductRankRow{
  category: string;
  product_id: number;
  product_name: string;
  total_sold: number;
  rank_in_cateogry: number
}