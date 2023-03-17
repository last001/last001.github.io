import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api/dsauth": {
        target: "http://172.17.36.201:8001",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
      },
      "/api/dsmain": {
        //   target: "http://172.17.36.11:8002",          // 杰哥
        //   target: "http://172.17.36.201:8002",         // 公司
        // target: "http://172.17.36.20:8002",            // 严伟祥
        target: "http://172.17.36.12:8002",               // 谭胡昊
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
  plugins: [vue()],
});
