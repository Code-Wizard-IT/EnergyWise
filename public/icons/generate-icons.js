// Script per generare icone PNG - esegui nel browser console
// Oppure usa un tool online come realfavicongenerator.net

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateIcon(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Background con bordi arrotondati
  const radius = size * 0.25;
  ctx.fillStyle = '#1A1A2E';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fill();
  
  // Cerchio verde interno
  const padding = size * 0.08;
  const innerRadius = radius * 0.84;
  ctx.fillStyle = '#00A86B';
  ctx.beginPath();
  ctx.roundRect(padding, padding, size - padding * 2, size - padding * 2, innerRadius);
  ctx.fill();
  
  // Fulmine
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size * 0.016;
  ctx.lineJoin = 'round';
  
  const scale = size / 512;
  ctx.beginPath();
  ctx.moveTo(280 * scale, 120 * scale);
  ctx.lineTo(180 * scale, 280 * scale);
  ctx.lineTo(240 * scale, 280 * scale);
  ctx.lineTo(220 * scale, 392 * scale);
  ctx.lineTo(340 * scale, 220 * scale);
  ctx.lineTo(270 * scale, 220 * scale);
  ctx.lineTo(300 * scale, 120 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  return canvas.toDataURL('image/png');
}

// Genera e scarica tutte le icone
sizes.forEach(size => {
  const dataUrl = generateIcon(size);
  const link = document.createElement('a');
  link.download = `icon-${size}x${size}.png`;
  link.href = dataUrl;
  link.click();
});
