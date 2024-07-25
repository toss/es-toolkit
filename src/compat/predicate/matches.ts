import { isMatch } from './isMatch';

export function matches(source: unknown): (target: unknown) => boolean {
  source = structuredClone(source);

  return (target?: unknown): boolean => {
    return isMatch(target, source);
  };
}
