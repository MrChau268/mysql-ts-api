import {
  CustomerRow,
  ProductRow,
  OrderRow,
  OrderItemRow,
  UserEventRow,
  CustomerRevenueRankDb
} from "../db/db_type";
import {
  Customer,
  Product,
  Order,
  OrderItem,
  UserEvent,
  CustomerRevenueRank
} from "../db/domain_types";
export function mapCustomer(row: CustomerRow): Customer {
  return { ...row, signup_date: new Date(row.signup_date) };
}

export function mapProduct(row: ProductRow): Product {
  return row;
}

export function mapOrder(row: OrderRow): Order {
  return { ...row, order_date: new Date(row.order_date) };
}

export function mapOrderItem(row: OrderItemRow): OrderItem {
  return row;
}

export function mapUserEvent(row: UserEventRow): UserEvent {
  return { ...row, event_time: new Date(row.event_time) };
}

export function mapCustomerRevenueRank(
  row: CustomerRevenueRankDb
): CustomerRevenueRank {
  return {
    customerId: row.customer_id,
    customerName: row.customer_name,
    country: row.country,
    totalRevenue: row.total_revenue,
    revenueRank: row.revenue_rank_in_country,
  };