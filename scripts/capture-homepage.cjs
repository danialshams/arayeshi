/* Captures pixels from the real running page. No AI redraw. */
const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('node:fs/promises');
const { existsSync } = require('node:fs');
const path = require('node:path');

const prod = process.argv.includes('--production');
const url = process.env.CAPTURE_URL || 'http://127.0.0.1:3000';
const folder = path.join(process.cwd(), 'screenshots');

async function capture() {
  await fs.mkdir(folder, { recursive: true });
  const executablePath = ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium'].find(existsSync);
  const browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
  try {
    // Wait for Vercel to deploy the exact changes before photographing the live domain.
    if (prod) {
      let ready = false;
      for (let attempt = 0; attempt < 50; attempt++) {
        const response = await fetch(url, { cache: 'no-store' }).catch(() => null);
        if (response?.ok && (await response.text()).includes('سه قدم آشنا')) { ready = true; break; }
        await new Promise(resolve => setTimeout(resolve, 6000));
      }
      if (!ready) throw new Error('Production site has not deployed the new sections yet.');
    }
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1, locale: 'fa-IR' });
    await desktop.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await desktop.waitForSelector('.auren-guide', { timeout: 30000 });
    await desktop.evaluate(() => document.fonts.ready);
    const diagnostics = await desktop.evaluate(() => {
      const hero = document.querySelector('.hero');
      return {
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        heroHeight: Math.ceil(hero.getBoundingClientRect().height),
        bubbles: document.querySelectorAll('.auren-real-bubble').length,
        oldBubbles: document.querySelectorAll('.hero-bubble, .section-bubble').length,
        sections: document.querySelectorAll('main section').length,
        images: [...document.images].map(i => ({ src: i.getAttribute('src'), complete: i.complete, width: i.naturalWidth })),
      };
    });
    console.log('Desktop diagnostics:', JSON.stringify(diagnostics));
    if (diagnostics.scrollWidth > diagnostics.width + 2) throw new Error('Horizontal overflow on desktop');
    if (diagnostics.bubbles < 30 || diagnostics.oldBubbles !== 0) throw new Error('Old bubbles present or new bubbles missing');
    if (diagnostics.sections < 6) throw new Error('Some editorial sections are missing');

    // Scroll down to trigger all ScrollTrigger reveals and lazy-loaded images, then back to the top.
    for (let y = 0; y < diagnostics.height; y += 470) {
      await desktop.evaluate(y => window.scrollTo(0,y), y);
      await desktop.waitForTimeout(120);
    }
    await desktop.evaluate(() => window.scrollTo(0, 0));
    await desktop.waitForTimeout(1500);
    await desktop.evaluate(async () => {
      await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
    });
    const loaded = await desktop.evaluate(() => [...document.images].filter(i => i.naturalWidth === 0).map(i => i.getAttribute('src')));
    if (loaded.length) throw new Error('Unloaded desktop images: ' + JSON.stringify(loaded));

    const rawPath = path.join(folder,'auren-homepage-full.png');
    await desktop.screenshot({ path: rawPath, fullPage: true, animations: 'disabled' });

    // A separate Instagram portfolio version: the webpage pixels remain untouched.
    // Only the outer burgundy surround and the square rotate-phone interstitial are added.
    const fullInput = await fs.readFile(rawPath);
    const meta = await sharp(fullInput).metadata();
    const pageWidth = meta.width;
    const siteHeight = meta.height;
    const heroHeight = Math.min(diagnostics.heroHeight, siteHeight - 1);
    const interstitial = pageWidth;
    const margin = 320;
    const paddingTop = 155;
    const paddingBottom = 155;
    const heroPng = await sharp(fullInput).extract({ left: 0, top: 0, width: pageWidth, height: heroHeight }).png().toBuffer();
    const restPng = await sharp(fullInput).extract({ left: 0, top: heroHeight, width: pageWidth, height: siteHeight - heroHeight }).png().toBuffer();

    const insert = await browser.newPage({ viewport:{width:pageWidth,height:interstitial}, deviceScaleFactor:1 });
    await insert.setContent(`<!doctype html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><style>
      * { box-sizing:border-box } body { margin:0; background:radial-gradient(ellipse at 48% 44%,#a31729,#710713 65%,#590710); color:#fff2e9;
      width:100vw; height:100vh; display:grid; place-items:center; }
      .center { text-align:center; display:flex; flex-direction:column; align-items:center; gap:62px; }
      h2 { margin:0; font-family:'Noto Naskh Arabic',Tahoma,Arial,sans-serif; font-weight:700; font-size:85px; line-height:1.5; }
      svg { width:145px; height:145px; fill:none; stroke:#ffe7d8; stroke-width:4; stroke-linecap:round; stroke-linejoin:round; }
    </style></head><body><div class="center"><h2>گوشی را بچرخانید</h2><svg viewBox="0 0 120 120">
      <rect x="37" y="21" width="45" height="77" rx="8"/><path d="M53 28h13"/><circle cx="60" cy="90" r="2"/>
      <path d="M22 44a44 44 0 0 1 15-24M22 44l-1-15M22 44l13-7"/>
      <path d="M100 74a44 44 0 0 1-15 25M100 74l1 15M100 74l-13 7"/>
    </svg></div></body></html>`);
    await insert.evaluate(() => document.fonts.ready);
    const insertPng = await insert.screenshot({ animations:'disabled' });
    const portfolioPath = path.join(folder,'auren-homepage-portfolio.png');
    await sharp({ create: { width:pageWidth + margin*2, height:siteHeight + interstitial + paddingTop + paddingBottom,
      channels:4, background:'#740710' }})
      .composite([
        { input:heroPng, left:margin, top:paddingTop },
        { input:insertPng, left:margin, top:paddingTop+heroHeight },
        { input:restPng, left:margin, top:paddingTop+heroHeight+interstitial },
      ])
      .png({compressionLevel:8}).toFile(portfolioPath);
    await insert.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile:true, hasTouch:true });
    await mobile.goto(url, { waitUntil:'domcontentloaded', timeout:120000 });
    await mobile.waitForSelector('.auren-guide');
    await mobile.evaluate(() => document.fonts.ready);
    const mobileSize = await mobile.evaluate(() => ({w:innerWidth, scrollWidth:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight}));
    console.log('Mobile dimensions:', JSON.stringify(mobileSize));
    if (mobileSize.scrollWidth > mobileSize.w + 2) throw new Error('Horizontal overflow on mobile');
    for(let y = 0; y < mobileSize.height; y += 440) {
      await mobile.evaluate(y=>window.scrollTo(0,y),y);
      await mobile.waitForTimeout(95);
    }
    await mobile.evaluate(()=>window.scrollTo(0,0));
    await mobile.waitForFunction(() => [...document.querySelectorAll('.hero-copy > *')].every(el => Number(getComputedStyle(el).opacity) > .98), null, { timeout: 16000 });
    await mobile.waitForTimeout(350);
    await mobile.screenshot({ path:path.join(folder,'auren-homepage-mobile.png'), fullPage:true, animations:'disabled' });
    await mobile.close();
    await desktop.close();
    console.log('PASS: site captures, sections, images, bubbles and overflow checks');
  } finally { await browser.close(); }
}
capture().catch(e=>{console.error(e);process.exit(1)});
