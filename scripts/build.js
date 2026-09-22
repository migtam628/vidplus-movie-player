#!/usr/bin/env node
/**
 * Build script using esbuild.
 * Produces ESM + CJS for the main entry and each adapter.
 * Also generates .d.ts via tsc.
 */

const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'dist');

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}

fs.mkdirSync(outDir, { recursive: true });

const shared = {
  bundle: true,
  sourcemap: true,
  target: ['es2020'],
  external: ['react', 'react-dom', 'vue'],
  logLevel: 'info',
};

const entries = [
  { entry: 'src/index.ts', name: 'index' },
  { entry: 'src/react.tsx', name: 'react' },
  { entry: 'src/vue.ts', name: 'vue' },
  { entry: 'src/vanilla.ts', name: 'vanilla' },
];

async function build() {
  console.log('Generating .d.ts files...');

  try {
    execSync('npx tsc --emitDeclarationOnly --declaration --outDir dist', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
  } catch (e) {
    console.warn(
      'tsc declaration generation failed (types may be incomplete). Continuing...'
    );
  }

  for (const { entry, name } of entries) {
    console.log(`Building ${name}...`);

    await esbuild.build({
      ...shared,
      entryPoints: [entry],
      outfile: path.join(outDir, `${name}.mjs`),
      format: 'esm',
    });

    await esbuild.build({
      ...shared,
      entryPoints: [entry],
      outfile: path.join(outDir, `${name}.cjs`),
      format: 'cjs',
    });
  }

  await esbuild.build({
    ...shared,
    entryPoints: ['src/vanilla.ts'],
    outfile: path.join(outDir, 'vanilla.browser.js'),
    format: 'iife',
    globalName: 'VidUpMoviePlayer',
    external: [],
  });

  console.log('Build complete → dist/');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
