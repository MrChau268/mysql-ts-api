import { db, connectDb } from "../db/db";
import { CustomerRow } from "../db/db_type";
import { Customer } from "../db/domain_types";
import { mapCustomer } from "../mappers/mappers";
import { RowDataPacket } from "mysql2/promise";

export async function getCustomers(): Promise<Customer[]> {
  await connectDb();

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT customer_id, name, signup_date, country FROM customers"
  );

  await db.end();

  return (rows as CustomerRow[]).map(mapCustomer);
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  await connectDb();

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT customer_id, name, signup_date, country FROM customers WHERE customer_id = ?",
    [id]
  );

  await db.end();

  const customerRows = rows as CustomerRow[];
  if (customerRows.length === 0) return null;
  return mapCustomer(customerRows[0]);
}