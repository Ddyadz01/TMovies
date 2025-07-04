import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// vite.config.js
const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-react-compiler',
              ReactCompilerConfig,
            ],
          ],
        },
      }),
    ],
    // ...
  };
});
