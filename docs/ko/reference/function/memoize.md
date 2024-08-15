# memoize

연산 결과를 캐싱하는 새로운 메모이제이션된 함수를 반환해요. 메모이제이션된 함수는 같은 인자에 대해서 중복해서 연산하지 않고, 캐시된 결과를 반환해요.

인자를 0개 또는 1개만 받는 함수만 메모이제이션할 수 있어요. 2개 이상의 인자를 받는 함수를 메모이제이션하려면,
여러 인자를 1개의 객체나 배열로 받도록 리팩토링하세요.

인자가 배열이나 객체여서 원시 값이 아닌 경우, 올바르게 캐시 키를 계산할 수 있도록 `getCacheKey` 함수를 옵션으로 제공하세요.

## 인터페이스

```typescript
function memoize<F extends (...args: any) => any>(
  fn: F,
  options: {
    cache?: MemoizeCache<any, ReturnType<F>>;
    getCacheKey?: (args: Parameters<F>[0]) => unknown;
  } = {}
): F & { cache: MemoizeCache<any, ReturnType<F>> };

interface MemoizeCache<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean | void;
  clear(): void;
  size: number;
}
```

### 파라미터

- `fn` (`F`) - 메모이제이션할 함수. 0개 또는 1개 인자를 받아야 해요.
- `options`: 메모이제이션 옵션.
  - `options.cache` (`MemoizeCache<any, ReturnType<F>>`): 연산 결과를 저장할 캐시 객체. 기본값은 새로운 `Map`이에요.
  - `options.getCacheKey` (`(args: A) => unknown`): 원시 값이 아닌 인자에 대해서 캐시 키를 올바르게 계산할 수 있는 함수.

### 반환 값

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): 메모이제이션된 함수. 추가로 내부 캐시를 노출하는 `cache` 프로퍼티를 가져요.

## 예시

```typescript
import { memoize, MemoizeCache } from 'es-toolkit/function';

// 기본 사용법
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15
console.log(memoizedAdd(5)); // 15 (캐시된 결과)
console.log(memoizedAdd.cache.size); // 1

// 커스텀 `getCacheKey` 정의하기
const sum = (arr: number[]) => arr.reduce((x, y) => x + y, 0);
const memoizedSum = memoize(sum, { getCacheKey: (arr: number[]) => arr.join(',') });
console.log(memoizedSum([1, 2])); // 3
console.log(memoizedSum([1, 2])); // 3 (캐시된 결과)
console.log(memoizedSum.cache.size); // 1

// 커스텀 `MemoizeCache` 정의하기
class CustomCache<K, T> implements MemoizeCache<K, T> {
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
const memoizedSumWithCustomCache = memoize(sum, { cache: customCache });
console.log(memoizedSumWithCustomCache([1, 2])); // 3
console.log(memoizedSumWithCustomCache([1, 2])); // 3 (캐시된 결과)
console.log(memoizedAddWithCustomCache.cache.size); // 1
```
