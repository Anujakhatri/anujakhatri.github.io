/**
 * renders page 1 of each pdf as a PNG into public/certificates/thumbnails/
 *
 * Run with: npm run build:thumbs
 */

import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pdf } from "pdf-to-img";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CERTS_DIR = resolve(__dirname, "..", "public", "certificates");
const THUMBS_DIR = join(CERTS_DIR, "thumbnails");


const SCALE = 0.75;

function toThumbStem(pdfFilename) {
  const stem = basename(pdfFilename, ".pdf").replace(/^Anuja_/, "");
  return stem
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/-certificate$/, "");
}

async function main() {
  await mkdir(THUMBS_DIR, { recursive: true });

  const entries = await readdir(CERTS_DIR);
  const pdfs = entries.filter((f) => f.toLowerCase().endsWith(".pdf"));

  if (pdfs.length === 0) {
    console.log("No PDFs found in public/certificates/ — nothing to do.");
    return;
  }

  for (const pdfFile of pdfs) {
    const inputPath = join(CERTS_DIR, pdfFile);
    const thumbName = `${toThumbStem(pdfFile)}-thumb.png`;
    const outputPath = join(THUMBS_DIR, thumbName);

    console.log(`→ ${pdfFile}  →  ${thumbName}`);

    const doc = await pdf(inputPath, { scale: SCALE });
    try {
      // getPage(1) renders page 1 as a PNG buffer at the requested scale.
      const pageBuffer = await doc.getPage(1);
      await writeFile(outputPath, pageBuffer);
    } finally {
      await doc.destroy();
    }
  }

  console.log(
    `\nDone. ${pdfs.length} thumbnail(s) written to public/certificates/thumbnails/`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});