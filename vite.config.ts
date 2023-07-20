import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { esbuildDecorators } from 'esbuild-decorators'

export default defineConfig({
  plugins: [tsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildDecorators()],
    },
  },
})
