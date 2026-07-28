import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Sailvage site shell and primary sections", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /data-ark-theme="ark"/i);
  assert.match(html, /data-ark-depth="complex"/i);
  assert.match(html, /<title>波下乐土 Sailvage \| Studio EmpteX<\/title>/i);
  assert.match(html, /<main class="site-shell locale-zh"/i);
  assert.match(html, /<nav aria-label="主导航"/i);
  assert.match(html, /<section class="hero" id="home"/i);
  assert.match(html, /<section class="pv-section section-pad" id="pv"/i);
  assert.match(html, /<video[^>]*controls/i);
  assert.match(html, /\/assets\/videos\/sailvage-pv\.mp4/i);
  assert.match(html, /<section class="features section-pad" id="features"/i);
  assert.match(html, /<section class="characters section-pad" id="characters"/i);
  assert.match(html, /<section class="contact" id="contact"/i);
  assert.match(html, /class="character-file"/i);
  assert.match(html, /aria-label="角色选择"/i);
  assert.doesNotMatch(html, /codex-preview|sites-skeleton/i);
});

test("server-renders the complete English route and language switch", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Sailvage \| Studio EmpteX<\/title>/i);
  assert.match(html, /<main class="site-shell locale-en" lang="en"/i);
  assert.match(html, /<nav aria-label="Primary navigation"/i);
  assert.match(html, />GAMEPLAY<\/a>/i);
  assert.match(html, />CHARACTERS<\/a>/i);
  assert.match(html, /Beneath sunlit waves, everyone&#x27;s secrets begin to surface\./i);
  assert.match(html, /OPERATIONS DIVISION \/ B-RANK AGENT/i);
  assert.match(html, /href="\/" hrefLang="zh-CN"/i);
});

test("keeps the Ark polish responsive and accessible", async () => {
  const [css, page, layout] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/sailvage-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(css, /--ark-ink:/);
  assert.match(css, /--ark-paper:/);
  assert.match(css, /--ark-signal:/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:\s*1240px\)/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /\.character-file\s*\{/);
  assert.doesNotMatch(css, /\.character-tabs button::after/);

  assert.match(page, /aria-pressed=\{isActive\}/);
  assert.match(page, /onFocus=\{\(\) => setHoveredCharacterIndex\(index\)\}/);
  assert.match(page, /onPointerEnter=\{\(\) => setHoveredCharacterIndex\(index\)\}/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);

  assert.match(layout, /data-ark-theme="ark"/);
  assert.match(layout, /data-ark-depth="complex"/);
});
