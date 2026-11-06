import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconSvg = fs.readFileSync('public/icon.svg');
const maskableSvg = fs.readFileSync('public/icon-maskable.svg');

async function generate() {
  await sharp(iconSvg)
    .resize(192, 192)
    .png()
    .toFile('public/pwa-192x192.png');
  console.log('Generated public/pwa-192x192.png');

  await sharp(iconSvg)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-512x512.png');
  console.log('Generated public/pwa-512x512.png');

  await sharp(maskableSvg)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-maskable-512x512.png');
  console.log('Generated public/pwa-maskable-512x512.png');

  await sharp(iconSvg)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('Generated public/apple-touch-icon.png');

  await sharp(iconSvg)
    .resize(512, 512)
    .png()
    .toFile('public/icon.png');
  console.log('Generated public/icon.png');

  await sharp(iconSvg)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');
  console.log('Generated public/favicon-32x32.png');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
