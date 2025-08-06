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
    ".css": "text" // Load CSS as text so its compatible with older Node.js versions
  },
  esbuildOptions(options) {
    // Ensure React is treated as an external dependency
    options.external = [...(options.external || []), "react", "react-dom"];
    // Remove unused imports to reduce bundle size
    options.treeShaking = true;
    // Enable minification for production builds
    options.minify = true;
    // Set the target to modern browsers
    options.target = "es2020";
  }
});
