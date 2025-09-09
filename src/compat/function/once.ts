import { once as onceToolkit } from '../../function/once.ts';

export function once<T extends (...args: any) => any>(func: T): T {
  return onceToolkit(func);
}
