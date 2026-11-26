// The Painfully Honest Out-of-Office — make.fun entry.
// Writes a single painfully honest (yet polite) out-of-office auto-reply
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm away until Monday, and honestly, the 400 unread emails piling up are the main reason I'm dreading coming back — thank you for your patience.";

// The sealed gate requires 1-200 characters of non-whitespace UTF-8 text.
// Fail loudly instead of ever writing an invalid entry.
const chars = [...REPLY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`Reply is ${chars} characters; the gate requires 1-200.`);
}
if (!/\S/.test(REPLY)) {
  throw new Error("Reply must not be only whitespace.");
}
if ((REPLY.match(/\./g) || []).length !== 1 || !REPLY.endsWith(".")) {
  throw new Error("Reply must be exactly one sentence ending with a period.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(`Wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
