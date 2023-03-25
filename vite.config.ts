/// <reference types="vitest" />
import { defineConfig } from "vite"
import { VitePluginNode } from "vite-plugin-node"
import { resolve } from "path"

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    ...VitePluginNode({
      adapter: "fastify",
      appPath: "./src/server.ts",
      exportName: "viteNodeApp"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  test: { globals: true, includeSource: ["src/**/*.ts"] },
  define: {
    "import.meta.vitest": "undefined"
  }
})
