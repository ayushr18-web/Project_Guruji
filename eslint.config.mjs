import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // or "off"
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/rules-of-hooks": "off", // Not recommended
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off", // Not recommended
      "@typescript-eslint/no-empty-object-types": "off", // Not recommended
      "react/jsx-key": "off", // Not recommended
      "react/no-unknown-property": "off", // Not recommended
      "react/jsx-no-undef": "off", // Not recommended
      "@typescript-eslint/no-empty-object-type": "off", // Not recommended
    },
  },
];

export default eslintConfig;
