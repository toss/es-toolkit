# memoize

주어진 함수의 결과를 인수에 기반하여 캐싱함으로써 메모이제이션해요.

## Signature

```typescript
function memoize<T extends (...args: any[]) => any, K>(
  fn: T,
  resolver?: (...args: Parameters<T>) => K,
  cache?: Cache<K, ReturnType<T>>
): T & { cache: Cache<K, ReturnType<T>> };

function memoize<T extends (...args: any[]) => any, K>(
  fn: T,
  cache?: Cache<K, ReturnType<T>>
): T & { cache: Cache<K, ReturnType<T>> };

interface Cache<K, T> {
  set: (key: K, value: T) => void;
  get: (key: K) => T | undefined;
  has: (key: K) => boolean;
  delete: (key: K) => boolean | void;
  clear: () => void;
  size: number;
}
```

# Parameters

• `fn (T)`: 메모이제이션할 함수예요.
• `resolver ((...args: Parameters<T>) => K, optional)`: 캐시 키를 생성할 함수예요. 제공되지 않으면 메모이제이션된 함수의 첫 번째 인수를 키로 사용해요.
• `cache (Cache<K, ReturnType<T>>, optional)`: 결과를 저장할 캐시 객체예요. 기본값은 새로운 Map 인스턴스예요.

# Returns

`(T & { cache: Cache<K, ReturnType> })`: 캐시 속성을 가진 메모이제이션된 함수예요.

# Examples

```typescript
import { memoize } from './memoize';

// 기본 캐시를 사용하는 예제
const add = (a: number, b: number) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3, 캐시된 값 반환
console.log(memoizedAdd.cache.size); // 1

// 커스텀 리졸버를 사용하는 예제
const resolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithResolver = memoize(add, resolver);
console.log(memoizedAddWithResolver(1, 2)); // 3
console.log(memoizedAddWithResolver(1, 2)); // 3, 캐시된 값 반환
console.log(memoizedAddWithResolver.cache.size); // 1

// 커스텀 캐시 구현을 사용하는 예제
class CustomCache<K, T> implements Cache<K, T> {
  private cache = new Map<K, T>();
  set(key: K, value: T): void {
    this.cache.set(key, value);
  }
  get(key: K): T | undefined {
    return this.cache.get(key);
  }
  has(key: K): boolean {
    return this.cache.has(key);
  }
  delete(key: K): boolean {
    return this.cache.delete(key);
  }
  clear(): void {
    this.cache.clear();
  }
  get size(): number {
    return this.cache.size;
  }
}
const customCache = new CustomCache<string, number>();
const memoizedAddWithCustomCache = memoize(add, customCache);
console.log(memoizedAddWithCustomCache(1, 2)); // 3
console.log(memoizedAddWithCustomCache(1, 2)); // 3, 캐시된 값 반환
console.log(memoizedAddWithCustomCache.cache.size); // 1

// 커스텀 리졸버와 캐시를 사용하는 예제
const customResolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithBoth = memoize(add, customResolver, customCache);
console.log(memoizedAddWithBoth(1, 2)); // 3
console.log(memoizedAddWithBoth(1, 2)); // 3, 캐시된 값 반환
console.log(memoizedAddWithBoth.cache.size); // 1

// `this` 바인딩을 사용하는 예제
const obj = {
  b: 2,
  memoizedAdd: memoize(
    function (a: number) {
      return a + this.b;
    },
    function (a: number) {
      return `${a}-${this.b}`;
    }
  ),
};
console.log(obj.memoizedAdd(1)); // 3
obj.b = 3;
console.log(obj.memoizedAdd(1)); // 4
```
