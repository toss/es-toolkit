export interface Benchmark {
  group: string;
  name: string;
  fn: () => unknown;
}

export const benchmarks: Benchmark[] = [];

let currentGroup = '';

export function group(name: string, register: () => void): void {
  const parent = currentGroup;
  currentGroup = name;
  if (parent !== '') {
    currentGroup = `${parent} > ${name}`;
  }

  try {
    register();
  } finally {
    currentGroup = parent;
  }
}

export function bench(name: string, fn: () => unknown): void {
  benchmarks.push({ group: currentGroup, name, fn });
}
