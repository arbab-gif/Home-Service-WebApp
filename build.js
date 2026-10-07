// Static build for Vercel: copies the pages and assets to dist/, gives fragment pages a
// proper document shell (same as server.js) and makes the dashboard the index page.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');
const HOME = 'home-dashboard.html';

function wrap(html) {
  if (/^\s*<!doctype/i.test(html)) return html;
  return '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
    '<meta name="color-scheme" content="light">' +
    '</head><body>' + html + '</body></html>';
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
fs.cpSync(path.join(ROOT, 'assets'), path.join(OUT, 'assets'), { recursive: true });
for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
  const html = wrap(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  fs.writeFileSync(path.join(OUT, f), html);
  if (f === HOME) fs.writeFileSync(path.join(OUT, 'index.html'), html);
}
console.log('Built', fs.readdirSync(OUT).length, 'entries into dist/');
