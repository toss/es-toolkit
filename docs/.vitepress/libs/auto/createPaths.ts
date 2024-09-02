import { readFileSync } from 'node:fs';
import { getFunctions } from './getFunctions';
import { parse } from './parse';
import { createContent } from './createContent';

export async function createPaths(category: string) {
  const functions = await getFunctions(category);

  return functions.map(({ name, path }) => {
    const source = readFileSync(path, 'utf-8');
    const parsed = parse(source);

    return {
      params: { function: name },
      content: createContent(name, parsed),
    };
  });
}
