#!/usr/bin/env node
// gen-rasters.js
// Generates Logo@2x.png and Logo@3x.png from Logo.png using sharp

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const repoRoot = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const assetsDir = path.join(repoRoot, 'src', 'assets', 'images');
const inputPath = path.join(assetsDir, 'Logo.png');
const out2 = path.join(assetsDir, 'Logo@2x.png');
const out3 = path.join(assetsDir, 'Logo@3x.png');

async function run() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Input file not found:', inputPath);
      process.exit(2);
    }

    const img = sharp(inputPath);
    const meta = await img.metadata();
    const width = meta.width || 117;
    const height = meta.height || 117;

    console.log(`Source size: ${width}x${height}`);

    console.log('Generating 2x...');
    await img.resize({ width: Math.round(width * 2) }).toFile(out2);
    console.log('Wrote', out2);

    // Recreate from original again (sharp instance mutated), so re-read
    await sharp(inputPath).resize({ width: Math.round(width * 3) }).toFile(out3);
    console.log('Wrote', out3);

    console.log('Done.');
  } catch (err) {
    console.error('Error generating rasters:', err);
    process.exit(1);
  }
}

run();
