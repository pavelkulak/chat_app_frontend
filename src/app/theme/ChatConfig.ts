import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const chatConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#E0FD531A" },
          100: { value: "#EFFFA3" },
          200: { value: "#E0FD53" },
          300: { value: "#C7ED0E" },
          400: { value: "#16A34A" },
          500: { value: "#c6f32e" },
          600: { value: "#a7d114" },
          700: { value: "#85a90f" },
          800: { value: "#5d7909" },
          900: { value: "#3a4c05" },
          950: { value: "#03190C" },
        },
        neutral: {
          50: { value: "#f2f5f2" },
          100: { value: "#e0e9e1" },
          200: { value: "#c7d6c8" },
          300: { value: "#9eb39f" },
          400: { value: "#708674" },
          500: { value: "#506157" },
          600: { value: "#3a463d" },
          700: { value: "#2a322b" },
          800: { value: "#161A0B" },
          900: { value: "#121712" },
          950: { value: "#323D12" },
        },
        grey: {
          50: { value: "#F7F7F7" },
          100: { value: "#C6C6C8" },
          150: { value: "#F4F4F5" },
          300: { value: "#A1A1AA" },
          400: { value: "#E4E4E7" },
          500: { value: "#52525B" },
          800: { value: "#27272A" },
        },
        blue: {
          600: { value: "#007AFF" },
        },
        success: {
          50: { value: "#eafff5" },
          100: { value: "#c9ffe8" },
          200: { value: "#92f7cf" },
          300: { value: "#5fe5b2" },
          400: { value: "#31d897" },
          500: { value: "#19cf85" },
          600: { value: "#14a96c" },
          700: { value: "#108455" },
          800: { value: "#0b5f3e" },
          900: { value: "#073b26" },
          950: { value: "#052818" },
        },
        white: { value: "#ffffff" },
        black: { value: "#000000" },
      },
    },
  },
});

export const chatSystem = createSystem(defaultConfig, chatConfig);
export default chatSystem;
