# memoize (Lodash 互換性)

::: warning `es-toolkit` の `memoize` を使用してください
この `memoize` 関数は `resolver` 関数の `null` チェック、`MapCache` インターフェースの複雑な型処理、そして Lodash 互換性のための追加のオーバーヘッドにより遅く動作します。

代わりに、より高速で現代的な `es-toolkit` の [memoize](../../function/memoize.md) を使用してください。
:::

関数の結果をキャッシュして、同じ引数で呼び出されたときにパフォーマンスを向上させます。

```typescript
const memoizedFunc = memoize(func, resolver);
```

## 参照

### `memoize(func, resolver)`

関数の結果をメモ化して、同じ引数で呼び出されたときに以前の結果を再利用したい場合は `memoize` を使用してください。コストのかかる計算や API 呼び出しに便利です。

```typescript
import { memoize } from 'es-toolkit/compat';

// 基本的な使い方
function expensiveCalculation(n) {
  console.log('計算中...', n);
  return n * n;
}

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(5)); // '計算中... 5', 25
console.log(memoizedCalc(5)); // 25 (キャッシュされた結果、計算しない)
console.log(memoizedCalc(10)); // '計算中... 10', 100

// カスタムリゾルバーを使用
function fetchUserData(userId, includeProfile) {
  console.log('ユーザーデータを取得中...', userId, includeProfile);
  return { id: userId, profile: includeProfile ? 'プロフィールデータ' : null };
}

// すべての引数を考慮したキャッシュキーを生成
const memoizedFetch = memoize(fetchUserData, (userId, includeProfile) => {
  return `${userId}_${includeProfile}`;
});

memoizedFetch(1, true); // 'ユーザーデータを取得中... 1 true'
memoizedFetch(1, true); // キャッシュされた結果を使用
memoizedFetch(1, false); // 'ユーザーデータを取得中... 1 false' (異なるキャッシュキー)

// キャッシュへのアクセスと変更
console.log(memoizedCalc.cache.get(5)); // 25
memoizedCalc.cache.set(7, 49); // 手動でキャッシュを設定
console.log(memoizedCalc(7)); // 49 (計算せずにキャッシュされた値を使用)
```

ほとんどの場合、基本的なハッシュマップを使用しますが、必要に応じてカスタムキャッシュ実装を使用することもできます。

#### パラメータ

- `func` (`Function`): メモ化する関数です。
- `resolver` (`Function`, オプション): キャッシュキーを決定する関数です。提供されない場合は最初の引数をキーとして使用します。

#### 戻り値

(`Function & { cache: MapCache }`): メモ化された関数を返します。返された関数には `cache` プロパティがあり、キャッシュに直接アクセスできます。
