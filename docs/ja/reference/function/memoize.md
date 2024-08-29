# memoize

計算結果をキャッシュする新しいメモ化された関数を返します。メモ化された関数は、同じ引数に対して重複して計算せず、キャッシュされた結果を返します。

引数を0個または1個だけ受け取る関数のみメモ化できます。2つ以上の引数を受け取る関数をメモ化するには、
複数の引数を1つのオブジェクトや配列として受け取るようにリファクタリングしてください。

引数が配列やオブジェクトで、プリミティブ値でない場合、正しくキャッシュキーを計算できるように`getCacheKey`関数をオプションとして提供してください。

## インターフェース

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

### パラメータ

- `fn` (`F`) - メモ化する関数。0個または1個の引数を受け取る必要があります。
- `options`: メモ化オプション。
  - `options.cache` (`MemoizeCache<any, ReturnType<F>>`): 計算結果を保存するキャッシュオブジェクト。デフォルト値は新しい`Map`です。
  - `options.getCacheKey` (`(args: A) => unknown`): プリミティブ値でない引数に対してキャッシュキーを正しく計算できる関数。

### 戻り値

(`F & { cache: MemoizeCache<any, ReturnType<F>> }`): メモ化された関数。さらに内部キャッシュを公開する`cache`プロパティを持ちます。

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
