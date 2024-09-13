# memoize

创建一个函数的备忘版本。备忘函数会基于接收到的参数缓存结果，因此如果再次传递相同的参数，它会返回缓存的结果，而不是重新计算。

这个功能适用于接受零个或一个参数的函数。如果你的函数接受多个参数，你应该将其重构为接受一个组合了这些参数的对象或数组。

如果参数不是原始类型（例如数组或对象），请提供一个 `getCacheKey` 函数来生成唯一的缓存键，以确保正确缓存。

## 签名

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

### 参数

- `fn` (`F`) - 要备忘的函数，它接受零个或一个参数。
- `options`: 备忘配置的可选项。
  - `options.cache` (`MemoizeCache<any, ReturnType<F>>`): 用于存储结果的缓存对象。默认为一个新的 `Map`。
  - `options.getCacheKey` (`(args: A) => unknown`): 可选函数，用于为每个参数生成唯一的缓存键。

### 返回

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): 备忘版本的函数，并带有一个额外的 `cache` 属性，用于暴露内部缓存。

## 示例

```typescript
import { memoize, MemoizeCache } from 'es-toolkit/function';

// 使用默认缓存的示例
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15
console.log(memoizedAdd(5)); // 15 （缓存结果）
console.log(memoizedAdd.cache.size); // 1

// 使用自定义解析器的示例
const sum = (arr: number[]) => arr.reduce((x, y) => x + y, 0);
const memoizedSum = memoize(sum, { getCacheKey: (arr: number[]) => arr.join(',') });
console.log(memoizedSum([1, 2])); // 3
console.log(memoizedSum([1, 2])); // 3 （缓存结果）
console.log(memoizedSum.cache.size); // 1

// 使用自定义缓存实现的示例
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
console.log(memoizedSumWithCustomCache([1, 2])); // 3 （缓存结果）
console.log(memoizedAddWithCustomCache.cache.size); // 1
```
