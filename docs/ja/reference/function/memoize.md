# memoize

関数の結果をキャッシュして、同じ引数で再度呼び出すときにより高速に実行できるようにします。

```typescript
const memoizedFunc = memoize(func, options);
```

## 使用法

### `memoize(func, options?)`

関数の実行結果をキャッシュしてパフォーマンスを最適化したいときに `memoize` を使用してください。同じ引数で再度呼び出すと、キャッシュされた結果を返して重複計算を避けることができます。

1つのパラメータのみを受け取る関数で使用してください。複数の引数を受け取る関数の場合は、1つのオブジェクトまたは配列にまとめて渡してください。

配列やオブジェクトのように参照で比較される値を引数として使用する場合は、`getCacheKey` 関数を提供して適切なキャッシュキーを生成する必要があります。

```typescript
import { memoize } from 'es-toolkit/function';

// 基本的な使い方
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15 (計算されました)
console.log(memoizedAdd(5)); // 15 (キャッシュされた結果)
console.log(memoizedAdd.cache.size); // 1

// 配列引数のキャッシュキーを提供
const sum = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0);
const memoizedSum = memoize(sum, {
  getCacheKey: (arr: number[]) => arr.join(','),
});

console.log(memoizedSum([1, 2, 3])); // 6 (計算されました)
console.log(memoizedSum([1, 2, 3])); // 6 (キャッシュされた結果)
```

カスタムキャッシュを使用することもできます。

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

#### パラメータ

- `func` (`F`): メモ化する関数です。1つの引数のみを受け取る必要があります。
- `options` (オブジェクト, オプション): メモ化設定オプションです。
  - `cache` (`MemoizeCache<any, ReturnType<F>>`, オプション): 結果を保存するキャッシュオブジェクトです。デフォルト値は新しい `Map` です。
  - `getCacheKey` (`(arg: Parameters<F>[0]) => unknown`, オプション): キャッシュキーを生成する関数です。非プリミティブ値を引数として使用する場合に必要です。

#### 戻り値

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): メモ化された関数を返します。内部キャッシュにアクセスできる `cache` プロパティも含まれています。

## 例

```typescript
import { memoize, MemoizeCache } from 'es-toolkit/function';

// 基本的な使用法
const add = (x: number) => x + 10;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(5)); // 15
console.log(memoizedAdd(5)); // 15 (キャッシュされた結果)
console.log(memoizedAdd.cache.size); // 1

// カスタム`getCacheKey`の定義
const sum = (arr: number[]) => arr.reduce((x, y) => x + y, 0);
const memoizedSum = memoize(sum, { getCacheKey: (arr: number[]) => arr.join(',') });
console.log(memoizedSum([1, 2])); // 3
console.log(memoizedSum([1, 2])); // 3 (キャッシュされた結果)
console.log(memoizedSum.cache.size); // 1

// カスタム`MemoizeCache`の定義
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
console.log(memoizedSumWithCustomCache([1, 2])); // 3 (キャッシュされた結果)
console.log(memoizedAddWithCustomCache.cache.size); // 1
```
