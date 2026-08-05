import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { brand, error, grey, info, orange, success, warning } from "@/constants/colors";

const toTokens = (scale: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(scale).map(([key, value]) => [key, { value }]),
  );

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: toTokens(brand),
        grey: toTokens(grey),
        orange: toTokens(orange),
        success: toTokens(success),
        warning: toTokens(warning),
        error: toTokens(error),
        info: toTokens(info),
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
