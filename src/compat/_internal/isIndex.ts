const IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;

export function isIndex(value: PropertyKey, length?: number): boolean {
  length = typeof length === 'number' ? length : Number.MAX_SAFE_INTEGER;

  switch (typeof value) {
    case 'number': {
      return Number.isInteger(value) && value >= 0 && value < length;
    }
    case 'symbol': {
      return false;
    }
    case 'string': {
      return IS_UNSIGNED_INTEGER.test(value);
    }
  }
}
