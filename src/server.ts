import express from "express";
import { getCustomers } from "../src/repositories/custom_repos";
import {
  rankCustomerByORders,
  rankProductsByCategory,
} from "../src/repositories/rank_repos";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// GET /customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/**
 * GET /rank/customers-orders
 * Returns customers ranked by total orders.
 * Test in Postman with GET http://localhost:3000/rank/customers-orders
 */
app.get("/rank/customers-orders", async (req, res) => {
  const result = await rankCustomerByORders();
  res.json(result);
});

/**
 * GET /rank/products-category
 * Returns products ranked within each category.
 * Test in Postman with GET http://localhost:3000/rank/products-category
 */
app.get("/rank/products-category", async (req, res) => {
  const result = await rankProductsByCategory();
  res.json(result);
});
