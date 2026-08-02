import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceDirectory = path.join(projectRoot, "public", "series5", "comic");
const releaseDirectory = path.join(projectRoot, "release");
const archiveName = "GonggongAX-Series5-Beginner-Comic.zip";
const archivePath = path.join(releaseDirectory, archiveName);
const checksumPath = `${archivePath}.sha256`;
const archiveRoot = "gonggong-ax-local-5-series5-comic";
const expectedFiles = [
  "README.md",
  "ALT_TEXT_KO.md",
  "PROMPTS.md",
  "ASSET_PROVENANCE.md",
  "THREADS_POST_KO.md",
  "series5-comic-01.png",
  "series5-comic-02.png",
  "series5-comic-03.png",
  "series5-comic-04.png",
  "series5-comic-05.png",
];

function assertSquarePng(bytes, name) {
  const signature = bytes.subarray(0, 8).toString("hex");
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (signature !== "89504e470d0a1a0a" || width !== 1536 || height !== 1536) {
    throw new Error(`${name} must be a 1536 x 1536 PNG.`);
  }
}

await mkdir(releaseDirectory, { recursive: true });
const zip = new JSZip();
for (const name of expectedFiles) {
  const bytes = await readFile(path.join(sourceDirectory, name));
  if (name.endsWith(".png")) assertSquarePng(bytes, name);
  zip.file(`${archiveRoot}/${name}`, bytes, { binary: true });
}

const archive = await zip.generateAsync({
  type: "nodebuffer",
  compression: "DEFLATE",
  compressionOptions: { level: 6 },
});
await writeFile(archivePath, archive);
const digest = createHash("sha256").update(archive).digest("hex");
await writeFile(checksumPath, `${digest} *${archiveName}\n`, "utf8");

console.log(`Series 5 comic ZIP: ${archivePath}`);
console.log(`SHA-256: ${checksumPath}`);
