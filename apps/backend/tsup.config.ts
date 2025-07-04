import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  external: ["pg", "events"],
  dts: true,
  clean: true,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".sql": "text",
    };
  },
});
