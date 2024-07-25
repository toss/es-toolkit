import { cloneDeep } from '../../object/cloneDeep.ts';
import { isMatch } from './isMatch.ts';

export function matches(source: unknown): (target: unknown) => boolean {
  source = cloneDeep(source);

  return (target?: unknown): boolean => {
    return isMatch(target, source);
  };
}
