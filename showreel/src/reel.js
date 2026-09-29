// Shashank Jain — 15s motion showreel. Every frame is a pure function of time t.
const W = 1920, H = 1080, CX = W / 2, CY = H / 2, FPS = 60, DUR = 15;
const C = {
  bg: '#0e2940', ink: '#e6eef5', dim: '#8fa9bf', faint: '#244a6b', line: '#2b5377',
  ind: '#3f8fd6', indL: '#8fd0ff', vio: '#74d6a1', cy: '#f0bd5e', card: '#113150',
};
const SANS = 'Archivo', MONO = 'Menlo, "SF Mono", monospace';
const HITS = [1.5, 3.5, 6.0, 9.0, 11.5, 13.25];
const CHAPTERS = [
  [0, '00 — BOOT'], [1.5, '01 — IDENTITY'], [3.5, '02 — SYSTEMS'], [6.0, '03 — IMPACT'],
  [9.0, '04 — STACK'], [11.5, '05 — SELECTED WORK'], [13.25, '06 — CONTACT'],
];

// ---------- math ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const TAU = Math.PI * 2;
const E = {
  outExpo: x => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: x => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: x => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2),
  outCubic: x => 1 - Math.pow(1 - x, 3),
  inCubic: x => x * x * x,
  inOutCubic: x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outQuart: x => 1 - Math.pow(1 - x, 4),
  inQuart: x => x * x * x * x,
  outBack: x => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
};
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function noise1(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u) * 2 - 1; }
function impulse(t, k = 9) { let v = 0; for (const h of HITS) if (t >= h) v += Math.exp(-(t - h) * k); return v; }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

// ---------- text ----------
const mcache = new Map();
function setFont(ctx, w, size, fam = SANS, ls = 0, st = 'normal') { ctx.font = `${w} ${size}px ${fam}`; ctx.letterSpacing = ls + 'px'; ctx.fontStretch = st; }
function mw(ctx, s) {
  const k = ctx.font + '|' + ctx.letterSpacing + '|' + ctx.fontStretch + '|' + s;
  let v = mcache.get(k);
  if (v === undefined) { v = ctx.measureText(s).width; mcache.set(k, v); }
  return v;
}
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>_';
function scramble(s, p, t, seed = 0) {
  let o = '';
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === ' ') { o += ' '; continue; }
    const lp = (p - (i / n) * 0.7) / 0.3;
    if (lp >= 1) o += c;
    else if (lp > 0) o += GLYPHS[Math.floor(hash(i * 7.31 + seed + Math.floor(t * 30) * 1.37) * GLYPHS.length)];
    else o += ' ';
  }
  return o;
}
// Per-character masked rise. o: {t,start,stagger,dur,dist,align,out,outStagger,outDur,outDir,mode,clipTop,clipBot,order,ease}
function riseText(ctx, s, x, y, o) {
  const n = s.length, total = mw(ctx, s);
  const x0 = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
  const ease = o.ease || E.outExpo, dist = o.dist ?? 300;
  ctx.save();
  if (o.clipTop !== undefined) { ctx.beginPath(); ctx.rect(x0 - 300, y - o.clipTop, total + 600, o.clipTop + o.clipBot); ctx.clip(); }
  for (let i = 0; i < n; i++) {
    const ch = s[i];
    if (ch === ' ') continue;
    const ord = o.order === 'center' ? Math.abs(i - (n - 1) / 2) : o.order === 'rtl' ? n - 1 - i : i;
    const st = o.start + ord * (o.stagger ?? 0.03);
    const pin = ease(prog(o.t, st, st + (o.dur ?? 0.7)));
    if (pin <= 0) continue;
    let pout = 0;
    if (o.out !== undefined) { const so = o.out + ord * (o.outStagger ?? 0.02); pout = E.inExpo(prog(o.t, so, so + (o.outDur ?? 0.4))); }
    if (pout >= 1) continue;
    const dy = (1 - pin) * dist * (o.dir ?? 1) - pout * dist * (o.outDir ?? 1);
    const cx = x0 + mw(ctx, s.slice(0, i));
    if (o.mode === 'stroke') ctx.strokeText(ch, cx, y + dy); else ctx.fillText(ch, cx, y + dy);
  }
  ctx.restore();
}

// ---------- shared assets ----------
let gridCanvas = null;
function buildAssets() {
  gridCanvas = document.createElement('canvas');
  gridCanvas.width = W + 120; gridCanvas.height = H + 120;
  const g = gridCanvas.getContext('2d');
  for (let v = 0; v <= Math.max(gridCanvas.width, gridCanvas.height); v += 15) {
    const major = v % 60 === 0;
    g.fillStyle = major ? 'rgba(143,208,255,0.16)' : 'rgba(143,208,255,0.05)';
    if (v <= gridCanvas.width) g.fillRect(v, 0, 1, gridCanvas.height);
    if (v <= gridCanvas.height) g.fillRect(0, v, gridCanvas.width, 1);
  }
}
const PARTS = Array.from({ length: 150 }, (_, i) => ({
  x: hash(i * 3.1) * W, y: hash(i * 5.7) * H, z: 0.25 + hash(i * 9.2) * 0.75,
  vx: (hash(i * 1.3) - 0.5) * 30, vy: -(10 + hash(i * 2.9) * 40), ph: hash(i * 4.4) * TAU, rr: hash(i * 6.6),
}));

// ---------- background ----------
function background(ctx, t) {
  // drifting glows
  const glowAmt = 0.55 + 0.45 * prog(t, 0.8, 1.6) - 0.3 * prog(t, 9.0, 9.4) + 0.3 * prog(t, 11.0, 11.5);
  const gx = CX + 420 * Math.sin(t * 0.45), gy = CY + 220 * Math.cos(t * 0.32);
  let g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 1000);
  g.addColorStop(0, `rgba(143,208,255,${0.10 * glowAmt})`); g.addColorStop(1, 'rgba(143,208,255,0)');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);
  const vx = CX - 520 * Math.sin(t * 0.37 + 1), vy = CY - 260 * Math.cos(t * 0.29 + 2);
  g = ctx.createRadialGradient(vx, vy, 0, vx, vy, 800);
  g.addColorStop(0, `rgba(116,214,161,${0.05 * glowAmt})`); g.addColorStop(1, 'rgba(116,214,161,0)');
  ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400);

  // dot grid, circular reveal from centre after the line splits
  const rev = E.outExpo(prog(t, 1.05, 2.2));
  if (rev > 0) {
    const bright = 0.7 + 0.5 * prog(t, 4.7, 5.0) * (1 - prog(t, 5.9, 6.2));
    ctx.save();
    ctx.beginPath(); ctx.arc(CX, CY, rev * 1300, 0, TAU); ctx.clip();
    ctx.globalAlpha = bright;
    const ox = -((t * 18) % 60) - 60, oy = -((t * 9) % 60) - 60;
    ctx.drawImage(gridCanvas, ox + 30, oy + 30);
    ctx.restore();
  }

  // particles (converge into an orbit in the outro)
  const amt = prog(t, 0.6, 1.6);
  const conv = E.inOutCubic(prog(t, 13.2, 14.4));
  if (amt > 0) {
    for (const p of PARTS) {
      let x = (((p.x + p.vx * t * p.z) % W) + W) % W, y = (((p.y + p.vy * t * p.z) % H) + H) % H;
      if (conv > 0) {
        const a = p.ph + t * (0.15 + 0.25 * p.z), r = 470 + p.rr * 420;
        x = lerp(x, CX + Math.cos(a) * r, conv); y = lerp(y, CY + Math.sin(a) * r * 0.62, conv);
      }
      const tw = 0.5 + 0.5 * Math.sin(t * 2.3 + p.ph * 3);
      ctx.fillStyle = rgba(p.z > 0.8 ? C.indL : C.ink, (0.08 + 0.4 * p.z) * tw * amt);
      const s = 1 + 2.2 * p.z;
      ctx.fillRect(x, y, s, s);
    }
  }
}

// ---------- scene 0: boot ----------
function sIntro(ctx, t) {
  if (t > 1.6) return;
  const d = E.outBack(prog(t, 0.05, 0.4));
  const lineP = E.inOutExpo(prog(t, 0.35, 0.95));
  const split = E.inExpo(prog(t, 1.12, 1.5));
  const half = lineP * W * 0.5;
  ctx.save();
  ctx.shadowColor = C.ind; ctx.shadowBlur = 28;
  ctx.fillStyle = C.indL;
  const off = split * (H * 0.5 + 30);
  const th = 3 + split * 5;
  if (half > 0) { ctx.fillRect(CX - half, CY - th / 2 - off, half * 2, th); if (off > 0) ctx.fillRect(CX - half, CY - th / 2 + off, half * 2, th); }
  ctx.fillStyle = C.ink;
  const dr = 8 * d * (1 - 0.5 * lineP) * (1 - split);
  if (dr > 0) { ctx.beginPath(); ctx.arc(CX, CY, dr, 0, TAU); ctx.fill(); }
  ctx.restore();

  // pulse ring from dot
  const pr = prog(t, 0.12, 0.7);
  if (pr > 0 && pr < 1) {
    ctx.strokeStyle = rgba(C.indL, 0.6 * (1 - pr)); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(CX, CY, 10 + E.outCubic(pr) * 140, 0, TAU); ctx.stroke();
  }

  // ruler ticks + labels ride the line
  const fade = 1 - prog(t, 1.1, 1.3);
  if (lineP > 0 && fade > 0) {
    ctx.save();
    ctx.globalAlpha = fade;
    for (let k = -24; k <= 24; k++) {
      const x = CX + k * 40;
      const dx = Math.abs(x - CX);
      const tp = E.outCubic(prog(t, 0.45 + (dx / (W / 2)) * 0.45, 0.6 + (dx / (W / 2)) * 0.45));
      if (tp <= 0 || dx > half) continue;
      const hgt = (k % 5 === 0 ? 18 : 8) * tp;
      ctx.fillStyle = k % 5 === 0 ? C.indL : C.dim;
      ctx.fillRect(x - 0.75, CY + 10, 1.5, hgt);
      if (k % 5 === 0 && k !== 0) {
        setFont(ctx, 400, 12, MONO, 1);
        ctx.fillStyle = rgba(C.dim, tp); ctx.textAlign = 'center';
        ctx.fillText(String(Math.abs(k) * 40).padStart(4, '0'), x, CY + 46);
      }
    }
    ctx.textAlign = 'left';
    setFont(ctx, 500, 18, MONO, 7);
    ctx.fillStyle = C.ink;
    ctx.fillText(scramble('SHASHANK JAIN', prog(t, 0.6, 1.05), t, 3), CX - 740, CY - 36);
    ctx.fillStyle = C.indL; ctx.textAlign = 'right';
    ctx.fillText(scramble('SHOWREEL / 2026', prog(t, 0.7, 1.1), t, 9), CX + 740, CY - 36);
    ctx.textAlign = 'left';
    ctx.restore();
  }
}

// ---------- scene 1: identity ----------
function sName(ctx, t) {
  if (t < 1.45 || t > 3.62) return;
  const push = 1 + 0.04 * prog(t, 1.5, 3.5);
  ctx.save();
  ctx.translate(CX, CY); ctx.scale(push, push); ctx.translate(-CX, -CY);

  // background numeral
  setFont(ctx, 800, 760, SANS, -30);
  ctx.strokeStyle = rgba(C.indL, 0.07 * prog(t, 1.5, 1.9) * (1 - prog(t, 3.2, 3.5))); ctx.lineWidth = 2;
  ctx.textAlign = 'right';
  ctx.strokeText('01', W - 80 + 120 * (1 - E.outExpo(prog(t, 1.5, 2.6))) - (t - 1.5) * 30, H - 130);
  ctx.textAlign = 'left';

  const X = 150;
  setFont(ctx, 700, 236, SANS, -6, 'expanded');
  ctx.fillStyle = C.ink;
  riseText(ctx, 'SHASHANK', X, 470, { t, start: 1.5, stagger: 0.035, dur: 0.8, dist: 290, clipTop: 250, clipBot: 28, out: 3.18, outStagger: 0.018, outDur: 0.35 });

  // JAIN: outline drops in from above, then a fill wipes across it
  setFont(ctx, 700, 236, SANS, -6, 'expanded');
  ctx.strokeStyle = C.indL; ctx.lineWidth = 3;
  const jOpts = { t, start: 1.6, stagger: 0.045, dur: 0.8, dist: 290, dir: -1, clipTop: 198, clipBot: 60, out: 3.22, outStagger: 0.018, outDur: 0.33, mode: 'stroke' };
  riseText(ctx, 'JAIN', X, 720, jOpts);
  const fillP = E.inOutExpo(prog(t, 2.05, 2.6));
  if (fillP > 0) {
    const jw = mw(ctx, 'JAIN');
    ctx.save();
    ctx.beginPath(); ctx.rect(X - 20, 400, (jw + 40) * fillP, 400); ctx.clip();
    const g = ctx.createLinearGradient(X, 0, X + jw, 0);
    g.addColorStop(0, C.ind); g.addColorStop(1, C.vio);
    ctx.fillStyle = g;
    riseText(ctx, 'JAIN', X, 720, { ...jOpts, mode: 'fill' });
    ctx.restore();
  }

  // accent bar + role line
  const bar = E.outExpo(prog(t, 2.0, 2.7)) * (1 - E.inExpo(prog(t, 3.1, 3.4)));
  const jw2 = mw(ctx, 'JAIN');
  ctx.fillStyle = C.ind;
  ctx.fillRect(X + jw2 + 50, 612, bar * 520, 14);
  setFont(ctx, 500, 20, MONO, 5);
  ctx.fillStyle = rgba(C.dim, bar);
  ctx.fillText(scramble('HEALTHCARE · AI', prog(t, 2.2, 2.7), t, 4), X + jw2 + 50, 680);

  const sub = 1 - prog(t, 3.1, 3.3);
  setFont(ctx, 500, 30, MONO, 6);
  ctx.fillStyle = rgba(C.ink, sub);
  ctx.fillText(scramble('AI DEVELOPMENT ENGINEER', prog(t, 2.1, 2.75), t, 11), X + 6, 830);
  // pill
  const pp = E.outBack(prog(t, 2.55, 2.9)) * sub;
  if (pp > 0) {
    ctx.save();
    ctx.globalAlpha = clamp(pp);
    setFont(ctx, 600, 20, MONO, 3);
    const label = 'NODARIS AI · US HEALTHCARE RCM';
    const pw = mw(ctx, label) + 44;
    ctx.translate(X + 6, 870); ctx.scale(pp, pp);
    ctx.fillStyle = rgba(C.ind, 0.16); ctx.strokeStyle = rgba(C.indL, 0.7); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(0, 0, pw, 44, 22); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.indL; ctx.fillText(label, 22, 29);
    ctx.restore();
  }
  ctx.restore();
}

// diagonal panel wipe (covers the frame at its midpoint)
function wipe(ctx, t, start, dur, colors) {
  const skew = 320, Wp = 2900;
  colors.forEach((col, i) => {
    const p = E.inOutExpo(prog(t, start + i * 0.045, start + i * 0.045 + dur));
    if (p <= 0 || p >= 1) return;
    const x0 = lerp(-Wp - skew, W + skew, p);
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(x0 + skew, -10); ctx.lineTo(x0 + Wp + skew, -10);
    ctx.lineTo(x0 + Wp, H + 10); ctx.lineTo(x0, H + 10); ctx.closePath(); ctx.fill();
  });
}

// ---------- scene 2: systems ----------
const REEL = ['CLAIMS', 'DOCUMENT', 'ASYNC', 'HEALTHCARE'];
const SWITCH = [3.95, 4.2, 4.42];
function sBuild(ctx, t) {
  if (t < 3.45 || t > 4.95) return;
  const X = 150;
  const out = E.inExpo(prog(t, 4.62, 4.9));
  ctx.save();
  ctx.translate(0, -out * 140);
  ctx.globalAlpha = 1 - out;
  setFont(ctx, 500, 22, MONO, 8);
  ctx.fillStyle = C.indL;
  ctx.fillText(scramble('I DESIGN & BUILD', prog(t, 3.55, 3.9), t, 21), X + 6, 330);

  // slot reel
  let r = 0;
  SWITCH.forEach(s => { r += E.outExpo(prog(t, s, s + 0.22)); });
  const LH = 220, base = 560;
  setFont(ctx, 700, 190, SANS, -5, 'expanded');
  ctx.save();
  ctx.beginPath(); ctx.rect(0, base - 185, W, 225); ctx.clip();
  const enter = E.outExpo(prog(t, 3.5, 3.95));
  REEL.forEach((w, i) => {
    const y = base + (i - r) * LH + (1 - enter) * LH;
    if (y < base - LH || y > base + LH * 1.2) return;
    ctx.fillStyle = i === 3 ? C.ink : C.ink;
    ctx.fillText(w, X, y);
  });
  ctx.restore();

  setFont(ctx, 700, 190, SANS, -5, 'expanded');
  ctx.strokeStyle = C.indL; ctx.lineWidth = 3;
  riseText(ctx, 'SYSTEMS.', X, 815, { t, start: 3.65, stagger: 0.03, dur: 0.7, dist: 240, dir: -1, clipTop: 190, clipBot: 50, mode: 'stroke' });
  // underline scan
  const ul = E.inOutExpo(prog(t, 4.42, 4.62));
  ctx.fillStyle = C.ind;
  ctx.fillRect(X, 606, 1500 * ul, 8);
  ctx.restore();
}

const NODES = {
  client: { x: 320, y: 580, l: 'CLAIM UPLOAD', s: 'React · Django', c: 0 },
  gate: { x: 720, y: 580, l: 'CELERY WORKERS', s: 'async · idempotent', c: 1 },
  agent: { x: 1120, y: 370, l: 'DOCUMENTS', s: 'PyMuPDF · OCR', c: 2 },
  core: { x: 1120, y: 580, l: 'RULES LAYER', s: 'classify · route', c: 2 },
  rules: { x: 1120, y: 790, l: 'CLAIM STATUS', s: 'Stedi clearinghouse', c: 2 },
  db: { x: 1540, y: 470, l: 'POSTGRES', s: 'RDS · private', c: 3 },
  queue: { x: 1540, y: 690, l: 'WORK QUEUES', s: 'denials · ADR/MDR', c: 3 },
};
const EDGES = [['client', 'gate'], ['gate', 'agent'], ['gate', 'core'], ['gate', 'rules'], ['agent', 'db'], ['core', 'db'], ['core', 'queue'], ['rules', 'queue']];
const NW = 250, NH = 88;
function edgePath(a, b) {
  const A = NODES[a], B = NODES[b];
  const x1 = A.x + NW / 2, x2 = B.x - NW / 2, mx = (x1 + x2) / 2;
  return [[x1, A.y], [mx, A.y], [mx, B.y], [x2, B.y]];
}
function polyAt(pts, d) { // point at distance d along polyline
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const L = Math.hypot(x2 - x1, y2 - y1);
    if (d <= L) return [x1 + ((x2 - x1) * d) / L, y1 + ((y2 - y1) * d) / L];
    d -= L;
  }
  return pts[pts.length - 1];
}
function polyLen(pts) { let L = 0; for (let i = 0; i < pts.length - 1; i++) L += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); return L; }
function drawPartial(ctx, pts, len) {
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  let d = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const L = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    if (d + L >= len) { const p = polyAt(pts, len); ctx.lineTo(p[0], p[1]); break; }
    ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); d += L;
  }
  ctx.stroke();
}
function sArch(ctx, t) {
  if (t < 4.7 || t > 6.05) return;
  const colStart = c => 4.75 + c * 0.1;
  const collapse = E.inExpo(prog(t, 5.72, 6.0));
  const push = 1 + 0.07 * prog(t, 4.7, 6.0);
  ctx.save();
  ctx.translate(CX, CY); ctx.scale(push, push); ctx.rotate(-0.012 + 0.02 * prog(t, 4.7, 6)); ctx.translate(-CX, -CY + 20);

  // header
  setFont(ctx, 500, 20, MONO, 6);
  ctx.fillStyle = rgba(C.indL, 1 - collapse);
  ctx.fillText(scramble('HEALTHCARE REVENUE CYCLE / HOW A CLAIM MOVES', prog(t, 4.75, 5.2), t, 31), 195, 215);

  // edges
  EDGES.forEach(([a, b], i) => {
    const pts = edgePath(a, b), L = polyLen(pts);
    const s = colStart(NODES[b].c) + 0.05;
    const p = E.inOutCubic(prog(t, s, s + 0.3)) * (1 - collapse);
    if (p <= 0) return;
    ctx.strokeStyle = rgba(C.indL, 0.45); ctx.lineWidth = 2;
    drawPartial(ctx, pts, L * p);
    // packets
    if (p >= 1 || collapse > 0) {
      for (let k = 0; k < 2; k++) {
        const ph = ((t - s) * 1.6 + k * 0.5 + i * 0.13) % 1;
        for (let j = 0; j < 6; j++) {
          const q = ph - j * 0.018;
          if (q < 0) continue;
          const [px, py] = polyAt(pts, q * L);
          ctx.fillStyle = rgba(j === 0 ? C.ink : C.indL, (1 - j / 6) * (1 - collapse));
          const sz = 7 - j;
          ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
        }
      }
    }
  });

  // nodes
  for (const key in NODES) {
    const n = NODES[key];
    const s = colStart(n.c) + (key === 'agent' ? 0 : key === 'core' ? 0.04 : key === 'rules' ? 0.08 : key === 'queue' ? 0.05 : 0);
    let sc = E.outBack(prog(t, s, s + 0.35));
    if (sc <= 0) continue;
    const cx = lerp(n.x, CX, collapse), cy = lerp(n.y, CY, collapse);
    sc *= 1 - collapse;
    if (sc <= 0.001) continue;
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(sc, sc);
    ctx.globalAlpha = clamp(prog(t, s, s + 0.15));
    const pulse = 0.5 + 0.5 * Math.sin(t * 9 + n.x * 0.01);
    ctx.fillStyle = C.card;
    ctx.strokeStyle = rgba(C.indL, 0.35 + 0.35 * pulse * prog(t, s + 0.4, s + 0.6)); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(-NW / 2, -NH / 2, NW, NH, 14); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.ind; ctx.fillRect(-NW / 2 + 22, -12, 8, 8);
    setFont(ctx, 700, 22, SANS, 1.5);
    ctx.fillStyle = C.ink; ctx.fillText(n.l, -NW / 2 + 44, -2);
    setFont(ctx, 400, 14, MONO, 0.5);
    ctx.fillStyle = C.dim; ctx.fillText(n.s, -NW / 2 + 44, 24);
    ctx.restore();
  }
  ctx.restore();

  // collapse point
  if (collapse > 0) {
    ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.arc(CX, CY, 4 + 10 * collapse, 0, TAU); ctx.fill();
  }
}

// ---------- scene 3: impact ----------
const STATS = [
  { fmt: p => String(Math.round(lerp(1140, 85, p))), suf: 's', label: 'PDF INGESTION, WAS 19 MIN', viz: 'line' },
  { fmt: p => Math.round(14400 * p).toLocaleString('en-US'), suf: '', label: 'PAGES IN ONE PDF', viz: 'bars' },
  { fmt: p => (5.5 * (1 - p)).toFixed(1), suf: 'GB', label: 'TEMP IMAGES ELIMINATED', viz: 'grid' },
  { fmt: p => (99.9 * p).toFixed(1), suf: '%', label: 'UPTIME, EARLIER PLATFORMS', viz: 'gauge' },
];
function sStats(ctx, t) {
  if (t < 5.98 || t > 9.05) return;
  const zoom = E.inExpo(prog(t, 8.5, 9.0));
  ctx.save();
  const s = (1 + 0.025 * prog(t, 6, 8.5)) * (1 + 9 * zoom);
  ctx.translate(CX, CY); ctx.scale(s, s); ctx.rotate(zoom * 0.25); ctx.translate(-CX, -CY);
  ctx.globalAlpha = 1 - zoom * zoom;

  // cross grid
  const g = E.outExpo(prog(t, 6.0, 6.55));
  ctx.fillStyle = rgba(C.indL, 0.35);
  ctx.fillRect(CX - 0.75, CY - g * 430, 1.5, g * 860);
  ctx.fillRect(CX - g * 820, CY - 0.75, g * 1640, 1.5);
  // corner marks on cells
  const cm = prog(t, 6.3, 6.6);
  ctx.strokeStyle = rgba(C.dim, cm); ctx.lineWidth = 1.5;
  [[CX - 820, CY - 430], [CX + 820, CY - 430], [CX - 820, CY + 430], [CX + 820, CY + 430]].forEach(([x, y]) => {
    const sx = x < CX ? 1 : -1, sy = y < CY ? 1 : -1;
    ctx.beginPath(); ctx.moveTo(x, y + sy * 26); ctx.lineTo(x, y); ctx.lineTo(x + sx * 26, y); ctx.stroke();
  });
  // centre node
  const cp = E.outBack(prog(t, 6.2, 6.5));
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(CX, CY, 6 * cp * (1 + 0.25 * Math.sin(t * 8)), 0, TAU); ctx.fill();
  ctx.strokeStyle = rgba(C.indL, 0.6 * cp); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(CX, CY, 18 * cp, 0, TAU); ctx.stroke();

  STATS.forEach((st, i) => {
    const cx0 = i % 2 === 0 ? CX - 790 : CX + 60;
    const cy0 = i < 2 ? CY - 410 : CY + 20;
    const s0 = 6.15 + i * 0.22;
    const cnt = E.outExpo(prog(t, s0 + 0.05, s0 + 1.3));
    // number
    setFont(ctx, 700, 96, SANS, -3, 'expanded');
    ctx.fillStyle = C.ink;
    const num = st.fmt(cnt);
    ctx.save();
    ctx.beginPath(); ctx.rect(cx0 + 40, cy0 + 90, 720, 175); ctx.clip();
    const dy = (1 - E.outExpo(prog(t, s0, s0 + 0.6))) * 180;
    ctx.fillText(num, cx0 + 50, cy0 + 245 + dy);
    const nw = mw(ctx, num);
    ctx.fillStyle = C.indL;
    ctx.fillText(st.suf, cx0 + 50 + nw + 6, cy0 + 245 + dy);
    ctx.restore();
    setFont(ctx, 500, 18, MONO, 5);
    ctx.fillStyle = C.dim;
    ctx.fillText(scramble(st.label, prog(t, s0 + 0.15, s0 + 0.6), t, i * 13), cx0 + 56, cy0 + 300);
    // small index
    setFont(ctx, 500, 14, MONO, 2);
    ctx.fillStyle = rgba(C.indL, prog(t, s0, s0 + 0.2));
    ctx.fillText('0' + (i + 1), cx0 + 56, cy0 + 78);

    const vx = cx0 + 520, vy = cy0 + 70, vp = prog(t, s0 + 0.1, s0 + 1.2);
    if (vp <= 0) return;
    if (st.viz === 'gauge') {
      const gx = vx + 150, gy = vy + 150, R = 108;
      ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.strokeStyle = C.faint; ctx.beginPath(); ctx.arc(gx, gy, R, 0, TAU); ctx.stroke();
      ctx.strokeStyle = C.indL;
      ctx.beginPath(); ctx.arc(gx, gy, R, -Math.PI / 2, -Math.PI / 2 + TAU * 0.999 * E.outExpo(vp)); ctx.stroke();
      ctx.lineCap = 'butt';
      ctx.save(); ctx.translate(gx, gy); ctx.rotate(t * 1.2);
      for (let k = 0; k < 48; k++) {
        ctx.rotate(TAU / 48);
        ctx.fillStyle = rgba(C.dim, (k % 4 === 0 ? 0.9 : 0.4) * clamp(vp * 3));
        ctx.fillRect(R + 20, -1, k % 4 === 0 ? 12 : 6, 2);
      }
      ctx.restore();
    } else if (st.viz === 'bars') {
      for (let k = 0; k < 13; k++) {
        const bp = E.outBack(prog(t, s0 + 0.1 + k * 0.035, s0 + 0.55 + k * 0.035));
        const h = (60 + 170 * (0.35 + 0.65 * hash(k * 2.7)) * (0.85 + 0.15 * Math.sin(t * 6 + k * 0.7))) * bp;
        ctx.fillStyle = k === 9 ? C.indL : rgba(C.ind, 0.55);
        ctx.fillRect(vx + k * 23, vy + 290 - h, 15, h);
      }
      ctx.fillStyle = C.faint; ctx.fillRect(vx - 6, vy + 292, 310, 2);
    } else if (st.viz === 'grid') {
      for (let k = 0; k < 10; k++) {
        const bp = E.outBack(prog(t, s0 + 0.15 + k * 0.06, s0 + 0.45 + k * 0.06));
        if (bp <= 0) continue;
        const x = vx + (k % 5) * 60 + 22, y = vy + 90 + Math.floor(k / 5) * 60 + 22;
        ctx.save(); ctx.translate(x, y); ctx.scale(bp, bp); ctx.rotate((1 - clamp(bp)) * 1.5);
        const lit = prog(t, s0 + 0.8 + k * 0.05, s0 + 0.9 + k * 0.05);
        ctx.fillStyle = lit > 0.5 ? C.ind : 'rgba(0,0,0,0)';
        ctx.strokeStyle = C.indL; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.rect(-21, -21, 42, 42); ctx.fill(); ctx.stroke();
        ctx.restore();
      }
    } else {
      const pts = [];
      for (let k = 0; k <= 30; k++) {
        const u = k / 30;
        const y = lerp(40, 250, E.inOutCubic(clamp((u - 0.2) / 0.6))) + noise1(k * 1.7) * 16;
        pts.push([vx + u * 300, vy + y]);
      }
      ctx.strokeStyle = C.faint; ctx.lineWidth = 1.5; ctx.setLineDash([6, 8]);
      ctx.beginPath(); ctx.moveTo(vx, vy + 40); ctx.lineTo(vx + 300, vy + 40); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = C.indL; ctx.lineWidth = 4; ctx.lineJoin = 'round';
      const L = polyLen(pts), dp = E.inOutCubic(vp);
      drawPartial(ctx, pts, L * dp);
      const [hx, hy] = polyAt(pts, L * dp);
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(hx, hy, 7, 0, TAU); ctx.fill();
      ctx.lineJoin = 'miter';
    }
  });
  ctx.restore();
}

// ---------- scene 4: stack orbit ----------
const RINGS = [
  { r: 290, roll: 0.0, sp: 0.55, items: ['Python', 'Django', 'FastAPI'] },
  { r: 470, roll: 0.22, sp: -0.38, items: ['React', 'PostgreSQL', 'Celery', 'Redis'] },
  { r: 660, roll: -0.16, sp: 0.26, items: ['AWS ECS', 'RDS', 'S3', 'Terraform', 'GitHub Actions', 'Stedi'] },
];
function project(r, a, phi, roll, scale) {
  const x = r * Math.cos(a) * scale, y0 = r * Math.sin(a) * scale;
  const y = y0 * Math.cos(phi), z = y0 * Math.sin(phi);
  const xr = x * Math.cos(roll) - y * Math.sin(roll), yr = x * Math.sin(roll) + y * Math.cos(roll);
  const f = 1500 / (1500 + z);
  return { x: CX + xr * f, y: CY + yr * f, z, f };
}
function sStack(ctx, t) {
  if (t < 8.7 || t > 11.62) return;
  const enter = E.outExpo(prog(t, 8.75, 9.6));
  const tilt = E.inOutCubic(prog(t, 8.9, 9.9));
  const flat = E.inOutExpo(prog(t, 10.95, 11.5));
  const phi = lerp(lerp(0, 1.12, tilt) + 0.08 * Math.sin(t * 1.3), Math.PI / 2, flat);
  const scale = lerp(0.15, 1, enter) * (1 + flat * 0.9);
  const rollK = 1 - flat;

  // big ghost title
  setFont(ctx, 800, 330, SANS, -12);
  ctx.textAlign = 'center';
  ctx.strokeStyle = rgba(C.indL, 0.06 * prog(t, 9.0, 9.5) * (1 - flat)); ctx.lineWidth = 2;
  ctx.strokeText('THE STACK', CX + (t - 10) * -40, CY + 115);
  ctx.textAlign = 'left';

  // core
  const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 170 * enter);
  cg.addColorStop(0, rgba(C.indL, 0.9 * (1 - flat))); cg.addColorStop(0.25, rgba(C.ind, 0.35 * (1 - flat))); cg.addColorStop(1, 'rgba(143,208,255,0)');
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(CX, CY, 170 * enter + 1, 0, TAU); ctx.fill();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(CX, CY, 16 * enter * (1 - flat), 0, TAU); ctx.fill();

  // collect labels for depth sort
  const labels = [];
  RINGS.forEach((R, ri) => {
    const draw = E.inOutCubic(prog(t, 8.85 + ri * 0.1, 9.55 + ri * 0.1));
    const roll = R.roll * rollK;
    const rot = t * R.sp + ri;
    // ring stroke with depth shading
    const seg = 160;
    for (let k = 0; k < seg * draw; k++) {
      const a1 = (k / seg) * TAU + rot, a2 = ((k + 1) / seg) * TAU + rot;
      const p1 = project(R.r, a1, phi, roll, scale), p2 = project(R.r, a2, phi, roll, scale);
      const depth = clamp(0.5 - p1.z / (2 * R.r));
      ctx.strokeStyle = rgba(flat > 0.5 ? C.indL : C.indL, (0.12 + 0.55 * depth) * (1 - 0.2 * flat) + flat * 0.4);
      ctx.lineWidth = 1.2 + 1.5 * depth + flat * 2;
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    }
    // orbiting sparks
    for (let k = 0; k < 3; k++) {
      const a = -t * R.sp * 2.2 + (k * TAU) / 3 + ri;
      const p = project(R.r, a, phi, roll, scale);
      ctx.fillStyle = rgba(C.ink, 0.8 * draw * (1 - flat));
      ctx.beginPath(); ctx.arc(p.x, p.y, 3 * p.f, 0, TAU); ctx.fill();
    }
    R.items.forEach((name, k) => {
      const a = (k / R.items.length) * TAU + rot;
      const p = project(R.r, a, phi, roll, scale);
      const pop = E.outBack(prog(t, 9.05 + ri * 0.12 + k * 0.05, 9.4 + ri * 0.12 + k * 0.05)) * (1 - E.inExpo(prog(t, 10.85, 11.2)));
      if (pop > 0) labels.push({ name, p, pop });
    });
  });
  labels.sort((a, b) => b.p.z - a.p.z);
  for (const L of labels) {
    const depth = clamp(0.5 - L.p.z / 1400);
    const s = L.p.f * L.pop;
    ctx.save();
    ctx.translate(L.p.x, L.p.y); ctx.scale(s, s);
    setFont(ctx, 700, 28, SANS, 0.5);
    const w = mw(ctx, L.name) + 48;
    ctx.globalAlpha = clamp(0.35 + 0.65 * depth);
    ctx.fillStyle = C.card; ctx.strokeStyle = rgba(C.indL, 0.3 + 0.6 * depth); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(-w / 2, -28, w, 56, 28); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.fillText(L.name, 0, 10); ctx.textAlign = 'left';
    ctx.restore();
  }

  // caption
  setFont(ctx, 500, 20, MONO, 7);
  ctx.textAlign = 'center';
  ctx.fillStyle = rgba(C.dim, 1 - flat);
  ctx.fillText(scramble('3+ YEARS · PYTHON · DJANGO · REACT · AWS', prog(t, 9.4, 10.0), t, 41), CX, H - 120);
  ctx.textAlign = 'left';
}

// ---------- scene 5: selected work ----------
const WORK = [
  { cat: 'HEALTHCARE REVENUE CYCLE', t: ['Healthcare Claims', 'Automation Platform'], m: 'Upload → rules → claim status → work queue', tech: ['Django', 'Celery', 'Stedi', 'PostgreSQL'] },
  { cat: 'PERFORMANCE', t: ['Scaling Healthcare', 'Document Ingestion'], m: '~19 min → ~85 s on a 14,400-page PDF', tech: ['PyMuPDF', 'OCR', 'Celery', 'S3'] },
  { cat: 'CLOUD INFRASTRUCTURE', t: ['Cloud Infrastructure', '& Production Eng.'], m: 'Private, reproducible AWS environments', tech: ['ECS', 'RDS', 'Terraform', 'GitHub Actions'] },
  { cat: 'RELIABILITY', t: ['Reliable Healthcare', 'Workflows'], m: 'No silent failures · safe to re-run', tech: ['Celery', 'Idempotent backfills', 'S3'] },
];
const WS = 11.5, WD = 0.44;
function cardX(i, t) {
  const s = WS + i * WD;
  let x = lerp(W * 1.15, 0, E.outExpo(prog(t, s, s + 0.24)));
  if (i < 3) x -= E.inExpo(prog(t, s + 0.33, s + 0.47)) * W * 1.25;
  return x;
}
function sWork(ctx, t) {
  if (t < 11.45 || t > 13.4) return;
  const idx = clamp(Math.floor((t - WS) / WD), 0, 3);

  // marquee
  setFont(ctx, 700, 220, SANS, -6, 'expanded');
  ctx.strokeStyle = rgba(C.indL, 0.09 * (1 - prog(t, 13.1, 13.3))); ctx.lineWidth = 2;
  const txt = (WORK[idx].cat + ' — ').repeat(4);
  const mwid = mw(ctx, WORK[idx].cat + ' — ');
  const off = -(((t - WS) * 900) % mwid);
  ctx.strokeText(txt, off, 300);
  ctx.strokeText(txt, -mwid - off * 0.7 + mwid * 0.3, 1000);

  // label
  setFont(ctx, 500, 20, MONO, 7);
  ctx.fillStyle = rgba(C.indL, 1 - prog(t, 13.1, 13.25));
  ctx.fillText(scramble('SELECTED WORK', prog(t, 11.55, 11.9), t, 51), 150, 180);
  setFont(ctx, 500, 20, MONO, 4);
  ctx.textAlign = 'right';
  ctx.fillStyle = rgba(C.dim, 1 - prog(t, 13.1, 13.25));
  ctx.fillText('CONFIDENTIAL · HIGH LEVEL', W - 150, 180);
  ctx.textAlign = 'left';

  const CW = 1240, CH = 600;
  for (let i = 3; i >= 0; i--) {
    const s = WS + i * WD;
    if (t < s || t > s + 0.5 + (i === 3 ? 2 : 0)) continue;
    const x = cardX(i, t);
    const v = (cardX(i, t + 0.004) - x) / 0.004;
    const skew = clamp(-v / 9000, -0.35, 0.35);
    let sc = 1;
    if (i === 3) sc = 1 - E.inExpo(prog(t, 13.02, 13.26));
    if (sc <= 0.001) continue;
    ctx.save();
    ctx.translate(CX + x, CY + 30);
    ctx.transform(1, 0, skew, 1, 0, 0);
    ctx.scale(sc, sc * (0.6 + 0.4 * sc));
    ctx.rotate(-skew * 0.08);
    const x0 = -CW / 2, y0 = -CH / 2;
    ctx.fillStyle = C.card; ctx.strokeStyle = rgba(C.indL, 0.4); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(x0, y0, CW, CH, 22); ctx.fill(); ctx.stroke();
    ctx.save();
    ctx.beginPath(); ctx.roundRect(x0, y0, CW, CH, 22); ctx.clip();
    // glow corner
    const g = ctx.createRadialGradient(x0 + CW, y0 + CH, 0, x0 + CW, y0 + CH, 700);
    g.addColorStop(0, rgba(C.ind, 0.22)); g.addColorStop(1, 'rgba(63,143,214,0)');
    ctx.fillStyle = g; ctx.fillRect(x0, y0, CW, CH);
    setFont(ctx, 800, 440, SANS, -20);
    ctx.textAlign = 'right'; ctx.strokeStyle = rgba(C.indL, 0.16); ctx.lineWidth = 2;
    ctx.strokeText('0' + (i + 1), x0 + CW + 20 - (t - s) * 60, y0 + CH + 60);
    ctx.textAlign = 'left';
    ctx.restore();

    const W_ = WORK[i];
    setFont(ctx, 500, 18, MONO, 4);
    ctx.fillStyle = C.indL; ctx.fillText(`0${i + 1} / 04`, x0 + 64, y0 + 72);
    ctx.textAlign = 'right'; ctx.fillStyle = C.dim; ctx.fillText(W_.cat, x0 + CW - 64, y0 + 72); ctx.textAlign = 'left';
    ctx.fillStyle = C.line; ctx.fillRect(x0 + 64, y0 + 100, CW - 128, 1.5);
    setFont(ctx, 700, 78, SANS, -2, 'semi-expanded');
    ctx.fillStyle = C.ink;
    ctx.fillText(W_.t[0], x0 + 60, y0 + 220);
    ctx.fillText(W_.t[1], x0 + 60, y0 + 314);
    setFont(ctx, 600, 32, SANS, 0);
    ctx.fillStyle = C.indL; ctx.fillText(W_.m, x0 + 64, y0 + 400);
    setFont(ctx, 500, 18, MONO, 1);
    let cx = x0 + 64;
    W_.tech.forEach(tk => {
      const w = mw(ctx, tk) + 36;
      ctx.strokeStyle = rgba(C.dim, 0.6); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.roundRect(cx, y0 + 470, w, 46, 23); ctx.stroke();
      ctx.fillStyle = C.ink; ctx.fillText(tk, cx + 18, y0 + 499);
      cx += w + 12;
    });
    ctx.restore();
  }
}

// ---------- scene 6: contact / lockup ----------
function sOutro(ctx, t) {
  if (t < 13.2) return;
  // shockwaves
  [13.25, 13.36].forEach((s, k) => {
    const p = prog(t, s, s + 0.9);
    if (p <= 0 || p >= 1) return;
    ctx.strokeStyle = rgba(k ? C.indL : C.ink, 0.8 * (1 - p)); ctx.lineWidth = 10 * (1 - p) + 1;
    ctx.beginPath(); ctx.arc(CX, CY, E.outExpo(p) * 1250, 0, TAU); ctx.stroke();
  });
  // glow
  const gp = E.outCubic(prog(t, 13.25, 14.0));
  const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, 900);
  g.addColorStop(0, rgba(C.ind, 0.2 * gp)); g.addColorStop(1, 'rgba(63,143,214,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // rotating dashed arcs
  const ap = E.outExpo(prog(t, 13.4, 14.3));
  if (ap > 0) {
    ctx.save(); ctx.translate(CX, CY); ctx.scale(1, 0.62);
    ctx.setLineDash([2, 14]); ctx.lineWidth = 2;
    ctx.strokeStyle = rgba(C.indL, 0.5 * ap);
    ctx.beginPath(); ctx.arc(0, 0, 640, t * 0.4, t * 0.4 + TAU * 0.8 * ap); ctx.stroke();
    ctx.setLineDash([60, 20]); ctx.lineWidth = 1.2;
    ctx.strokeStyle = rgba(C.dim, 0.5 * ap);
    ctx.beginPath(); ctx.arc(0, 0, 720, -t * 0.25, -t * 0.25 + TAU * 0.7 * ap); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  setFont(ctx, 700, 132, SANS, -4, 'expanded');
  ctx.fillStyle = C.ink;
  riseText(ctx, 'SHASHANK JAIN', CX, CY - 10, { t, start: 13.32, stagger: 0.03, dur: 0.8, dist: 180, align: 'center', order: 'center', clipTop: 140, clipBot: 40 });
  const lp = E.inOutExpo(prog(t, 13.65, 14.15));
  const lg = ctx.createLinearGradient(CX - 380, 0, CX + 380, 0);
  lg.addColorStop(0, rgba(C.ind, 0)); lg.addColorStop(0.5, C.indL); lg.addColorStop(1, rgba(C.vio, 0));
  ctx.fillStyle = lg; ctx.fillRect(CX - 380 * lp, CY + 40, 760 * lp, 3);
  setFont(ctx, 500, 24, MONO, 9);
  ctx.textAlign = 'center';
  ctx.fillStyle = C.dim;
  ctx.fillText(scramble('AI DEVELOPMENT ENGINEER · NODARIS AI', prog(t, 13.75, 14.3), t, 61), CX, CY + 100);
  // url typed
  const url = 'portfolio.jainshashank.in';
  const n = Math.floor(url.length * prog(t, 14.0, 14.45));
  setFont(ctx, 600, 40, SANS, 0.5);
  const full = mw(ctx, url);
  const typed = url.slice(0, n);
  ctx.textAlign = 'left';
  const ux = CX - full / 2;
  ctx.fillStyle = C.indL; ctx.fillText(typed, ux, CY + 190);
  if (t > 13.95 && Math.floor(t * 3.2) % 2 === 0) { ctx.fillStyle = C.ink; ctx.fillRect(ux + mw(ctx, typed) + 6, CY + 158, 16, 40); }
  setFont(ctx, 500, 16, MONO, 5);
  ctx.textAlign = 'center';
  ctx.fillStyle = rgba(C.dim, prog(t, 14.3, 14.6));
  ctx.fillText('CLAIMS · CLEARINGHOUSES · DOCUMENTS · AWS', CX, H - 150);
  ctx.textAlign = 'left';
}

// ---------- HUD ----------
function hud(ctx, t) {
  const a = prog(t, 0.9, 1.3) * (1 - 0.6 * prog(t, 13.25, 13.6));
  if (a <= 0) return;
  ctx.save();
  ctx.globalAlpha = a;
  const m = 44, L = 26;
  ctx.strokeStyle = rgba(C.dim, 0.8); ctx.lineWidth = 1.5;
  [[m, m, 1, 1], [W - m, m, -1, 1], [m, H - m, 1, -1], [W - m, H - m, -1, -1]].forEach(([x, y, sx, sy]) => {
    const e = E.outExpo(prog(t, 0.9, 1.4));
    ctx.beginPath(); ctx.moveTo(x, y + sy * L * e); ctx.lineTo(x, y); ctx.lineTo(x + sx * L * e, y); ctx.stroke();
  });
  setFont(ctx, 500, 14, MONO, 3);
  ctx.fillStyle = C.ink;
  ctx.fillText('SJ', m + 22, m + 34);
  ctx.fillStyle = C.dim;
  ctx.fillText('/ SHOWREEL 2026', m + 56, m + 34);
  const sec = Math.floor(t), fr = Math.floor((t - sec) * FPS);
  ctx.textAlign = 'right';
  ctx.fillStyle = C.indL;
  ctx.fillText(`● REC`, W - m - 22 - 170, m + 34);
  ctx.fillStyle = C.ink;
  ctx.fillText(`00:00:${String(sec).padStart(2, '0')}:${String(fr).padStart(2, '0')}`, W - m - 22, m + 34);
  ctx.fillStyle = C.dim;
  ctx.fillText('PORTFOLIO.JAINSHASHANK.IN', W - m - 22, H - m - 22);
  ctx.textAlign = 'left';
  let ch = CHAPTERS[0];
  for (const c of CHAPTERS) if (t >= c[0]) ch = c;
  ctx.fillStyle = C.ink;
  ctx.fillText(scramble(ch[1], prog(t, ch[0], ch[0] + 0.35), t, ch[0] * 10), m + 22, H - m - 22);
  // progress rail
  const px = m + 22 + 300, pw = W - 2 * (m + 22) - 640;
  ctx.fillStyle = C.faint; ctx.fillRect(px, H - m - 28, pw, 2);
  ctx.fillStyle = C.indL; ctx.fillRect(px, H - m - 28, pw * (t / DUR), 2);
  CHAPTERS.forEach(([s]) => { ctx.fillStyle = t >= s ? C.indL : C.dim; ctx.fillRect(px + pw * (s / DUR) - 1, H - m - 34, 2, 14); });
  ctx.restore();
}

// ---------- compose ----------
function drawFrame(ctx, t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  const imp = impulse(t);
  const cx = imp * 16 * noise1(t * 38), cy = imp * 12 * noise1(t * 41 + 7), cr = imp * 0.006 * noise1(t * 29 + 3), cs = 1 + imp * 0.035;
  ctx.save();
  ctx.translate(CX + cx, CY + cy); ctx.rotate(cr); ctx.scale(cs, cs); ctx.translate(-CX, -CY);
  background(ctx, t);
  sIntro(ctx, t);
  sName(ctx, t);
  sBuild(ctx, t);
  sArch(ctx, t);
  sStats(ctx, t);
  sStack(ctx, t);
  sWork(ctx, t);
  sOutro(ctx, t);
  wipe(ctx, t, 3.28, 0.46, [C.indL, C.ind]);
  ctx.restore();
  hud(ctx, t);
  // hit flashes
  let fl = 0;
  for (const h of HITS) if (t >= h) fl += Math.exp(-(t - h) * 22);
  if (fl > 0.01) { ctx.fillStyle = `rgba(225,240,255,${Math.min(0.35, fl * 0.3)})`; ctx.fillRect(0, 0, W, H); }
}

// chromatic aberration on the composited frame
let caR, caG, caB;
function mkCanvas() { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; }
function chroma(ctx, src, amt) {
  if (!caR) { caR = mkCanvas(); caG = mkCanvas(); caB = mkCanvas(); }
  [[caR, '#ff0000'], [caG, '#00ff00'], [caB, '#0000ff']].forEach(([c, col]) => {
    const x = c.getContext('2d');
    x.globalCompositeOperation = 'copy'; x.drawImage(src, 0, 0);
    x.globalCompositeOperation = 'multiply'; x.fillStyle = col; x.fillRect(0, 0, W, H);
  });
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'copy'; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter';
  ctx.drawImage(caR, -amt, 0); ctx.drawImage(caG, 0, 0); ctx.drawImage(caB, amt, amt * 0.3);
  ctx.globalCompositeOperation = 'source-over';
}
function caAmount(t) {
  let a = impulse(t, 14) * 10;
  if (t > 11.4 && t < 13.3) for (let i = 0; i < 4; i++) a += Math.abs(cardX(i, t + 0.004) - cardX(i, t)) / 0.004 / 2500;
  if (t < 9.0) a += E.inExpo(prog(t, 8.6, 9.0)) * 8;
  return Math.min(a, 14);
}

// motion-blurred frame: average SUB samples across a 180° shutter
const canvas = document.getElementById('c');
const out = canvas.getContext('2d');
const sub = mkCanvas(), sctx = sub.getContext('2d');
const acc = mkCanvas(), actx = acc.getContext('2d');
function renderFrame(f, SUB = 8) {
  const t0 = f / FPS, shutter = 0.5 / FPS;
  for (let k = 0; k < SUB; k++) {
    const t = Math.max(0, t0 + ((k + 0.5) / SUB - 0.5) * shutter);
    drawFrame(sctx, t);
    actx.globalAlpha = 1 / (k + 1);
    actx.drawImage(sub, 0, 0);
  }
  actx.globalAlpha = 1;
  const amt = caAmount(t0);
  if (amt > 0.4) chroma(out, acc, amt);
  else { out.globalCompositeOperation = 'copy'; out.drawImage(acc, 0, 0); out.globalCompositeOperation = 'source-over'; }
}
window.renderFrameB64 = (f, sub) => { renderFrame(f, sub); return canvas.toDataURL('image/png').split(',')[1]; };
window.renderAt = (t, sub) => renderFrame(Math.round(t * FPS), sub);

document.fonts.load('700 100px Archivo').then(() => document.fonts.ready).then(() => {
  buildAssets();
  window.reelReady = true;
  if (!location.search.includes('render')) {
    const t0 = performance.now();
    const loop = () => { const t = ((performance.now() - t0) / 1000) % DUR; drawFrame(out, t); requestAnimationFrame(loop); };
    loop();
  }
});
