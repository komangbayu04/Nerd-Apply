import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // @imgly/background-removal loads WASM + ONNX model files dynamically;
    // exclude from Vite's pre-bundling so it works correctly at runtime.
    exclude: ['@imgly/background-removal'],
  },
})
