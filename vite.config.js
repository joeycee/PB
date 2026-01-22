import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3023,
    allowedHosts: ["performancebuilding.co.nz", "www.performancebuilding.co.nz"],
    proxy: {
      "/api": {
        target: "https://api.performancebuilding.co.nz",
        changeOrigin: true,
        secure: true,

        // ✅ Key fix: stop sending localhost origin to the API
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.removeHeader("origin");
          });
        },
      },
    },
  },
});
