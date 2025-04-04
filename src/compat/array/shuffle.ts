import { shuffle as shuffleToolkit } from '../../array';
import { isArrayLike } from '../predicate/isArrayLike';

export function shuffle<T>(collection: ArrayLike<T> | null | undefined): T[] {
  if (!isArrayLike(collection)) {
    return [];
  }

  return shuffleToolkit(Array.from(collection));
}
