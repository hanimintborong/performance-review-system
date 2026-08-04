import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#F5F3FF" },
          100: { value: "#EDE9FE" },
          200: { value: "#DDD6FE" },
          300: { value: "#C4B5FD" },
          400: { value: "#A78BFA" },
          500: { value: "#7C5CFC" },
          600: { value: "#6D4EE8" },
          700: { value: "#5B3EC7" },
          800: { value: "#46309B" },
          900: { value: "#342274" },
          950: { value: "#211747" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
