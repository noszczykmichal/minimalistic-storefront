import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,           
    environment: 'jsdom',    
    setupFiles: './src/setupTests.js', 
    css: true,  
    alias: [
      { find: /^.+\.css$/, replacement: 'identity-obj-proxy' },
      { find: /^.+\.scss$/, replacement: 'identity-obj-proxy' },
    ],            
  },
}));