import { copyFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const MAX_BYTES = 1_048_576;
const MIN_BYTES = 1_000;

function guard(size: number): void {
  if (size > MAX_BYTES) throw new Error(`entry.png over the 1 MiB limit: ${size} bytes`);
  if (size < MIN_BYTES) throw new Error(`entry.png implausibly small: ${size} bytes`);
}

function main(): void {
  const { size } = statSync(join(BOT_DIR, 'entry.png'));
  guard(size);
  copyFileSync(join(BOT_DIR, 'entry.png'), join(OUTPUT_DIR, 'entry.png'));
  console.log(`entry.png ${size} bytes 1024x1024`);
}

main();
