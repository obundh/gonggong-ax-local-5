import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "examples");
const outputPath = path.join(outputDirectory, "series5-resource-example.epub");
const fixedDate = new Date("2026-07-31T00:00:00.000Z");

function makeToneWav() {
  const sampleRate = 8_000;
  const seconds = 0.8;
  const sampleCount = Math.floor(sampleRate * seconds);
  const dataSize = sampleCount * 2;
  const wav = Buffer.alloc(44 + dataSize);

  wav.write("RIFF", 0, "ascii");
  wav.writeUInt32LE(36 + dataSize, 4);
  wav.write("WAVE", 8, "ascii");
  wav.write("fmt ", 12, "ascii");
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36, "ascii");
  wav.writeUInt32LE(dataSize, 40);

  for (let index = 0; index < sampleCount; index += 1) {
    const fade = Math.min(1, index / 300, (sampleCount - index) / 300);
    const sample = Math.sin((2 * Math.PI * 440 * index) / sampleRate) * 0.18 * fade;
    wav.writeInt16LE(Math.round(sample * 32767), 44 + index * 2);
  }

  return wav;
}

const zip = new JSZip();
const addText = (name, value) =>
  zip.file(name, value.trimStart(), { date: fixedDate, compression: "DEFLATE" });

zip.file("mimetype", "application/epub+zip", {
  date: fixedDate,
  compression: "STORE",
});

addText(
  "META-INF/container.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
);

addText(
  "OEBPS/package.opf",
  `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="book-id">urn:uuid:series5-resource-example</dc:identifier>
    <dc:title>공공 AX 로컬 5 리소스 추출 예제</dc:title>
    <dc:language>ko</dc:language>
    <meta property="dcterms:modified">2026-07-31T00:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="chapter" href="chapter1.xhtml" media-type="application/xhtml+xml"/>
    <item id="cover" href="images/cover.png" media-type="image/png" properties="cover-image"/>
    <item id="map" href="images/resource-map.svg" media-type="image/svg+xml"/>
    <item id="audio" href="audio/notice.wav" media-type="audio/wav"/>
    <item id="style" href="styles/book.css" media-type="text/css"/>
    <item id="attachment" href="attachments/checklist.txt" media-type="text/plain"/>
    <item id="script" href="scripts/classification-example.js" media-type="text/javascript"/>
  </manifest>
  <spine>
    <itemref idref="chapter"/>
  </spine>
</package>`,
);

addText(
  "OEBPS/nav.xhtml",
  `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="ko">
  <head><title>목차</title></head>
  <body><nav epub:type="toc"><ol><li><a href="chapter1.xhtml">예제 안내</a></li></ol></nav></body>
</html>`,
);

addText(
  "OEBPS/chapter1.xhtml",
  `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
  <head>
    <title>리소스 추출 예제</title>
    <link rel="stylesheet" href="styles/book.css"/>
  </head>
  <body>
    <h1>공공 AX 로컬 5 리소스 추출 예제</h1>
    <img src="images/cover.png" alt="문서 리소스 추출기 소개"/>
    <img src="images/resource-map.svg" alt="예제 리소스 구성도"/>
    <audio controls="controls" src="audio/notice.wav">오디오 예제</audio>
    <p><a href="attachments/checklist.txt">확인 목록</a></p>
  </body>
</html>`,
);

addText(
  "OEBPS/styles/book.css",
  `body { font-family: sans-serif; line-height: 1.6; margin: 2rem; }
h1 { color: #173f35; }
img { display: block; height: auto; margin: 1rem 0; max-width: 100%; }`,
);

addText(
  "OEBPS/images/resource-map.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" rx="36" fill="#f6f3ea"/>
  <text x="480" y="92" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="700" fill="#173f35">예제 리소스 구성</text>
  <g font-family="sans-serif" font-size="30" font-weight="700" text-anchor="middle">
    <rect x="70" y="170" width="230" height="150" rx="24" fill="#c8f06c"/><text x="185" y="255" fill="#173f35">이미지</text>
    <rect x="365" y="170" width="230" height="150" rx="24" fill="#efcf69"/><text x="480" y="255" fill="#3d3418">오디오</text>
    <rect x="660" y="170" width="230" height="150" rx="24" fill="#dce7e1"/><text x="775" y="255" fill="#173f35">첨부 파일</text>
  </g>
  <text x="480" y="430" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#4a5d56">분류 결과는 사람이 최종 확인</text>
</svg>`,
);

addText(
  "OEBPS/attachments/checklist.txt",
  `공공 AX 로컬 5 예제 확인 목록

1. 이미지 미리보기 확인
2. 오디오 분류 확인
3. 첨부 파일과 서식 분류 확인
4. 원본 파일이 변경되지 않았는지 확인
5. 추출 결과를 사람이 최종 확인`,
);

addText(
  "OEBPS/scripts/classification-example.js",
  `// 분류 화면 확인용 비실행 예제입니다.
// 문서 리소스 추출기는 이 파일을 실행하지 않고 "스크립트·매크로"로만 분류합니다.`,
);

zip.file(
  "OEBPS/images/cover.png",
  await readFile(path.join(projectRoot, "public", "series5-og.png")),
  { date: fixedDate, compression: "DEFLATE" },
);
zip.file("OEBPS/audio/notice.wav", makeToneWav(), {
  date: fixedDate,
  compression: "DEFLATE",
});

for (const entry of Object.values(zip.files)) entry.date = fixedDate;

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  outputPath,
  await zip.generateAsync({
    type: "nodebuffer",
    platform: "DOS",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  }),
);

console.log(outputPath);
