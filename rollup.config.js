// import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json';

export default {
  input: 'src/index.ts',
  output: {
    format: 'esm',
    file: packageJson.main
  },
  plugins: [
    // resolve(),
    typescript()
  ]
};
