import { brand } from "@/constants/colors";

export const clerkAppearance = {
  variables: {
    colorPrimary: brand[50],
    borderRadius: "10px",
  },
  elements: {
    card: { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
  },
};
