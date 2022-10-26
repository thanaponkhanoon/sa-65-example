import { CategoriesInterface } from "./Icategory";
import { UnitsInterface } from "./Iunit";
import { EmployeesInterface} from "./Iemployees"

export interface EquipmentInterface {
  ID?: number;
  Name?: string;
  Amount?: number;
  CategoryID?: number;
  Category?: CategoriesInterface;
  UnitID?: number;
  Unit?: UnitsInterface;
  Time: Date | null;
  EmployeeID?: number;
  Employee?: EmployeesInterface
}