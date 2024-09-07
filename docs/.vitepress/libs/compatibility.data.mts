import { resolve } from 'path';
import functions from './functions.json';
import { readdirSync } from 'fs';

export default {
  load() {
    const categories = Object.keys(functions);
    const status = Object.fromEntries(
      Object.values(functions)
        .flat()
        .map((fn: string) => [fn, '❌'])
    );

    const srcDirname = resolve(import.meta.dirname, '../../../src');
    const excludeDirnames = ['_internal'];

    const dirnames = [srcDirname];

    while (dirnames.length) {
      const curDirname = dirnames.pop() as string;
      const files = readdirSync(curDirname, { withFileTypes: true });

      // For searching subdirectories
      dirnames.push(
        ...files
          .filter(dirent => dirent.isDirectory() && !excludeDirnames.some(exclude => dirent.name === exclude))
          .map(dirent => resolve(curDirname, dirent.name))
      );

      const functions = files
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.spec.ts'))
        .map(dirent => dirent.name.replace('.spec.ts', ''));

      for (const fn of functions) {
        if (curDirname.includes('/compat/')) {
          status[fn] = '✅';
        } else if (status[fn] === '❌') {
          status[fn] = '📝';
        }
      }
    }

    const noSupports = [
      'sortedIndex',
      'sortedIndexBy',
      'sortedIndexOf',
      'sortedLastIndex',
      'sortedLastIndexBy',
      'sortedLastIndexOf',
      'sortedUniq',
      'sortedUniqBy',
      'mixin',
      'noConflict',
      'runInContext',
    ];

    for (const fn of noSupports) {
      status[fn] = 'No support';
    }

    return Object.fromEntries(
      categories.map(category => {
        return [
          category,
          functions[category].map((fn: string) => ({
            name: fn,
            status: status[fn],
          })),
        ];
      })
    );
  },
};
