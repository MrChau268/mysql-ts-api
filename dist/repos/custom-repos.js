"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
const db_1 = require("db/db");
const mappers_1 = require("mappers/mappers");
async function getCustomers() {
    await (0, db_1.connectDb)();
    const [rows] = await db_1.db.query("SELECT customer_id, name, signup_date, country FROM customers");
    await db_1.db.end();
    return rows.map(mappers_1.mapCustomer);
}
async function getCustomerById(id) {
    await (0, db_1.connectDb)();
    const [rows] = await db_1.db.query("SELECT customer_id, name, signup_date, country FROM customers WHERE customer_id = ?", [id]);
    await db_1.db.end();
    const customerRows = rows;
    if (customerRows.length === 0)
        return null;
    return (0, mappers_1.mapCustomer)(customerRows[0]);
}
