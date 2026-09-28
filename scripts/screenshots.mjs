// Captures prototype screens at phone size and lays them out as a 5 × 6 grid.
// Usage: npm run screenshots   (needs Google Chrome installed)
// Output: docs/screenshots/<id>.png (2x) and docs/screenshots/grid.png

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import { preview } from "vite";

const OUT = new URL("../docs/screenshots/", import.meta.url);
const PORT = 4174;
const BASE = `http://localhost:${PORT}/prototype`;
const COLUMNS = 5;

const tap = (page, name) =>
  page.getByRole("button", { name }).or(page.getByRole("link", { name })).first().click();

async function checkExampleMessage(page) {
  await page.goto(`${BASE}/check/message`);
  await tap(page, "Use an example");
  await tap(page, "Continue");
}

// Ordered row by row. Each shot starts from `path`, then runs optional `steps`.
const shots = [
  { id: "S01", label: "Welcome", path: "/onboarding/1" },
  { id: "S02", label: "What TrustCheck does", path: "/onboarding/2" },
  { id: "S03", label: "Trust & limits", path: "/onboarding/3" },
  { id: "S04", label: "Accessibility setup", path: "/onboarding/4" },
  { id: "S05", label: "Home", path: "/home" },

  { id: "S06", label: "What should I check?", path: "/check/helper" },
  { id: "S07", label: "Message input", path: "/check/message", steps: (p) => tap(p, "Use an example") },
  { id: "S08", label: "Message review", steps: checkExampleMessage },
  {
    id: "S09",
    label: "Checking message",
    steps: async (p) => {
      await checkExampleMessage(p);
      await tap(p, "Check this message");
      await p.waitForTimeout(1100);
    },
  },
  {
    id: "S10",
    label: "Result — High Risk",
    steps: async (p) => {
      await checkExampleMessage(p);
      await tap(p, "Check this message");
      await p.waitForURL(/\/result\//);
    },
  },

  { id: "S11", label: "Warning sign detail", path: "/result/fake-bank-text/finding/suspicious-link" },
  { id: "S12", label: "What should I do?", path: "/result/fake-bank-text/next-steps" },
  { id: "S13", label: "Link input", path: "/check/link", steps: (p) => tap(p, "Use an example") },
  {
    id: "S14",
    label: "Link review",
    path: "/check/link",
    steps: async (p) => {
      await tap(p, "Use an example");
      await tap(p, "Continue");
    },
  },
  { id: "S16", label: "Result — Needs Caution", path: "/result/lookalike-link" },

  { id: "S17", label: "Domain explanation", path: "/result/lookalike-link/domain" },
  { id: "S18", label: "Find the real website", path: "/result/lookalike-link/verify" },
  { id: "S19", label: "QR scanner", path: "/check/qr" },
  { id: "S20", label: "QR destination revealed", path: "/check/qr", steps: (p) => tap(p, "Simulate a scan") },
  { id: "S23", label: "Why QR codes hide destinations", path: "/result/qr-parking-scam/qr-explained" },

  { id: "S24", label: "Screenshot source", path: "/check/screenshot" },
  {
    id: "S25",
    label: "Screenshot preview",
    path: "/check/screenshot",
    steps: (p) => tap(p, "Upload a screenshot"),
  },
  { id: "S28", label: "Marked screenshot", path: "/result/screenshot-delivery/highlights" },
  {
    id: "E-03",
    label: "Error — unreadable picture",
    path: "/check/screenshot",
    steps: async (p) => {
      await tap(p, "Use a blurry example");
      await tap(p, "Check this picture");
      await p.waitForURL(/unreadable/);
    },
  },
  {
    id: "E-04",
    label: "Error — check not finished",
    path: "/settings",
    steps: async (p) => {
      await p.getByRole("switch", { name: "Simulate a failed check" }).click();
      await tap(p, "Home");
      await tap(p, "Check a Message");
      await tap(p, "Use an example");
      await tap(p, "Continue");
      await tap(p, "Check this message");
      await p.waitForURL(/unavailable/);
    },
  },

  {
    id: "S29",
    label: "History",
    steps: async (p) => {
      await checkExampleMessage(p);
      await tap(p, "Check this message");
      await p.waitForURL(/\/result\//);
      await tap(p, "Done");
      await tap(p, "History");
    },
  },
  { id: "S31", label: "Learn", path: "/learn" },
  { id: "S32", label: "Lesson — QR code scams", path: "/learn/qr-scams" },
  { id: "S33", label: "Settings", path: "/settings" },
  { id: "S34", label: "Privacy & trust", path: "/privacy" },
];

const slug = (s) => `${s.id}-${s.label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await preview({ preview: { port: PORT, strictPort: true } });
  const browser = await chromium.launch({ channel: "chrome" });

  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });

    const files = [];
    for (const shot of shots) {
      const page = await context.newPage();
      await page.goto(`${BASE}${shot.path ?? "/home"}`);
      if (shot.steps) await shot.steps(page);
      await page.waitForLoadState("networkidle");
      const file = new URL(`${slug(shot)}.png`, OUT);
      await page.screenshot({ path: file.pathname });
      await page.close();
      files.push({ ...shot, file });
      console.log(`✓ ${shot.id} ${shot.label}`);
    }

    // Lay the captures out in a grid and screenshot that page.
    const tiles = await Promise.all(
      files.map(async (f) => ({ ...f, data: (await readFile(f.file)).toString("base64") })),
    );
    const grid = await browser.newPage({ deviceScaleFactor: 1, viewport: { width: 2200, height: 800 } });
    await grid.setContent(gridHtml(tiles));
    await grid.screenshot({ path: new URL("grid.png", OUT).pathname, fullPage: true });
    console.log(`\nWrote ${files.length} screens + grid.png to docs/screenshots/`);
  } finally {
    await browser.close();
    await server.close();
  }
}

function gridHtml(tiles) {
  const cells = tiles
    .map(
      (t) => `<figure>
        <img src="data:image/png;base64,${t.data}" alt="">
        <figcaption><b>${t.id}</b> ${t.label}</figcaption>
      </figure>`,
    )
    .join("");
  return `<!doctype html><html><head><style>
    body { margin: 0; padding: 56px; background: #e9edf3; font-family: -apple-system, "Segoe UI", sans-serif; color: #16202e; }
    h1 { margin: 0 0 8px; font-size: 40px; }
    p { margin: 0 0 40px; font-size: 20px; color: #4b5768; }
    .grid { display: grid; grid-template-columns: repeat(${COLUMNS}, 390px); gap: 48px 36px; }
    figure { margin: 0; }
    img { display: block; width: 390px; height: 844px; border-radius: 28px; border: 1px solid #c9d1dc; box-shadow: 0 8px 24px rgb(15 23 42 / 0.12); }
    figcaption { margin-top: 14px; font-size: 20px; }
    b { color: #1b4c8f; margin-right: 6px; }
  </style></head><body>
    <h1>TrustCheck prototype screens</h1>
    <p>${tiles.length} screens and states, captured at 390 × 844</p>
    <div class="grid">${cells}</div>
  </body></html>`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
