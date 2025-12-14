import { db, connectDb } from "../db/db";
import { RowDataPacket } from "mysql2/promise";
import {CustomerRevenueRank} from "../db/domain_types"
import { CustomRankRow, ProductRankRow, CustomerRevenueRankDb } from "../db/db_type";
import { mapCustomerRevenueRank } from "../mappers/mappers";

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

/*
  Repository query:
  - Ranks products by total quantity sold
  - Ranking is reset per category using PARTITION BY
*/

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

/*
  Repository function:
  - Calculates total revenue per customer
  - Ranks customers by revenue within each country
  - Uses window function RANK()
*/

export async function getCustomerRevenueRank(): Promise<CustomerRevenueRank[]> {
  await connectDb();
  const [rows] = await db.query<CustomerRevenueRankDb[] & RowDataPacket[]>(
    `
      WITH customer_revenue AS (
        SELECT
          c.customer_id,
          c.name AS customer_name,
          c.country,
          SUM(p.price * oi.quantity) AS total_revenue
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        GROUP BY c.customer_id, c.name, c.country
      )
      SELECT
        customer_id,
        customer_name,
        country,
        total_revenue,
        RANK() OVER (
          PARTITION BY country
          ORDER BY total_revenue DESC
        ) AS revenue_rank_in_country
      FROM customer_revenue;
    `
  );

  return rows.map(mapCustomerRevenueRank);
}
