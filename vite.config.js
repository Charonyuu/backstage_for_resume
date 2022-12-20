import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'; // make sure to import it
import babel from 'vite-plugin-babel';
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react(), svgr(),babel()],
});