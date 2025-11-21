# memoize

함수 결과를 캐시해서 같은 인수로 다시 호출할 때 더 빠르게 실행되도록 해요.

```typescript
const memoizedFunc = memoize(func, options);
```

## 사용법

### `memoize(func, options?)`

함수의 실행 결과를 캐시하여 성능을 최적화하고 싶을 때 `memoize`를 사용하세요. 같은 인수로 다시 호출하면 캐시된 결과를 반환해서 중복 연산을 피할 수 있어요.

하나의 파라미터만 받는 함수에서 사용해요. 여러 인수를 받는 함수라면 하나의 객체나 배열로 합쳐서 전달하세요.

배열, 객체 같이 레퍼런스로 비교되는 값을 인수로 사용한다면 `getCacheKey` 함수를 제공해서 적절한 캐시 키를 생성하도록 해야 해요.

```typescript
import { memoize } from 'es-toolkit/function';

// 기본 사용법
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15 (계산됨)
console.log(memoizedAdd(5)); // 15 (캐시된 결과)
console.log(memoizedAdd.cache.size); // 1

// 배열 인수에 대한 캐시 키 제공
const sum = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0);
const memoizedSum = memoize(sum, {
  getCacheKey: (arr: number[]) => arr.join(','),
});

console.log(memoizedSum([1, 2, 3])); // 6 (계산됨)
console.log(memoizedSum([1, 2, 3])); // 6 (캐시된 결과)
```

커스텀 캐시를 사용할 수도 있어요.

```typescript
import { memoize, MemoizeCache } from 'es-toolkit/function';

class LRUCache<K, V> implements MemoizeCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize = 100;

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
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

const customCache = new LRUCache<string, number>();
const memoizedWithCustomCache = memoize(expensiveFunction, {
  cache: customCache,
});
```

#### 파라미터

- `func` (`F`): 메모이제이션할 함수예요. 하나의 인수만 받아야 해요.
- `options` (객체, 선택): 메모이제이션 설정 옵션이에요.
  - `cache` (`MemoizeCache<any, ReturnType<F>>`, 선택): 결과를 저장할 캐시 객체예요. 기본값은 새로운 `Map`이에요.
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, 선택): 캐시 키를 생성하는 함수예요. 비원시 값을 인수로 사용할 때 필요해요.

#### 반환 값

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): 메모이제이션된 함수를 반환해요. 내부 캐시에 접근할 수 있는 `cache` 프로퍼티도 포함돼요.
