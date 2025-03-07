import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const watchMode = process.argv.includes('--watch');

/** @type {esbuild.BuildOptions} */
const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  format: 'esm',
  minify: true,
  sourcemap: true,
  target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
  loader: {
    '.svg': 'text'
  },
};

if (watchMode) {
  const context = await esbuild.context(buildOptions);
  await context.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(buildOptions);
  console.log('Build completed.');
}
