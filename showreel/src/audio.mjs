// Offline synth: 15s, 120 BPM, F minor, every hit locked to the picture cuts.
import fs from 'node:fs';
const SR = 48000, DUR = 15, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
const sendL = new Float32Array(N), sendR = new Float32Array(N); // reverb bus
const HITS = [1.5, 3.5, 6.0, 9.0, 11.5, 13.25];
const TAU = Math.PI * 2;
let seed = 1;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

function put(i, l, r, send = 0) {
  if (i < 0 || i >= N) return;
  L[i] += l; R[i] += r;
  if (send) { sendL[i] += l * send; sendR[i] += r * send; }
}
const pan = (x, p) => [x * Math.cos((p + 1) * Math.PI / 4), x * Math.sin((p + 1) * Math.PI / 4)];

// kicks: four on the floor from the first hit to the outro, breakdown before the stack drop
const kicks = [];
for (let t = 1.5; t < 13.2; t += 0.5) if (!(t >= 8.5 && t < 9.0)) kicks.push(t);
const duck = t => { let g = 1; for (const k of kicks) if (t >= k && t < k + 0.4) g = Math.min(g, 1 - 0.75 * Math.exp(-(t - k) * 9)); return g; };

function kick(t0, amp = 1) {
  let ph = 0;
  for (let i = 0; i < SR * 0.5; i++) {
    const t = i / SR, f = 44 + 120 * Math.exp(-t * 32);
    ph += TAU * f / SR;
    const x = Math.tanh(Math.sin(ph) * 1.6) * Math.exp(-t * 6.5) * amp * 0.9 + (i < 60 ? rnd() * 0.3 * (1 - i / 60) : 0);
    put(Math.round(t0 * SR) + i, x, x);
  }
}
function boom(t0, amp = 1, len = 1.6) {
  let ph = 0, lp = 0;
  for (let i = 0; i < SR * len; i++) {
    const t = i / SR, f = 32 + 70 * Math.exp(-t * 9);
    ph += TAU * f / SR;
    lp += 0.08 * (rnd() - lp);
    const env = Math.exp(-t * 2.6);
    const x = (Math.sin(ph) * 0.9 + lp * 0.8 * Math.exp(-t * 5)) * env * amp;
    put(Math.round(t0 * SR) + i, x, x, 0.25);
  }
}
function crash(t0, amp = 1, len = 1.4) {
  let lp = 0, hp;
  for (let i = 0; i < SR * len; i++) {
    const t = i / SR, n = rnd();
    lp += 0.25 * (n - lp); hp = n - lp;
    const env = Math.exp(-t * 3.2) * amp * 0.28;
    put(Math.round(t0 * SR) + i, hp * env * (1 + 0.2 * rnd()), hp * env * (1 + 0.2 * rnd()), 0.5);
  }
}
function hat(t0, open, amp, p = 0) {
  let lp = 0;
  const len = open ? 0.16 : 0.035;
  for (let i = 0; i < SR * len; i++) {
    const t = i / SR, n = rnd();
    lp += 0.45 * (n - lp);
    const x = (n - lp) * Math.exp(-t * (open ? 22 : 110)) * amp;
    const [a, b] = pan(x, p);
    put(Math.round(t0 * SR) + i, a, b, 0.08);
  }
}
function bandpass(fc, q) { // RBJ biquad
  const w = TAU * fc / SR, al = Math.sin(w) / (2 * q), a0 = 1 + al;
  const b0 = al / a0, b2 = -al / a0, a1 = -2 * Math.cos(w) / a0, a2 = (1 - al) / a0;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return x => { const y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; };
}
function clap(t0, amp = 1) {
  const bp = bandpass(1400, 1.2);
  for (let i = 0; i < SR * 0.35; i++) {
    const t = i / SR;
    let env = Math.exp(-t * 14);
    for (const o of [0, 0.011, 0.022]) if (t >= o && t < o + 0.01) env = Math.max(env, 1.0 * Math.exp(-(t - o) * 300));
    const x = bp(rnd()) * env * amp * 1.4;
    put(Math.round(t0 * SR) + i, x, x * 0.95, 0.35);
  }
}
function whoosh(t0, len, amp, dir = 1) {
  let s1 = 0, s2 = 0;
  for (let i = 0; i < SR * len; i++) {
    const u = i / (SR * len);
    const fc = 300 + 5000 * (dir > 0 ? u * u : (1 - u) * (1 - u));
    const k = TAU * fc / SR * 1.2;
    s1 += k * (rnd() - s1 - 0.4 * s2); s2 += k * s1; // crude state-variable filter
    const env = Math.sin(Math.PI * Math.pow(u, dir > 0 ? 1.8 : 0.6)) * amp;
    const [a, b] = pan(s1 * env * 0.7, (u - 0.5) * 1.4 * dir);
    put(Math.round(t0 * SR) + i, a, b, 0.3);
  }
}
function riser(t0, t1, amp) {
  let s1 = 0, s2 = 0, ph = 0;
  const len = t1 - t0;
  for (let i = 0; i < SR * len; i++) {
    const u = i / (SR * len);
    const fc = 200 + 7000 * u * u * u;
    const k = Math.min(1.2, TAU * fc / SR * 1.2);
    s1 += k * (rnd() - s1 - 0.5 * s2); s2 += k * s1;
    ph += TAU * (180 + 900 * u * u) / SR;
    const env = Math.pow(u, 2.2) * amp;
    const x = (s1 * 0.6 + Math.sin(ph) * 0.12 * u) * env;
    put(Math.round(t0 * SR) + i, x, x, 0.4);
  }
}
function blip(t0, f, amp = 0.12, p = 0) {
  for (let i = 0; i < SR * 0.09; i++) {
    const t = i / SR;
    const x = (Math.sin(TAU * f * t) + 0.3 * Math.sin(TAU * f * 2.01 * t)) * Math.exp(-t * 55) * amp;
    const [a, b] = pan(x, p);
    put(Math.round(t0 * SR) + i, a, b, 0.2);
  }
}
function bell(t0, f, amp, p) {
  for (let i = 0; i < SR * 2.2; i++) {
    const t = i / SR;
    const x = (Math.sin(TAU * f * t) + 0.4 * Math.sin(TAU * f * 2 * t) * Math.exp(-t * 3) + 0.2 * Math.sin(TAU * f * 3.01 * t) * Math.exp(-t * 6)) * Math.exp(-t * 2) * amp * Math.min(1, t * 400);
    const [a, b] = pan(x, p);
    put(Math.round(t0 * SR) + i, a, b, 0.6);
  }
}

// harmony
const NOTE = { F1: 43.65, Ab1: 51.91, Db2: 69.3, Eb2: 77.78, F2: 87.31, Ab2: 103.83, C3: 130.81, Db3: 138.59, Eb3: 155.56, F3: 174.61, G3: 196, Ab3: 207.65, Bb3: 233.08, C4: 261.63 };
const CHORDS = [
  [0.0, 1.5, 'F1', ['F3', 'C4']],
  [1.5, 3.5, 'F1', ['F3', 'Ab3', 'C4']],
  [3.5, 6.0, 'Db2', ['Db3', 'F3', 'Ab3']],
  [6.0, 7.5, 'Ab1', ['Ab2', 'C3', 'Eb3']],
  [7.5, 9.0, 'Eb2', ['Eb3', 'G3', 'Bb3']],
  [9.0, 10.25, 'F1', ['F3', 'Ab3', 'C4']],
  [10.25, 11.5, 'Db2', ['Db3', 'F3', 'Ab3']],
  [11.5, 13.25, 'Eb2', ['Eb3', 'G3', 'Bb3']],
  [13.25, 15.0, 'F1', ['F3', 'Ab3', 'C4']],
];
// pad: detuned saws, filter opens across the piece, ducked by the kick
{
  const phases = new Map();
  let lpL = 0, lpR = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const ch = CHORDS.find(c => t >= c[0] && t < c[1]) || CHORDS[CHORDS.length - 1];
    let sl = 0, sr = 0;
    ch[3].forEach((nm, ni) => {
      [-1, 0, 1].forEach(d => {
        const key = ni * 3 + d + 1;
        const f = NOTE[nm] * Math.pow(2, (d * 8) / 1200);
        const ph = ((phases.get(key) || 0) + f / SR) % 1;
        phases.set(key, ph);
        const v = 2 * ph - 1;
        if (d <= 0) sl += v; if (d >= 0) sr += v;
      });
    });
    const cut = 350 + 2200 * Math.min(1, t / 13) * (t > 13.25 ? 0.7 : 1) + 600 * Math.sin(t * 1.3) * (t > 1.5 ? 1 : 0);
    const a = 1 - Math.exp(-TAU * cut / SR);
    lpL += a * (sl - lpL); lpR += a * (sr - lpR);
    const env = Math.min(1, t / 1.2) * (t > 14.0 ? Math.max(0, 1 - (t - 14.0) / 1.0) * 0.6 + 0.4 * Math.exp(-(t - 14) * 1.2) : 1);
    const g = 0.045 * env * duck(t);
    put(i, lpL * g, lpR * g, 0.35);
  }
}
// bass: offbeat plucks, saw+sine through a decaying filter
for (let b = 1.5; b < 13.2; b += 0.5) {
  if (b >= 8.5 && b < 9.0) continue;
  for (const off of [0.25, 0.375]) {
    const t0 = b + off;
    const ch = CHORDS.find(c => t0 >= c[0] && t0 < c[1]);
    const f = NOTE[ch[2]] * 2 * (off === 0.375 ? 1 : 1);
    let ph = 0, lp = 0;
    for (let i = 0; i < SR * 0.12; i++) {
      const t = i / SR;
      ph = (ph + f / SR) % 1;
      const x = (2 * ph - 1) * 0.6 + Math.sin(TAU * ph) * 0.8;
      const a = 1 - Math.exp(-TAU * (180 + 2400 * Math.exp(-t * 30)) / SR);
      lp += a * (x - lp);
      const v = lp * Math.min(1, t * 800) * Math.exp(-t * 14) * (off === 0.25 ? 0.34 : 0.22);
      put(Math.round(t0 * SR) + i, v, v);
    }
  }
}

// drums
kicks.forEach(k => kick(k, HITS.includes(k) ? 1.1 : 0.95));
for (let t = 2.0; t < 13.2; t += 1.0) if (!(t >= 8.5 && t < 9.0)) clap(t, 0.55);
for (let t = 1.5; t < 13.2; t += 0.125) {
  if (t >= 8.5 && t < 9.0) continue;
  const step = Math.round((t - 1.5) / 0.125) % 4;
  if (t < 3.5) { if (step === 2) hat(t, true, 0.09, 0.3); continue; }
  hat(t, step === 2, step === 2 ? 0.1 : step === 0 ? 0.05 : 0.035, step % 2 ? -0.35 : 0.35);
}
// build-up snare roll into the outro
for (let t = 12.25; t < 13.25; t += 0.0625) { const u = (t - 12.25); clap(t, 0.12 + 0.35 * u); }

// intro
blip(0.05, 880, 0.22); blip(0.05, 1760, 0.08);
whoosh(0.3, 0.7, 0.35, 1);
for (let k = 0; k < 12; k++) blip(0.5 + k * 0.045, 2400 + k * 90, 0.035, (k % 2 ? 1 : -1) * 0.6);
riser(0.55, 1.5, 0.55);

// impacts
HITS.forEach((h, i) => { boom(h, i === 0 || i === 5 ? 1.0 : 0.7); crash(h, i === 0 || i === 5 ? 1.0 : 0.55); });
// transitions
whoosh(3.2, 0.45, 0.45, 1);
riser(5.1, 6.0, 0.35);
whoosh(8.5, 0.5, 0.5, 1);
riser(8.2, 9.0, 0.5);
whoosh(10.95, 0.55, 0.4, -1);
[11.5, 11.94, 12.38, 12.82].forEach((s, i) => whoosh(s - 0.04, 0.28, 0.4, i % 2 ? -1 : 1));
riser(12.3, 13.25, 0.7);

// UI sound design
[3.95, 4.2, 4.42].forEach((s, i) => blip(s, 1500 + i * 300, 0.12, 0.2 * i));
[4.75, 4.85, 4.89, 4.95, 4.99, 5.03, 5.05, 5.1].forEach((s, i) => blip(s, 1800 + (i % 3) * 400, 0.06, (i % 2 ? 1 : -1) * 0.5));
[6.15, 6.37, 6.59, 6.81].forEach((s, i) => { blip(s, 1046.5 * Math.pow(2, i / 6), 0.12, [-0.6, 0.6, -0.6, 0.6][i]); });
for (let k = 0; k < 13; k++) blip(9.05 + k * 0.05, 2200 + (k % 4) * 250, 0.045, Math.sin(k * 1.7) * 0.8);
for (let k = 0; k < 25; k += 2) blip(14.0 + k * 0.018, 3000, 0.035, 0.2);

// outro bells
[[13.4, 698.46], [13.55, 830.61], [13.7, 1046.5], [13.85, 1396.9]].forEach(([s, f], i) => bell(s, f, 0.06, [-0.5, 0.5, -0.2, 0.3][i]));

// reverb (Schroeder: parallel combs → series allpasses)
function reverb(inp, combs, aps, fb = 0.8, damp = 0.35) {
  const out = new Float32Array(N);
  for (const c of combs) {
    const buf = new Float32Array(c); let idx = 0, f = 0;
    for (let i = 0; i < N; i++) { const y = buf[idx]; f = y * (1 - damp) + f * damp; buf[idx] = inp[i] + f * fb; idx = (idx + 1) % c; out[i] += y / combs.length; }
  }
  for (const a of aps) {
    const buf = new Float32Array(a); let idx = 0;
    for (let i = 0; i < N; i++) { const b = buf[idx], x = out[i]; const y = -x + b; buf[idx] = x + b * 0.5; idx = (idx + 1) % a; out[i] = y; }
  }
  return out;
}
const rvL = reverb(sendL, [1557, 1617, 1491, 1422, 1277, 1356], [225, 556, 441]);
const rvR = reverb(sendR, [1580, 1640, 1514, 1445, 1300, 1379], [248, 579, 464]);
for (let i = 0; i < N; i++) { L[i] += rvL[i] * 0.9; R[i] += rvR[i] * 0.9; }

// master: gentle glue + limiter + normalize
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = Math.min(1, t / 0.02) * (t > 14.6 ? Math.max(0, (15 - t) / 0.4) : 1);
  L[i] = Math.tanh(L[i] * 1.4) * fade; R[i] = Math.tanh(R[i] * 1.4) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const g = 0.89 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
}
fs.writeFileSync(new URL('./audio.wav', import.meta.url), buf);
console.log('audio.wav written, peak pre-norm', peak.toFixed(3));
