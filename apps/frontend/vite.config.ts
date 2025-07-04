/// <reference types="vite/client" />
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({}) => {
  return {
    plugins: [
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    publicDir: "public",
    envDir: path.resolve(__dirname, "../../"),
    resolve: {
      alias: {
        "~": resolve(__dirname, "./src"),
      },
    },
  };
});
