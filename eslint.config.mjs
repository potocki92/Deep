import eslint from "@eslint/js";
import { builtinModules } from "node:module";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

const typescriptFiles = ["**/*.{ts,tsx}"];
const nextFiles = ["apps/{web,admin}/**/*.{ts,tsx}"];
const restrictedCoreImports = [
  ...builtinModules.flatMap((moduleName) => [moduleName, `node:${moduleName}`]),
  "react",
  "next",
  "phaser",
  "prisma",
  "@prisma/client",
  "redis",
  "ioredis",
  "bullmq",
];

export default tseslint.config(
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/coverage/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/next-env.d.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((configuration) => ({
    ...configuration,
    files: typescriptFiles,
  })),
  {
    files: typescriptFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["apps/{api,worker}/**/*.ts", "packages/{database,testing}/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["packages/{game-renderer,ui}/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: nextFiles,
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  ...nextVitals.map((configuration) => ({
    ...configuration,
    files: nextFiles,
  })),
  ...nextTypeScript.map((configuration) => ({
    ...configuration,
    files: nextFiles,
  })),
  {
    files: ["packages/game-core/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: restrictedCoreImports,
          patterns: [
            "react/*",
            "next/*",
            "@nestjs/*",
            "@prisma/*",
            "@supabase/*",
            "phaser/*",
            "redis/*",
            "ioredis/*",
            "bullmq/*",
          ],
        },
      ],
    },
  },
  {
    files: ["*.{js,mjs}", "**/*.config.{js,mjs}"],
    languageOptions: { globals: globals.node },
  },
  prettier,
);
