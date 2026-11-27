// Black Friday Scout — hand-in program (Node 22, standard library only).
//
// This entry is a static site: app/ holds the deal finder (index.html plus its
// own scripts, styles and deal data — no build step, nothing loaded from the
// network), and screenshots/ holds renders of that site in a browser.
//
// This program assembles the submission: it copies app/ and screenshots/ from
// this repository into the output directory and writes dossier.json there,
// using buildDossier from the kit's vendored library
// (vendor/makefun-frontend.ts, copied unchanged from the kit).
//
// The grader runs this in a sandbox where /output is the destination; when run
// anywhere else, MAKEFUN_OUTPUT_DIR takes /output's place:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outputDir, "app"), { recursive: true });

const shotsOut = join(outputDir, "screenshots");
mkdirSync(shotsOut, { recursive: true });
const shotsIn = join(repoRoot, "screenshots");
if (existsSync(shotsIn)) {
  cpSync(shotsIn, shotsOut, { recursive: true });
}

// The dossier must be exactly what the library writes from the copied files,
// with the same limits the gate enforces: at most 4 screenshots of 256 KiB,
// app/ within 993 files and 16 MiB, and the dossier text capped at 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, "dossier.json"), dossier);

// A one-line summary on stdout for the operator; it changes nothing in /output,
// so the two grader runs still write byte-identical files.
console.log(`black-friday-deal-finder-01: wrote app/, screenshots/ and dossier.json to ${outputDir}`);
