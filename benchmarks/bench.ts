import { Bench, type Options } from 'tinybench';

let benchContext: Bench;

export async function describe(name: string, fn: () => void, options: Options = { time: 500 }): Promise<void> {
  const currentBench = new Bench(options);
  benchContext = currentBench;

  fn();

  await currentBench.warmup();
  await currentBench.run();

  console.log(`\n${name}`);
  console.table(currentBench.table());
}

export function bench(name: string, fn: () => void): void {
  benchContext.add(name, fn);
}
