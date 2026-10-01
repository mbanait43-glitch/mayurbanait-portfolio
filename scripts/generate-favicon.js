const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPng(width, height, renderPixel) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = createChunk('IHDR', ihdrData);

  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = renderPixel(x, y, width, height);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

// Render clean, normal 32x32 Developer Code Favicon < / >
function renderCleanCodeIcon(x, y, w, h) {
  // Rounded squircle: distance from rounded rect (inset 2, corner radius 6)
  const left = 2, top = 2, right = 29, bottom = 29, r = 6;
  let inSquircle = false;
  let isBorder = false;

  if (x >= left && x <= right && y >= top && y <= bottom) {
    const dx = Math.max(left + r - x, 0, x - (right - r));
    const dy = Math.max(top + r - y, 0, y - (bottom - r));
    const dist = Math.hypot(dx, dy);
    if (dist <= r) {
      inSquircle = true;
      if (dist >= r - 1.2 || x === left || x === right || y === top || y === bottom) {
        isBorder = true;
      }
    }
  }

  if (!inSquircle) return [0, 0, 0, 0];

  // Center Slash /: from (19, 8) down to (12, 23)
  // Distance from point to line segment
  const x1 = 19, y1 = 8, x2 = 12, y2 = 23;
  const l2 = (x2 - x1)**2 + (y2 - y1)**2;
  const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / l2));
  const projX = x1 + t * (x2 - x1);
  const projY = y1 + t * (y2 - y1);
  const distSlash = Math.hypot(x - projX, y - projY);

  if (distSlash <= 1.25) {
    return [255, 255, 255, 255]; // Crisp white slash
  }

  // Left Bracket <: top segment (12, 10) to (7, 15.5), bottom segment (7, 15.5) to (12, 21)
  function distToSeg(px, py, ax, ay, bx, by) {
    const len2 = (bx - ax)**2 + (by - ay)**2;
    const s = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / len2));
    return Math.hypot(px - (ax + s * (bx - ax)), py - (ay + s * (by - ay)));
  }

  const distL1 = distToSeg(x, y, 12, 10, 7, 15.5);
  const distL2 = distToSeg(x, y, 7, 15.5, 12, 21);
  const distLeft = Math.min(distL1, distL2);

  if (distLeft <= 1.35) {
    return [56, 189, 248, 255]; // Sky Blue #38BDF8
  }

  // Right Bracket >: top segment (19, 10) to (24, 15.5), bottom segment (24, 15.5) to (19, 21)
  const distR1 = distToSeg(x, y, 19, 10, 24, 15.5);
  const distR2 = distToSeg(x, y, 24, 15.5, 19, 21);
  const distRight = Math.min(distR1, distR2);

  if (distRight <= 1.35) {
    return [56, 189, 248, 255]; // Sky Blue #38BDF8
  }

  if (isBorder) {
    return [56, 189, 248, 85]; // Subtle sky blue border
  }

  // Deep dark slate background #0F172A
  return [15, 23, 42, 255];
}

const png32 = createPng(32, 32, renderCleanCodeIcon);

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const dirEntries = [];
  for (const png of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(32, 0);
    entry.writeUInt8(32, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

const icoBuffer = createIco([png32]);
const targetPath = path.join(__dirname, '..', 'public', 'favicon.ico');
fs.writeFileSync(targetPath, icoBuffer);
console.log('Successfully wrote simple normal favicon.ico! Size:', icoBuffer.length, 'bytes');
