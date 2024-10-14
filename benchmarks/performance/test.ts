import { chunk as chunkToolkit } from 'es-toolkit';
import { chunk as chunkToolkitCompat } from 'es-toolkit/compat';
import { chunk as chunkLodash } from 'lodash-es';
import { Bench } from 'tinybench';

const bench = new Bench({ time: 500 });

bench
  .add('lodash', () => {
    chunkLodash([1, 2, 3, 4, 5, 6], 3);
  })
  .add('toolkit', () => {
    chunkToolkit([1, 2, 3, 4, 5, 6], 3);
  })
  .add('toolkit compat', () => {
    chunkToolkitCompat([1, 2, 3, 4, 5, 6], 3);
  });

await bench.warmup();
await bench.run();

console.table(bench.table());
