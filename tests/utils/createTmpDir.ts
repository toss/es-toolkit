import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export async function createTmpDir() {
  const tmpdir = path.resolve(os.tmpdir(), '.es-toolkit', randomUUID());
  await fs.promises.mkdir(tmpdir, { recursive: true });

  return tmpdir;
}