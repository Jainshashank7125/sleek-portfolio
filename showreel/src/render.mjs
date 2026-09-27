// usage: node render.mjs stills 0.5,2.4,...   |   node render.mjs video out.mp4 [sub] [workers]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const dir = path.dirname(new URL(import.meta.url).pathname);
const exe = path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.ttf': 'font/ttf' };
const server = http.createServer((req, res) => {
  const f = path.join(dir, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const url = `http://127.0.0.1:${server.address().port}/index.html?render`;

const browser = await chromium.launch({ executablePath: fs.existsSync(exe) ? exe : undefined });
async function newPage() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.error('PAGE ERROR', e.message));
  page.on('console', m => m.type() === 'error' && console.error('console:', m.text()));
  await page.goto(url);
  await page.waitForFunction(() => window.reelReady === true);
  return page;
}

const [mode, arg, subArg, workersArg] = process.argv.slice(2);
if (mode === 'stills') {
  const page = await newPage();
  fs.mkdirSync(path.join(dir, 'stills'), { recursive: true });
  for (const ts of arg.split(',')) {
    const b64 = await page.evaluate(([t]) => window.renderFrameB64(Math.round(t * 60), 4), [Number(ts)]);
    fs.writeFileSync(path.join(dir, 'stills', `t${Number(ts).toFixed(2)}.png`), Buffer.from(b64, 'base64'));
  }
} else {
  const FRAMES = 900, SUB = Number(subArg || 8), WORKERS = Number(workersArg || 4);
  const framesDir = path.join(dir, 'frames');
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir);
  const t0 = Date.now();
  let done = 0;
  await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
    const page = await newPage();
    for (let f = w; f < FRAMES; f += WORKERS) {
      const b64 = await page.evaluate(([f, s]) => window.renderFrameB64(f, s), [f, SUB]);
      fs.writeFileSync(path.join(framesDir, `f${String(f).padStart(4, '0')}.png`), Buffer.from(b64, 'base64'));
      if (++done % 60 === 0) console.log(`${done}/${FRAMES}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    }
  }));
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '60', '-i', path.join(framesDir, 'f%04d.png'),
    '-i', path.join(dir, 'audio.wav'),
    '-vf', 'vignette=angle=PI/4.5,format=yuv420p,noise=alls=3:allf=t',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-tune', 'film', '-profile:v', 'high',
    '-af', 'loudnorm=I=-14:TP=-1:LRA=9', '-ar', '48000', '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', arg], { stdio: 'inherit' });
  await new Promise(r => ff.on('close', r));
  console.log('done', arg);
}
await browser.close();
server.close();
