# memoize

주어진 함수의 결과를 인수에 기반하여 캐싱함으로써 메모이제이션해요.

## 인터페이스

```typescript
export function memoize<F extends (...args: any[]) => any, K = Parameters<F>[0]>(
  fn: F,
  options: MemoizeOptions<K, ReturnType<F>> = {}
): F & { cache: Cache<K, ReturnType<F>> };

export interface MemoizeOptions<K, V> {
  cache?: Cache<K, V>;
  resolver?: (...args: any[]) => K;
}

export interface Cache<K, V> {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  delete: (key: K) => boolean | void;
  clear: () => void;
  size: number;
}
```

### 파라미터

- `fn (T)`: 메모이제이션할 함수예요.
- `options` (MemoizeOptions<K, ReturnType<F>>, optional): 캐시 키를 생성할 함수와 결과를 저장할 캐시 객체를 포함해요.
  - `resolver ((...args: any[]) => K, optional)`: 캐시 키를 생성할 함수. 제공되지 않으면 메모이제이션된 함수의 첫 번째 인수를 키로 사용해요.
  - `cache (Cache<K, ReturnType<F>>, optional)`: 결과를 저장할 캐시 객체. 기본값은 새로운 Map 인스턴스입니다.

### 반환 값

`(F & { cache: Cache<K, ReturnType<F>> })`: 캐시 속성을 가진 메모이제이션된 함수.

## 예시

```typescript
import { memoize } from 'es-toolkit/function';
// 기본 캐시를 사용하는 예제
const add = (a: number, b: number) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3, 캐시된 값 반환
console.log(memoizedAdd.cache.size); // 1

// 커스텀 리졸버를 사용하는 예제
const resolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithResolver = memoize(add, { resolver });
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
const memoizedAddWithCustomCache = memoize(add, { cache: customCache });
console.log(memoizedAddWithCustomCache(1, 2)); // 3
console.log(memoizedAddWithCustomCache(1, 2)); // 3, 캐시된 값 반환
console.log(memoizedAddWithCustomCache.cache.size); // 1

// 커스텀 리졸버와 캐시를 사용하는 예제
const customResolver = (a: number, b: number) => `${a}-${b}`;
const memoizedAddWithBoth = memoize(add, { resolver: customResolver, cache: customCache });
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
    {
      resolver: function (a: number) {
        return `${a}-${this.b}`;
      },
    }
  ),
};
console.log(obj.memoizedAdd(1)); // 3
obj.b = 3;
console.log(obj.memoizedAdd(1)); // 4
```
