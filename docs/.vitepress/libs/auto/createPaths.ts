import { readFileSync } from 'node:fs';
import { getFunctions } from './model/getFunctions';
import { template } from './view/template';
import { getFunctionInfo } from './model/getFunctionInfo';

export async function createPaths(category: string) {
  const functions = await getFunctions(category);

  return functions.map(({ name, path }) => {
    const source = readFileSync(path, 'utf-8');

    return {
      params: { function: name },
      content: template(name, getFunctionInfo(source)),
    };
  });
}
