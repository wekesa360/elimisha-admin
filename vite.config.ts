import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Optimize output
    minify: 'terser',
    terserOptions: {
      // compress: {
      //   drop_console: true, // Remove console.logs in production
      // },
    },
    // Output directory
    outDir: 'dist',
    // Clean the output directory before build
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Chunk large dependencies
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'clerk-vendor': ['@clerk/clerk-react'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
  },
  server: {
    port: 3000,
    // Add CORS headers for development
    cors: true,
    // Configure proxy for API requests in development
    // proxy: {
    //   '/api': {
    //     target: process.env.VITE_API_URL || 'http://localhost:8788',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  preview: {
    port: 3000,
  },
  // Define env variables
  define: {
    'process.env.VITE_CLERK_PUBLISHABLE_KEY': JSON.stringify(
      process.env.VITE_CLERK_PUBLISHABLE_KEY
    ),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});