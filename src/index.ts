import { getCustomers } from "repositories/custom_repos";

async function main() {
  const customers = await getCustomers();
  console.log(customers);
}

main().catch(console.error);
