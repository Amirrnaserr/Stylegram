import { resolveFontFamily } from './fonts.js';

function hexToRgba(hex = '#ffffff', alpha = 1) {
  const clean = (hex || '#ffffff').replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean.padEnd(6, '0');
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function seededRand(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function angleGradient(ctx, w, h, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const cx = w / 2;
  const cy = h / 2;
  const len = Math.hypot(w, h) / 2;
  return ctx.createLinearGradient(
    cx - Math.cos(rad) * len,
    cy - Math.sin(rad) * len,
    cx + Math.cos(rad) * len,
    cy + Math.sin(rad) * len
  );
}

function drawRoundedRectPath(ctx, x, y, w, h, r) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function drawBackground(ctx, w, h, bgId, cfg = {}) {
  if (bgId === 'transparent' || bgId === 'none') return;

  ctx.save();
  const rand = seededRand(1337);

  switch (bgId) {
    case 'solid': {
      ctx.globalAlpha = (cfg.opacity ?? 100) / 100;
      ctx.fillStyle = cfg.color || '#011728';
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'gradient': {
      ctx.globalAlpha = (cfg.opacity ?? 100) / 100;
      const g = angleGradient(ctx, w, h, cfg.angle ?? 135);
      g.addColorStop(0, cfg.color1 || '#011728');
      g.addColorStop(0.5, cfg.color2 || '#0B82F6');
      g.addColorStop(1, cfg.color3 || '#8B35FF');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'neonGradient': {
      ctx.fillStyle = cfg.baseDark || '#011728';
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = (cfg.intensity ?? 80) / 100;
      const g = angleGradient(ctx, w, h, cfg.angle ?? 125);
      g.addColorStop(0, hexToRgba(cfg.color1 || '#00D9FF', 0.85));
      g.addColorStop(0.5, 'rgba(1, 23, 40, 0.2)');
      g.addColorStop(1, hexToRgba(cfg.color2 || '#8B35FF', 0.85));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'liquidGlass': {
      ctx.fillStyle = '#011728';
      ctx.fillRect(0, 0, w, h);
      const op = (cfg.opacity ?? 55) / 100;
      const glow = (cfg.glow ?? 65) / 100;
      const g1 = ctx.createRadialGradient(w * 0.25, h * 0.25, 10, w * 0.25, h * 0.25, w * 0.65);
      g1.addColorStop(0, hexToRgba(cfg.glassColor || '#0B82F6', op));
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.78, h * 0.75, 10, w * 0.78, h * 0.75, w * 0.58);
      g2.addColorStop(0, hexToRgba('#8B35FF', glow * 0.75));
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      const sheen = ctx.createLinearGradient(0, 0, w, h);
      const hi = (cfg.highlight ?? 75) / 100;
      sheen.addColorStop(0, `rgba(255,255,255,${0.22 * hi})`);
      sheen.addColorStop(0.45, `rgba(255,255,255,${0.04 * hi})`);
      sheen.addColorStop(1, `rgba(0,217,255,${0.14 * hi})`);
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'smoke': {
      ctx.fillStyle = cfg.bgBase || '#020B16';
      ctx.fillRect(0, 0, w, h);
      const count = cfg.density ?? 6;
      const alpha = ((cfg.intensity ?? 70) / 100) * 0.42;
      for (let i = 0; i < count; i++) {
        const cx = rand() * w;
        const cy = rand() * h;
        const rad = (0.3 + rand() * 0.45) * Math.max(w, h);
        const sg = ctx.createRadialGradient(cx, cy, rad * 0.05, cx, cy, rad);
        sg.addColorStop(0, hexToRgba(cfg.smokeColor || '#00D9FF', alpha));
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, w, h);
      }
      break;
    }
    case 'galaxy': {
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      bg.addColorStop(0, hexToRgba(cfg.galaxyColor || '#8B35FF', (cfg.glowIntensity ?? 75) / 100));
      bg.addColorStop(0.5, hexToRgba(cfg.accentColor || '#00D9FF', 0.25));
      bg.addColorStop(1, '#010814');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      const stars = cfg.starDensity ?? 95;
      for (let i = 0; i < stars; i++) {
        const sx = rand() * w;
        const sy = rand() * h;
        const sr = 0.6 + rand() * 2.1;
        ctx.fillStyle = `rgba(255,255,255,${0.35 + rand() * 0.65})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'abstract': {
      ctx.fillStyle = '#011728';
      ctx.fillRect(0, 0, w, h);
      const colors = [cfg.color1 || '#0B82F6', cfg.color2 || '#8B35FF', cfg.color3 || '#00D9FF'];
      const n = cfg.shapes ?? 7;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = hexToRgba(colors[i % 3], 0.35);
        ctx.beginPath();
        ctx.arc(rand() * w, rand() * h, (0.14 + rand() * 0.28) * Math.min(w, h), 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'carbonFiber': {
      ctx.fillStyle = cfg.baseColor || '#0A111A';
      ctx.fillRect(0, 0, w, h);
      const s = cfg.cellSize ?? 16;
      const c = ((cfg.weaveContrast ?? 55) / 100) * 0.22;
      for (let y = 0; y < h; y += s) {
        for (let x = 0; x < w; x += s) {
          ctx.fillStyle = ((x / s + y / s) % 2 === 0) ? `rgba(255,255,255,${c})` : `rgba(0,0,0,${c * 1.4})`;
          ctx.fillRect(x, y, s - 1, s - 1);
        }
      }
      break;
    }
    case 'metallic': {
      const g = angleGradient(ctx, w, h, cfg.angle ?? 120);
      const shine = (cfg.shine ?? 75) / 100;
      g.addColorStop(0, cfg.metalColor || '#334155');
      g.addColorStop(0.35, `rgba(255,255,255,${0.55 * shine})`);
      g.addColorStop(0.55, cfg.metalColor || '#334155');
      g.addColorStop(0.8, `rgba(226,232,240,${0.45 * shine})`);
      g.addColorStop(1, '#0F172A');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'holographic': {
      const h0 = cfg.hueShift ?? 30;
      const g = ctx.createLinearGradient(0, 0, w, h);
      const sat = cfg.intensity ?? 85;
      g.addColorStop(0, `hsl(${(h0) % 360}, ${sat}%, 60%)`);
      g.addColorStop(0.25, `hsl(${(h0 + 70) % 360}, ${sat}%, 65%)`);
      g.addColorStop(0.5, `hsl(${(h0 + 150) % 360}, ${sat}%, 62%)`);
      g.addColorStop(0.75, `hsl(${(h0 + 220) % 360}, ${sat}%, 68%)`);
      g.addColorStop(1, `hsl(${(h0 + 300) % 360}, ${sat}%, 58%)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'marble': {
      ctx.fillStyle = cfg.baseColor || '#0F172A';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = hexToRgba(cfg.veinColor || '#38BDF8', ((cfg.veinIntensity ?? 60) / 100) * 0.45);
      for (let i = 0; i < 14; i++) {
        ctx.lineWidth = 0.8 + rand() * 3.2;
        ctx.beginPath();
        let px = rand() * w;
        let py = 0;
        ctx.moveTo(px, py);
        for (let step = 1; step <= 8; step++) {
          px += (rand() - 0.5) * (w * 0.25);
          py = (step / 8) * h;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      break;
    }
    case 'noise': {
      ctx.fillStyle = cfg.baseColor || '#011728';
      ctx.fillRect(0, 0, w, h);
      const amt = (cfg.noiseAmount ?? 35) * 45;
      const alpha = ((cfg.grainContrast ?? 50) / 100) * 0.22;
      for (let i = 0; i < amt; i++) {
        ctx.fillStyle = rand() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
        ctx.fillRect(rand() * w, rand() * h, 2, 2);
      }
      break;
    }
    case 'geometric': {
      ctx.fillStyle = cfg.bgColor || '#011728';
      ctx.fillRect(0, 0, w, h);
      const gs = cfg.gridSize ?? 42;
      ctx.strokeStyle = hexToRgba(cfg.lineColor || '#00D9FF', (cfg.lineOpacity ?? 35) / 100);
      ctx.lineWidth = 1.2;
      for (let x = 0; x <= w; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      break;
    }
    case 'meshGradient': {
      ctx.fillStyle = cfg.c4 || '#011728';
      ctx.fillRect(0, 0, w, h);
      const soft = (cfg.softness ?? 85) / 100;
      const pts = [
        [w * 0.18, h * 0.22, cfg.c1 || '#0B82F6'],
        [w * 0.84, h * 0.26, cfg.c2 || '#8B35FF'],
        [w * 0.52, h * 0.82, cfg.c3 || '#00D9FF']
      ];
      for (const [px, py, col] of pts) {
        const mg = ctx.createRadialGradient(px, py, 10, px, py, Math.max(w, h) * (0.45 + soft * 0.35));
        mg.addColorStop(0, hexToRgba(col, 0.85));
        mg.addColorStop(1, 'transparent');
        ctx.fillStyle = mg;
        ctx.fillRect(0, 0, w, h);
      }
      break;
    }
    case 'aurora': {
      ctx.fillStyle = cfg.skyColor || '#011728';
      ctx.fillRect(0, 0, w, h);
      const glow = (cfg.glow ?? 80) / 100;
      const ribbons = [
        [0.25, cfg.ribbon1 || '#00D9FF'],
        [0.5, cfg.ribbon2 || '#8B35FF'],
        [0.72, cfg.ribbon3 || '#10B981']
      ];
      for (const [yf, col] of ribbons) {
        const ag = ctx.createLinearGradient(0, h * (yf - 0.25), w, h * (yf + 0.25));
        ag.addColorStop(0, 'transparent');
        ag.addColorStop(0.5, hexToRgba(col, 0.55 * glow));
        ag.addColorStop(1, 'transparent');
        ctx.fillStyle = ag;
        ctx.fillRect(0, 0, w, h);
      }
      break;
    }
    case 'fire': {
      const fg = ctx.createLinearGradient(0, h, 0, 0);
      fg.addColorStop(0, cfg.emberColor || '#FACC15');
      fg.addColorStop(0.45, cfg.flameColor || '#F97316');
      fg.addColorStop(1, cfg.darkBase || '#180402');
      ctx.globalAlpha = (cfg.intensity ?? 85) / 100;
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'ice': {
      const ig = ctx.createLinearGradient(0, 0, w, h);
      ig.addColorStop(0, cfg.deepBlue || '#082F49');
      ig.addColorStop(1, '#0284C7');
      ctx.fillStyle = ig;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = hexToRgba(cfg.frostColor || '#BAE6FD', ((cfg.crystalOpacity ?? 60) / 100) * 0.45);
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 24; i++) {
        const x = rand() * w;
        const y = rand() * h;
        const len = 16 + rand() * 36;
        ctx.beginPath();
        ctx.moveTo(x - len, y);
        ctx.lineTo(x + len, y);
        ctx.moveTo(x, y - len);
        ctx.lineTo(x, y + len);
        ctx.stroke();
      }
      break;
    }
    case 'paper': {
      ctx.fillStyle = cfg.paperColor || '#EFEFEF';
      ctx.fillRect(0, 0, w, h);
      const fo = ((cfg.fiberOpacity ?? 35) / 100) * 0.16;
      for (let i = 0; i < 1200; i++) {
        ctx.fillStyle = rand() > 0.5 ? `rgba(0,0,0,${fo})` : `rgba(255,255,255,${fo})`;
        ctx.fillRect(rand() * w, rand() * h, 1.5, 1.5);
      }
      const vig = (cfg.vignette ?? 30) / 100;
      if (vig > 0) {
        const vg = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75);
        vg.addColorStop(0, 'transparent');
        vg.addColorStop(1, `rgba(0,0,0,${vig * 0.45})`);
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, w, h);
      }
      break;
    }
    case 'colorSplash': {
      ctx.fillStyle = cfg.bgColor || '#011728';
      ctx.fillRect(0, 0, w, h);
      const count = cfg.splashCount ?? 14;
      for (let i = 0; i < count; i++) {
        const col = i % 2 === 0 ? (cfg.splash1 || '#00D9FF') : (cfg.splash2 || '#8B35FF');
        ctx.fillStyle = hexToRgba(col, 0.45);
        ctx.beginPath();
        ctx.arc(rand() * w, rand() * h, 18 + rand() * (Math.min(w, h) * 0.18), 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'darkLuxury': {
      ctx.fillStyle = cfg.obsidian || '#011728';
      ctx.fillRect(0, 0, w, h);
      const sheen = (cfg.sheen ?? 55) / 100;
      const g = ctx.createRadialGradient(w * 0.5, h * 0.3, 10, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      g.addColorStop(0, hexToRgba(cfg.goldAccent || '#D97706', 0.28 * sheen));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = hexToRgba(cfg.goldAccent || '#D97706', 0.65 * sheen);
      ctx.lineWidth = Math.max(2, w * 0.006);
      ctx.strokeRect(w * 0.04, h * 0.04, w * 0.92, h * 0.92);
      break;
    }
    case 'cyberpunk': {
      ctx.fillStyle = cfg.nightColor || '#050816';
      ctx.fillRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, hexToRgba(cfg.neonPink || '#FF007F', 0.35));
      g.addColorStop(1, hexToRgba(cfg.neonCyan || '#00D9FF', 0.35));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = hexToRgba(cfg.neonCyan || '#00D9FF', (cfg.gridOpacity ?? 45) / 100);
      ctx.lineWidth = 1;
      for (let y = h * 0.55; y <= h; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      break;
    }
    case 'bokeh': {
      ctx.fillStyle = cfg.baseColor || '#011728';
      ctx.fillRect(0, 0, w, h);
      const count = cfg.orbCount ?? 18;
      for (let i = 0; i < count; i++) {
        const ox = rand() * w;
        const oy = rand() * h;
        const or = 16 + rand() * (Math.min(w, h) * 0.14);
        const col = i % 2 === 0 ? (cfg.light1 || '#00D9FF') : (cfg.light2 || '#8B35FF');
        const bg = ctx.createRadialGradient(ox, oy, or * 0.1, ox, oy, or);
        bg.addColorStop(0, hexToRgba(col, 0.35));
        bg.addColorStop(0.85, hexToRgba(col, 0.15));
        bg.addColorStop(1, 'transparent');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(ox, oy, or, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'checkerboard': {
      const s = cfg.tileSize ?? 36;
      for (let y = 0; y < h; y += s) {
        for (let x = 0; x < w; x += s) {
          const even = (Math.floor(x / s) + Math.floor(y / s)) % 2 === 0;
          ctx.fillStyle = even ? (cfg.color1 || '#011728') : (cfg.color2 || '#0B2D48');
          ctx.fillRect(x, y, s, s);
        }
      }
      break;
    }
  }
  ctx.restore();
}

export function drawTextBackgroundBox(ctx, bx, by, bw, bh, bgId, cfg = {}, boxOpts = {}) {
  if (!bgId || bgId === 'none') return;

  const radius = boxOpts.radius ?? 22;
  const boxAlpha = (boxOpts.opacity ?? 92) / 100;

  ctx.save();
  ctx.globalAlpha = boxAlpha;

  if (bgId === 'pillGlow') {
    ctx.shadowColor = cfg.borderColor || '#00D9FF';
    ctx.shadowBlur = cfg.glowBlur ?? 22;
    drawRoundedRectPath(ctx, bx, by, bw, bh, radius);
    ctx.fillStyle = cfg.fillColor || '#011728';
    ctx.fill();
    ctx.lineWidth = cfg.borderWidth ?? 3;
    ctx.strokeStyle = cfg.borderColor || '#00D9FF';
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (bgId === 'frostedBadge') {
    drawRoundedRectPath(ctx, bx, by, bw, bh, radius);
    ctx.fillStyle = hexToRgba(cfg.tintColor || '#0B82F6', (cfg.opacity ?? 55) / 100);
    ctx.fill();
    const sheen = ctx.createLinearGradient(bx, by, bx, by + bh);
    const hi = (cfg.highlight ?? 70) / 100;
    sheen.addColorStop(0, `rgba(255,255,255,${0.32 * hi})`);
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.03)');
    sheen.addColorStop(1, 'rgba(0,217,255,0.1)');
    ctx.fillStyle = sheen;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = hexToRgba(cfg.edgeColor || '#FFFFFF', 0.45);
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (bgId === 'ribbon') {
    const skewPx = Math.tan(((cfg.skew ?? 12) * Math.PI) / 180) * (bh * 0.5);
    ctx.beginPath();
    ctx.moveTo(bx + skewPx, by);
    ctx.lineTo(bx + bw + skewPx, by);
    ctx.lineTo(bx + bw - skewPx, by + bh);
    ctx.lineTo(bx - skewPx, by + bh);
    ctx.closePath();
    const rg = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
    rg.addColorStop(0, cfg.color1 || '#0B82F6');
    rg.addColorStop(1, cfg.color2 || '#8B35FF');
    ctx.fillStyle = rg;
    ctx.fill();
    ctx.restore();
    return;
  }

  if (bgId === 'highlightMarker') {
    const cx = bx + bw / 2;
    const cy = by + bh / 2;
    ctx.translate(cx, cy);
    ctx.rotate(((cfg.tilt ?? -2) * Math.PI) / 180);
    drawRoundedRectPath(ctx, -bw / 2, -bh / 2, bw, bh, Math.min(radius, 14));
    ctx.fillStyle = hexToRgba(cfg.markerColor || '#8B35FF', (cfg.opacity ?? 85) / 100);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (bgId === 'tape') {
    const cx = bx + bw / 2;
    const cy = by + bh / 2;
    ctx.translate(cx, cy);
    ctx.rotate(((cfg.angle ?? -2) * Math.PI) / 180);
    ctx.fillStyle = hexToRgba(cfg.tapeColor || '#FDE047', (cfg.opacity ?? 82) / 100);
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
    ctx.restore();
    return;
  }

  if (bgId === 'brackets') {
    drawRoundedRectPath(ctx, bx, by, bw, bh, Math.min(radius, 12));
    ctx.fillStyle = hexToRgba(cfg.fillColor || '#011728', 0.72);
    ctx.fill();
    const len = Math.min(cfg.cornerLen ?? 26, bw * 0.35, bh * 0.45);
    ctx.strokeStyle = cfg.cornerColor || '#00D9FF';
    ctx.lineWidth = cfg.thickness ?? 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    // Top-left
    ctx.moveTo(bx, by + len); ctx.lineTo(bx, by); ctx.lineTo(bx + len, by);
    // Top-right
    ctx.moveTo(bx + bw - len, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + len);
    // Bottom-right
    ctx.moveTo(bx + bw, by + bh - len); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw - len, by + bh);
    // Bottom-left
    ctx.moveTo(bx + len, by + bh); ctx.lineTo(bx, by + bh); ctx.lineTo(bx, by + bh - len);
    ctx.stroke();
    ctx.restore();
    return;
  }

  // All standard 23 BG_STYLES clipped neatly inside the dynamic text box!
  drawRoundedRectPath(ctx, bx, by, bw, bh, radius);
  ctx.clip();
  ctx.translate(bx, by);
  drawBackground(ctx, bw, bh, bgId, cfg);
  ctx.restore();
}

export function drawStyledText(ctx, lines, centerX, startY, lineHeight, fontSize, styleId, cfg = {}) {
  lines.forEach((line, idx) => {
    const y = startY + idx * lineHeight;
    ctx.save();

    switch (styleId) {
      case 'minimal': {
        ctx.globalAlpha = (cfg.opacity ?? 100) / 100;
        ctx.fillStyle = cfg.textColor || '#EFEFEF';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'neon': {
        const glow = cfg.glowColor || '#00D9FF';
        ctx.shadowColor = hexToRgba(glow, (cfg.glowIntensity ?? 85) / 100);
        ctx.shadowBlur = cfg.glowRadius ?? 28;
        if ((cfg.strokeWidth ?? 2) > 0) {
          ctx.lineWidth = cfg.strokeWidth;
          ctx.strokeStyle = glow;
          ctx.strokeText(line, centerX, y);
        }
        ctx.fillStyle = cfg.textColor || '#FFFFFF';
        ctx.fillText(line, centerX, y);
        ctx.fillText(line, centerX, y);
        break;
      }
      case '3d': {
        const depth = cfg.depth ?? 10;
        const rad = ((cfg.angle ?? 135) * Math.PI) / 180;
        const dx = Math.cos(rad);
        const dy = Math.sin(rad);
        ctx.fillStyle = cfg.depthColor || '#0B82F6';
        for (let i = depth; i >= 1; i--) {
          ctx.fillText(line, centerX + dx * i, y + dy * i);
        }
        ctx.fillStyle = cfg.faceColor || '#EFEFEF';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'chrome': {
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, '#FFFFFF');
        g.addColorStop(0.45, cfg.metalTint || '#B8D4F5');
        g.addColorStop(0.52, '#1E293B');
        g.addColorStop(0.85, '#E2E8F0');
        g.addColorStop(1, '#FFFFFF');
        ctx.shadowColor = `rgba(255,255,255,${((cfg.shine ?? 70) / 100) * 0.5})`;
        ctx.shadowBlur = 12;
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'gold': {
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, '#FEF08A');
        g.addColorStop(0.5, cfg.goldTone || '#FBBF24');
        g.addColorStop(1, '#B45309');
        ctx.shadowColor = `rgba(0,0,0,${(cfg.shadowStrength ?? 60) / 100})`;
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 4;
        if ((cfg.bevel ?? 4) > 0) {
          ctx.lineWidth = cfg.bevel;
          ctx.strokeStyle = '#78350F';
          ctx.strokeText(line, centerX, y);
        }
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'silver': {
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, '#FFFFFF');
        g.addColorStop(0.5, cfg.silverTint || '#CBD5E1');
        g.addColorStop(1, '#475569');
        ctx.shadowColor = `rgba(0,0,0,${(cfg.shadowStrength ?? 50) / 100})`;
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'glass': {
        ctx.shadowColor = `rgba(255,255,255,${((cfg.highlight ?? 80) / 100) * 0.55})`;
        ctx.shadowBlur = cfg.blur ?? 10;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255,255,255,0.65)';
        ctx.strokeText(line, centerX, y);
        ctx.fillStyle = hexToRgba(cfg.glassTint || '#FFFFFF', (cfg.opacity ?? 45) / 100);
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'gradient': {
        const g = ctx.createLinearGradient(centerX - 180, y, centerX + 180, y);
        g.addColorStop(0, cfg.color1 || '#00D9FF');
        g.addColorStop(1, cfg.color2 || '#8B35FF');
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
        ctx.shadowBlur = cfg.shadowBlur ?? 12;
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'shadow': {
        ctx.shadowColor = cfg.shadowColor || '#000000';
        ctx.shadowBlur = cfg.shadowBlur ?? 22;
        ctx.shadowOffsetX = cfg.offsetX ?? 0;
        ctx.shadowOffsetY = cfg.offsetY ?? 10;
        ctx.fillStyle = cfg.textColor || '#EFEFEF';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'outline': {
        ctx.shadowColor = cfg.strokeColor || '#00D9FF';
        ctx.shadowBlur = cfg.glow ?? 8;
        ctx.lineWidth = cfg.strokeWidth ?? 3;
        ctx.strokeStyle = cfg.strokeColor || '#00D9FF';
        ctx.lineJoin = 'round';
        ctx.strokeText(line, centerX, y);
        if ((cfg.fillOpacity ?? 0) > 0) {
          ctx.fillStyle = hexToRgba(cfg.strokeColor || '#00D9FF', cfg.fillOpacity / 100);
          ctx.fillText(line, centerX, y);
        }
        break;
      }
      case 'glow': {
        ctx.shadowColor = hexToRgba(cfg.glowColor || '#8B35FF', (cfg.intensity ?? 90) / 100);
        ctx.shadowBlur = cfg.glowRadius ?? 34;
        ctx.fillStyle = cfg.textColor || '#FFFFFF';
        ctx.fillText(line, centerX, y);
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'retro': {
        const off = cfg.offset ?? 6;
        ctx.fillStyle = cfg.shadowColor || '#7C2D12';
        ctx.fillText(line, centerX + off, y + off);
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, cfg.topColor || '#FDE047');
        g.addColorStop(1, cfg.bottomColor || '#F97316');
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'glitch': {
        const s = cfg.shift ?? 5;
        ctx.globalAlpha = (cfg.intensity ?? 65) / 100;
        ctx.fillStyle = cfg.redChannel || '#FF0055';
        ctx.fillText(line, centerX - s, y - 1);
        ctx.fillStyle = cfg.cyanChannel || '#00D9FF';
        ctx.fillText(line, centerX + s, y + 1);
        ctx.globalAlpha = 1;
        ctx.fillStyle = cfg.textColor || '#FFFFFF';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'graffiti': {
        const d = cfg.dropDepth ?? 7;
        ctx.fillStyle = cfg.outlineColor || '#011728';
        ctx.fillText(line, centerX + d, y + d);
        ctx.lineWidth = cfg.strokeWidth ?? 7;
        ctx.strokeStyle = cfg.outlineColor || '#011728';
        ctx.lineJoin = 'round';
        ctx.strokeText(line, centerX, y);
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, cfg.fillColor || '#22D3EE');
        g.addColorStop(1, cfg.fillColor2 || '#A855F7');
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'cyberpunk': {
        ctx.shadowColor = cfg.neonEdge || '#FF007F';
        ctx.shadowBlur = cfg.glow ?? 24;
        ctx.fillStyle = cfg.accentColor || '#00D9FF';
        ctx.fillText(line, centerX + 3, y + 3);
        ctx.fillStyle = cfg.faceColor || '#FCEE0A';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'metallic': {
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, cfg.highlightColor || '#F8FAFC');
        g.addColorStop(0.5, cfg.baseColor || '#64748B');
        g.addColorStop(1, '#0F172A');
        if ((cfg.bevel ?? 3) > 0) {
          ctx.lineWidth = cfg.bevel;
          ctx.strokeStyle = 'rgba(255,255,255,0.35)';
          ctx.strokeText(line, centerX, y);
        }
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'holographic': {
        const sh = cfg.shift ?? 45;
        const sat = cfg.saturation ?? 90;
        const g = ctx.createLinearGradient(centerX - 180, y - 30, centerX + 180, y + 30);
        g.addColorStop(0, `hsl(${sh % 360}, ${sat}%, 72%)`);
        g.addColorStop(0.5, `hsl(${(sh + 120) % 360}, ${sat}%, 75%)`);
        g.addColorStop(1, `hsl(${(sh + 240) % 360}, ${sat}%, 72%)`);
        ctx.shadowColor = `hsl(${(sh + 140) % 360}, ${sat}%, 65%)`;
        ctx.shadowBlur = cfg.glow ?? 18;
        if ((cfg.outline ?? 2) > 0) {
          ctx.lineWidth = cfg.outline;
          ctx.strokeStyle = 'rgba(255,255,255,0.65)';
          ctx.strokeText(line, centerX, y);
        }
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'vintage': {
        const d = cfg.depth ?? 5;
        ctx.fillStyle = cfg.shadowColor || '#5C4033';
        for (let i = d; i >= 1; i--) {
          ctx.fillText(line, centerX + i, y + i);
        }
        ctx.fillStyle = cfg.creamColor || '#F5E6C8';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'fire': {
        ctx.shadowColor = cfg.edgeColor || '#DC2626';
        ctx.shadowBlur = cfg.flameGlow ?? 28;
        const g = ctx.createLinearGradient(0, y - fontSize * 0.45, 0, y + fontSize * 0.45);
        g.addColorStop(0, cfg.coreColor || '#FEF08A');
        g.addColorStop(0.55, cfg.midColor || '#F97316');
        g.addColorStop(1, cfg.edgeColor || '#DC2626');
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'ice': {
        ctx.shadowColor = cfg.frostColor || '#38BDF8';
        ctx.shadowBlur = cfg.frostGlow ?? 22;
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, cfg.iceCore || '#F0F9FF');
        g.addColorStop(0.6, cfg.frostColor || '#38BDF8');
        g.addColorStop(1, cfg.deepIce || '#0369A1');
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'cartoon': {
        const p = cfg.popShadow ?? 7;
        ctx.fillStyle = cfg.borderColor || '#000000';
        ctx.fillText(line, centerX + p, y + p);
        ctx.lineWidth = cfg.borderWidth ?? 6;
        ctx.strokeStyle = cfg.borderColor || '#000000';
        ctx.lineJoin = 'round';
        ctx.strokeText(line, centerX, y);
        ctx.fillStyle = cfg.fillColor || '#FACC15';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'bold': {
        const off = cfg.shadowOffset ?? 5;
        if (off > 0) {
          ctx.fillStyle = cfg.shadowColor || '#0B82F6';
          ctx.fillText(line, centerX + off, y + off);
        }
        if ((cfg.strokeWidth ?? 2) > 0) {
          ctx.lineWidth = cfg.strokeWidth;
          ctx.strokeStyle = cfg.textColor || '#FFFFFF';
          ctx.strokeText(line, centerX, y);
        }
        ctx.fillStyle = cfg.textColor || '#FFFFFF';
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'luxury': {
        ctx.shadowColor = 'rgba(0,0,0,0.75)';
        ctx.shadowBlur = cfg.shadowBlur ?? 24;
        ctx.shadowOffsetY = 5;
        const g = ctx.createLinearGradient(0, y - fontSize * 0.5, 0, y + fontSize * 0.5);
        g.addColorStop(0, cfg.accentColor || '#FEF3C7');
        g.addColorStop(0.5, cfg.goldColor || '#EAB308');
        g.addColorStop(1, '#92400E');
        ctx.fillStyle = g;
        ctx.fillText(line, centerX, y);
        break;
      }
      case 'doubleStroke': {
        ctx.lineJoin = 'round';
        ctx.lineWidth = cfg.outerWidth ?? 11;
        ctx.strokeStyle = cfg.outerStroke || '#00D9FF';
        ctx.strokeText(line, centerX, y);
        ctx.lineWidth = cfg.innerWidth ?? 5;
        ctx.strokeStyle = cfg.innerStroke || '#011728';
        ctx.strokeText(line, centerX, y);
        ctx.fillStyle = cfg.fillColor || '#FFFFFF';
        ctx.fillText(line, centerX, y);
        break;
      }
    }
    ctx.restore();
  });
}

export function renderComposition(canvas, state, scaleMultiplier = 1) {
  const ctx = canvas.getContext('2d');
  const s = state.settings;
  const w = Math.max(200, Number(s.width) || 1080);
  const h = Math.max(200, Number(s.height) || 1080);

  canvas.width = Math.round(w * scaleMultiplier);
  canvas.height = Math.round(h * scaleMultiplier);

  ctx.setTransform(scaleMultiplier, 0, 0, scaleMultiplier, 0, 0);
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = (s.globalOpacity ?? 100) / 100;

  if ((s.borderRadius ?? 0) > 0) {
    drawRoundedRectPath(ctx, 0, 0, w, h, s.borderRadius);
    ctx.clip();
  }

  // 1. Independent Canvas Background Layer
  const bgCfg = state.bgStyleConfigs[state.activeBgStyle] || {};
  drawBackground(ctx, w, h, state.activeBgStyle, bgCfg);

  // 2. Overall Frame Border
  if ((s.borderWidth ?? 0) > 0) {
    ctx.save();
    ctx.strokeStyle = s.borderColor || '#00D9FF';
    ctx.lineWidth = s.borderWidth * 2;
    if ((s.borderRadius ?? 0) > 0) {
      drawRoundedRectPath(ctx, 0, 0, w, h, s.borderRadius);
      ctx.stroke();
    } else {
      ctx.strokeRect(0, 0, w, h);
    }
    ctx.restore();
  }

  // 3. Measure Text Bounding Box for Dynamic Text Background + Text
  const fontFamily = resolveFontFamily(state.font.id, state.customFonts);
  const fontSize = state.font.size || 68;
  const weight = state.font.weight || '700';
  const lineHeight = fontSize * (state.text.lineHeight || 1.45);
  const lines = (state.text.content || '').split('\n');

  ctx.save();
  ctx.font = `${weight} ${fontSize}px "${fontFamily}", "Vazirmatn", sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.direction = 'rtl';

  const pad = s.padding ?? 48;
  const edgeMargin = s.edgeMargin ?? 24;
  const safePad = pad + edgeMargin;

  let textX = w / 2 + (s.offsetX ?? 0);
  ctx.textAlign = state.text.align || 'center';
  if (state.text.align === 'right') textX = w - safePad + (s.offsetX ?? 0);
  if (state.text.align === 'left') textX = safePad + (s.offsetX ?? 0);

  const totalTextH = lines.length * lineHeight;
  let startY = h / 2 - totalTextH / 2 + lineHeight / 2;
  if (s.vAlign === 'top') startY = safePad + lineHeight / 2;
  if (s.vAlign === 'bottom') startY = h - safePad - totalTextH + lineHeight / 2;
  startY += (s.offsetY ?? 0);

  // Draw Dynamic Text Background (auto-sizes with text!)
  const maxLineW = Math.max(40, ...lines.map(l => ctx.measureText(l || ' ').width));
  if (state.activeTextBgStyle && state.activeTextBgStyle !== 'none') {
    const tb = state.textBgBox || { padX: 28, padY: 16, radius: 20, opacity: 92 };
    const bw = maxLineW + tb.padX * 2;
    const bh = totalTextH + tb.padY * 2;
    let bx = textX - bw / 2;
    if (state.text.align === 'right') bx = textX - maxLineW - tb.padX;
    if (state.text.align === 'left') bx = textX - tb.padX;
    const by = startY - lineHeight / 2 - tb.padY;
    const tbCfg = state.textBgConfigs[state.activeTextBgStyle] || {};
    drawTextBackgroundBox(ctx, bx, by, bw, bh, state.activeTextBgStyle, tbCfg, tb);
  }

  if ((s.globalShadow ?? 0) > 0) {
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = s.globalShadow;
    ctx.shadowOffsetY = Math.round(s.globalShadow * 0.25);
  }

  const textCfg = state.textStyleConfigs[state.activeTextStyle] || {};
  drawStyledText(ctx, lines, textX, startY, lineHeight, fontSize, state.activeTextStyle, textCfg);

  ctx.restore();
  ctx.restore();
}

export function renderTextThumb(canvas, styleObj) {
  const ctx = canvas.getContext('2d');
  const w = 160;
  const h = 76;
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#041A2C';
  ctx.fillRect(0, 0, w, h);
  ctx.font = '800 28px "Vazirmatn", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.direction = 'rtl';
  drawStyledText(ctx, ['متن'], w / 2, h / 2 + 2, 34, 28, styleObj.id, styleObj.defaults);
}

export function renderBgThumb(canvas, bgObj) {
  const ctx = canvas.getContext('2d');
  const w = 160;
  const h = 76;
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  if (bgObj.id === 'transparent') {
    for (let y = 0; y < h; y += 12) {
      for (let x = 0; x < w; x += 12) {
        ctx.fillStyle = ((x / 12 + y / 12) % 2 === 0) ? '#132A3E' : '#091B2B';
        ctx.fillRect(x, y, 12, 12);
      }
    }
    return;
  }
  drawBackground(ctx, w, h, bgObj.id, bgObj.defaults);
}

export function renderTextBgThumb(canvas, bgObj) {
  const ctx = canvas.getContext('2d');
  const w = 160;
  const h = 76;
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#041A2C';
  ctx.fillRect(0, 0, w, h);
  if (bgObj.id === 'none') {
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(18, 16, w - 36, h - 32);
    return;
  }
  drawTextBackgroundBox(ctx, 18, 14, w - 36, h - 28, bgObj.id, bgObj.defaults, { radius: 14, opacity: 95 });
}
