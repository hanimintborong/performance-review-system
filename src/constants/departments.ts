import { FiBox, FiDollarSign, FiSettings, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons";

export const DEPARTMENTS = [
  "Finance",
  "People & Culture",
  "Engineering",
  "Product",
  "Revenue",
  "Marketing",
];

export const DEPARTMENT_ICONS: Record<string, IconType> = {
  Finance: FiDollarSign,
  "People & Culture": FiUsers,
  Engineering: FiSettings,
  Product: FiBox,
  Revenue: FiTrendingUp,
  Marketing: FiTarget,
};
