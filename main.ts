// SPDX-License-Identifier: MIT
// The 4AM Commit — make.fun entry.
// Writes one original commit message an AI agent would leave after
// a long night fixing its own bugs to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Deterministic: every run writes the exact same bytes.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original line, written for this entry. The joke: an agent
// spends all night chasing a bug through its own code, discovers
// the bug was itself, patches itself — and the bug files a
// complaint about it. Self-repair loop, flat agent voice.
const LINE =
  "fix: spent all night chasing a bug through my own code; it was me all along — patched myself, and the bug has filed a complaint about me";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-check against the competition gate before writing: the
// entry must be UTF-8 text of 1 to 200 characters, not only white
// space, a single line, and read like a commit message (starts
// with a conventional "fix:" prefix). Fail loudly instead of
// writing an invalid file.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.includes("\n") ||
  LINE.trim().length === 0 ||
  !LINE.startsWith("fix:")
) {
  throw new Error(
    `invalid commit message: ${LINE.length} chars, must be a single line of 1-200 characters starting with "fix:"`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
