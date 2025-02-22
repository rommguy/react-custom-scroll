import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const isProdBuild = mode !== "example";

  if (!isProdBuild) {
    return {
      plugins: [react()],
      build: { outDir: "exampleDist" },
      base: "react-custom-scroll/exampleDist",
    };
  }

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "index.ts"),
        name: "react-custom-scroll",
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJsxRuntime",
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
    plugins: [react(), dts({ insertTypesEntry: true })],
    server: {
      port: 5174,
    },
  };
});
