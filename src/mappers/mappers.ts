import {
  CustomerRow,
  ProductRow,
  OrderRow,
  OrderItemRow,
  UserEventRow,
} from "../db/db_type";
import {
  Customer,
  Product,
  Order,
  OrderItem,
  UserEvent,
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
