import { partial } from './function/partial.ts';
import { partialRight } from './function/partialRight.ts';

export function toolkit(value: any) {
  return value;
}

toolkit.partial = partial;
toolkit.partialRight = partialRight;

partial.placeholder = toolkit;
partialRight.placeholder = toolkit;
