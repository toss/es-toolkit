export function isArrayMatch<T>(target: readonly T[], source: readonly T[]) {
  for (let i = 0; i <= target.length - source.length; i++) {
    let match = true;

    for (let j = 0; j < source.length; j++) {
      if (target[i + j] !== source[j]) {
        match = false;
        break;
      }
    }

    if (match) {
      return true;
    }
  }

  return false;
}