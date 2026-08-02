import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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

test("루트에서 문서 리소스 추출기를 렌더링", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ko">/i);
  assert.match(html, /<title>공공 AX 로컬 5 - 문서 리소스 추출기<\/title>/i);
  assert.match(html, /문서 리소스 추출기/);
  assert.match(html, /ZIP 패키지 문서(?:\s|<!-- -->)*33(?:\s|<!-- -->)*종/);
  assert.match(html, /파일 선택/);
  assert.match(html, /파일 끌어놓기/);
  assert.match(html, /지원 문서/);
  assert.match(html, /미지원 문서/);
  assert.match(html, /외부 전송 없음/);
  assert.match(html, /Windows 원클릭/);
  assert.match(html, /gonggong-ax-local-5/);
  assert.match(html, /series5-v0\.1\.0/);
  assert.match(html, /series5-og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("이전 시리즈 경로를 제공하지 않음", async () => {
  for (const path of ["/series2", "/series3", "/series5"]) {
    const response = await render(path);
    assert.equal(response.status, 404, `${path} must not exist`);
  }
});
