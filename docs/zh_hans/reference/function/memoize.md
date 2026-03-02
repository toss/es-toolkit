# memoize

缓存函数结果,使得使用相同参数再次调用时执行更快。

```typescript
const memoizedFunc = memoize(func, options);
```

## 用法

### `memoize(func, options?)`

当您想要通过缓存函数的执行结果来优化性能时,请使用 `memoize`。使用相同参数再次调用时会返回缓存的结果,从而避免重复计算。

用于只接收一个参数的函数。如果函数接收多个参数,请将它们合并为一个对象或数组传递。

如果参数是像数组、对象这样通过引用进行比较的值,则应提供 `getCacheKey` 函数来生成适当的缓存键。

```typescript
import { memoize } from 'es-toolkit/function';

// 基本用法
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15 (已计算)
console.log(memoizedAdd(5)); // 15 (缓存结果)
console.log(memoizedAdd.cache.size); // 1

// 为数组参数提供缓存键
const sum = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0);
const memoizedSum = memoize(sum, {
  getCacheKey: (arr: number[]) => arr.join(','),
});

console.log(memoizedSum([1, 2, 3])); // 6 (已计算)
console.log(memoizedSum([1, 2, 3])); // 6 (缓存结果)
```

也可以使用自定义缓存。

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

#### 参数

- `func` (`F`): 要进行记忆化的函数。只能接收一个参数。
- `options` (对象, 可选): 记忆化设置选项。
  - `cache` (`MemoizeCache<any, ReturnType<F>>`, 可选): 用于存储结果的缓存对象。默认值为新的 `Map`。
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, 可选): 生成缓存键的函数。在使用非原始值作为参数时需要。

#### 返回值

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): 返回记忆化的函数。还包含可访问内部缓存的 `cache` 属性。
