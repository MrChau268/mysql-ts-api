"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_repos_1 = require("repos/custom-repos");
async function main() {
    const customers = await (0, custom_repos_1.getCustomers)();
    console.log(customers);
}
main().catch(console.error);
