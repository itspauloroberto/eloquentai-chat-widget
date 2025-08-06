import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "es2020",
  dts: true,
  minify: true,
  sourcemap: false,
  clean: true,
  outDir: "dist",
  skipNodeModulesBundle: true,
  external: ["react", "react-dom"],
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".mjs"
    };
  },
  loader: {
    ".css": "text"
  }
});
