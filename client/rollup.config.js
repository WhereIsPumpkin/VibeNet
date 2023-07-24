
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';

export default {
  input: 'src/App.tsx', 
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    image()
  ]
};