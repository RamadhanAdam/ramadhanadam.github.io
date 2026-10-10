import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // one copy of React for the app and for React Three Fiber
  resolve: { dedupe: ["react", "react-dom", "three"] },
  optimizeDeps: { include: ["react", "react-dom", "@react-three/fiber", "three", "gsap", "lenis", "framer-motion"] },
});
