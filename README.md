MySQL + TypeScript API

Description:

This project is a TypeScript-based REST API built on Node.js and MySQL, designed for advanced analytics using SQL ranking functions like RANK() and PARTITION BY. It provides endpoints to rank customers, products, and user events, enabling easy reporting and insights on e-commerce-style data.

Features:

TypeScript + MySQL2 for fully typed database interactions.

Advanced SQL Queries using RANK(), DENSE_RANK(), and ROW_NUMBER().

REST API endpoints with Express for easy integration and testing.

Repository Pattern for structured, maintainable code.

Postman-ready endpoints to test ranking queries.

Supports multiple ranking scenarios:

Customers by total orders

Products ranked within each category by quantity sold

User events ranked per customer

Customers ranked by total revenue

Environment configuration via .env for database credentials.

Connection pooling for efficient database queries.

Tech Stack:

Node.js & Express

TypeScript

MySQL 8+ (compatible with MySQL 12 features)

mysql2/promise for async database operations

Why use it:

This project is ideal for developers building analytics dashboards, reporting tools, or e-commerce backends that require advanced ranking and aggregation directly in SQL while leveraging TypeScript type safety.

Getting Started:

Clone the repository:

git clone https://github.com/<your-username>/mysql-ts-rank-api.git
cd mysql-ts-rank-api


Install dependencies:

npm install


Create a .env file with your database credentials:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pets


Run the server:

npx ts-node src/server.ts


Test endpoints using Postman:

GET /rank/customers-orders → Customers ranked by orders

GET /rank/products-category → Products ranked by category

GET /rank/user-events → User events ranked per customer

GET /rank/customers-revenue → Customers ranked by revenue
