import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      __DEV_ADMIN_PASSWORD__: JSON.stringify(mode === 'development' ? env.ADMIN_PANEL_PASSWORD : null)
    }
  }
})
