export function matches(source: any): (target: any) => boolean {
  return (target?: any): boolean => {
    if (target === source) {
      return true;
    }

    const keys = Object.keys(source);

    if (target == null) {
      if (keys.length === 0) {
        return true;
      }

      return false;
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (matches(source[key], target[key])) {

      }

      if (target[key] !== source[key]) {
        return false;
      }


    }

    return true;
  }
}