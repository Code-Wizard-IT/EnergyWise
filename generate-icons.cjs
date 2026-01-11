const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'public', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background con bordi arrotondati (simula roundRect)
  const radius = size * 0.22;
  ctx.fillStyle = '#00A86B';
  
  // Draw rounded rectangle
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  
  // Fulmine
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size * 0.02;
  ctx.lineJoin = 'round';
  
  const scale = size / 512;
  const offsetX = size * 0.05;
  const offsetY = size * 0.05;
  
  ctx.beginPath();
  ctx.moveTo(290 * scale + offsetX, 100 * scale + offsetY);
  ctx.lineTo(170 * scale + offsetX, 280 * scale + offsetY);
  ctx.lineTo(240 * scale + offsetX, 280 * scale + offsetY);
  ctx.lineTo(215 * scale + offsetX, 410 * scale + offsetY);
  ctx.lineTo(355 * scale + offsetX, 210 * scale + offsetY);
  ctx.lineTo(275 * scale + offsetX, 210 * scale + offsetY);
  ctx.lineTo(310 * scale + offsetX, 100 * scale + offsetY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  return canvas;
}

// Generate all icons
sizes.forEach(size => {
  const canvas = generateIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(iconsDir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`Generated: icon-${size}x${size}.png`);
});

console.log('\nTutte le icone sono state generate!');
