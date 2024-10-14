import { Bench, type Options } from 'tinybench';

let benchContext: Bench;

export async function describe(name: string, fn: () => void, options: Options = { time: 500 }): Promise<void> {
  benchContext = new Bench(options);

  fn();

  await benchContext.warmup();
  await benchContext.run();

  console.log(`\n${name}`);
  console.table(benchContext.table());
}

export function bench(name: string, fn: () => void): void {
  benchContext.add(name, fn);
}
