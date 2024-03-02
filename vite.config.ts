import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const isProdBuild = mode !== "example";
  const entry = isProdBuild
    ? path.resolve(__dirname, "index.ts")
    : path.resolve(__dirname, "src/main.tsx");

  const external = isProdBuild ? ["react", "react-dom"] : [];
  const globals = isProdBuild
    ? { react: "React", "react-dom": "ReactDOM" }
    : {};

  const baseConfig = {
    build: {
      lib: {
        entry,
        name: "react-custom-scroll",
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external,
        output: {
          globals,
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

  if (isProdBuild) {
    return baseConfig;
  }

  return {
    ...baseConfig,
    build: { ...baseConfig.build, outDir: "exampleDist" },
  };
});

// https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "index.ts"),
//       name: "react-custom-scroll",
//       fileName: (format) => `index.${format}.js`,
//     },
//     rollupOptions: {
//       external: ["react", "react-dom"],
//       output: {
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//       },
//     },
//     sourcemap: true,
//     emptyOutDir: true,
//   },
//   plugins: [react(), dts()],
//   server: {
//     port: 5174,
//   },
// });
