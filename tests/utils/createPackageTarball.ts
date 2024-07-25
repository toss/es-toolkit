import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { execa } from 'execa';

export async function createPackageTarball() {
  const tmpdir = path.resolve(os.tmpdir(), '.es-toolkit');
  const tarballPath = path.resolve(tmpdir, 'package.tgz');

  await fs.promises.mkdir(tmpdir, { recursive: true });

  await execa('yarn', ['pack', '--out', tarballPath]);

  return {
    path: tarballPath,
  }
}