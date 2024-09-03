import { readdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

export async function getFunctions(category: string): Promise<Array<{ name: string; path: string }>> {
  const dirname = import.meta.dirname;
  const splitedDirname = dirname.split(sep);
  const projectDirname = splitedDirname.slice(0, splitedDirname.lastIndexOf('docs')).join(sep);
  const srcDirname = resolve(projectDirname, 'src', category);

  const excludes = ['.spec.ts', 'index.ts', '_internal'];
  const files = await readdir(srcDirname);
  const filteredFiles = files.filter(file => !excludes.some(exclude => file.includes(exclude)));

  return filteredFiles.map(file => ({ name: file.replace('.ts', ''), path: resolve(srcDirname, file) }));
}
