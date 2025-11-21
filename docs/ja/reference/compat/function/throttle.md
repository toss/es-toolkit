# throttle (Lodash 互換性)

::: warning `es-toolkit` の `throttle` を使用してください

この `throttle` 関数は、Lodash 互換性のために内部的に debounce 関数を使用しているため、少し複雑になっています。また、デフォルト値やオプションの処理もより複雑です。

代わりに、より高速で現代的な `es-toolkit` の [throttle](../../function/throttle.md) を使用してください。

:::

関数呼び出しを指定された時間間隔で最大1回実行されるように制限します。

```typescript
const throttledFunc = throttle(func, wait, options);
```

## 使用法

### `throttle(func, wait, options)`

関数呼び出しを指定された時間間隔で最大1回実行されるように制限したい場合は、`throttle` を使用してください。イベントハンドラーや API 呼び出しの頻度を制限するのに便利です。

```typescript
import { throttle } from 'es-toolkit/compat';

// 基本的な使用法 - 1秒に最大1回実行
const throttledLog = throttle(() => {
  console.log('イベント発生!');
}, 1000);

// オプションを使用した例
const throttledScroll = throttle(handleScroll, 100, {
  leading: true, // 最初にすぐ実行
  trailing: false, // 最後に実行しない
});

window.addEventListener('scroll', throttledScroll);
```

スクロールイベントやリサイズイベントのように速く発生するイベントを処理する際、パフォーマンスのために必須です。

#### パラメータ

- `func` (`Function`): スロットリングする関数です。
- `wait` (`number`, オプション): ミリ秒単位の待機時間です。デフォルト値は `0` です。
- `options` (`ThrottleSettings`, オプション): スロットリングオプションです。
  - `leading` (`boolean`): 最初の呼び出しですぐに実行するかどうかです。デフォルト値は `true` です。
  - `trailing` (`boolean`): 最後の呼び出し後に実行するかどうかです。デフォルト値は `true` です。

#### 戻り値

(`DebouncedFunc`): スロットリングされた関数を返します。`cancel()` メソッドで待機中の実行をキャンセルできます。
