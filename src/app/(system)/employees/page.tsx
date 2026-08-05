import { EmployeesClient } from "@/app/(system)/employees/EmployeesClient";
import { getEmployees } from "@/data/queries";

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return <EmployeesClient employees={employees} />;
}
