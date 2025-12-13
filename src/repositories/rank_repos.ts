import { db, connectDb } from "../db/db";
import { RowDataPacket } from "mysql2/promise";
import { CustomRankRow, ProductRankRow } from "../db/db_type";

/**
 * Rank customers by total number of orders.
 * LEFT JOIN ensures customers with 0 orders are included.
 * RANK() gives same rank for ties; gaps exist after ties.
 */

export async function rankCustomerByORders(): Promise<CustomRankRow[]> {
  await connectDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `
            SELECT 
                 c.customer_id,
                 c.name,
                 COUNT(o.order_id) AS total_orders,
                 RANK() OVER (ORDER BY COUNT(o.order_id) DESC) AS rank_by_orders
                 FROM customers c
                 LEFT JOIN orders o ON c.customer_id = o.customer_id
                 GROUP BY c.customer_id, c.name
                 ORDER BY rank_by_orders

            `
  );
  return rows as CustomRankRow[];
}

export async function rankProductsByCategory(): Promise<ProductRankRow[]> {
  await connectDb();
  const [rows] = await db.query<RowDataPacket[]>(
    `
            SELECT 
                p.category,
                p.product_id,
                p.name AS product_name,
                SUM(oi.quantity) AS total_sold,
                RANK() OVER (
                    PARTITION BY p.category 
                    ORDER BY SUM(oi.quantity) DESC
                ) AS rank_in_category
            FROM products p
            JOIN order_items oi 
                ON p.product_id = oi.product_id
            GROUP BY 
                p.category, 
                p.product_id, 
                p.name
            ORDER BY 
                p.category, 
                rank_in_category;

            `
  );
  return rows as ProductRankRow[];
}
