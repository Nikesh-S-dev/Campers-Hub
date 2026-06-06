#!/usr/bin/env node
// Generates an SVG traced version of `src/assets/images/Logo.png` using sharp + potrace
// Usage: npm run gen:svg (from the frontend folder)

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import potracePkg from 'potrace';

const potrace = potracePkg && potracePkg.trace ? potracePkg : potracePkg;

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const assetsDir = path.join(repoRoot, 'src', 'assets', 'images');
const inputPath = path.join(assetsDir, 'Logo.png');
const outputPath = path.join(assetsDir, 'Logo.svg');

async function run() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Input file not found:', inputPath);
      process.exit(2);
    }

    console.log('Reading', inputPath);
    const buffer = await sharp(inputPath)
      // ensure we have an 8-bit PNG buffer suitable for tracing
      .png()
      .toBuffer();

    console.log('Tracing to SVG (this may take a second)...');

    potrace.trace(buffer, { color: 'black', background: 'transparent' }, (err, svg) => {
      if (err) {
        console.error('Error during potrace:', err);
        process.exit(3);
      }

      fs.writeFileSync(outputPath, svg, 'utf8');
      console.log('Wrote SVG to', outputPath);
    });
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
}

run();
