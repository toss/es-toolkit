import { isDeepKey } from "../_internal/isDeepKey";

export function property(key: PropertyKey) {
  if (isDeepKey(key)) {
    return (x: any) => get(x, key);
  } else {
    return (x: any) => x[key];
  }
}
