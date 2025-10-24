# once (Lodash 互換性)

::: warning `es-toolkit` の `once` を使用してください

この `once` 関数は、`es-toolkit` のメインライブラリ [once](../../function/once.md) 関数と同じ機能を持っています。

:::

関数が1回だけ呼び出されるように制限します。

```typescript
const limitedFunc = once(func);
```

## 参照

### `once(func)`

関数を1回だけ呼び出すように制限したい場合は `once` を使用してください。最初の呼び出し後は結果がキャッシュされ、同じ値を返します。

```typescript
import { once } from 'es-toolkit/compat';

// 基本的な使用法
let count = 0;
const increment = once(() => {
  count++;
  console.log('カウンター増加:', count);
  return count;
});

increment(); // 'カウンター増加: 1' を出力、1 を返す
increment(); // 何も出力しない、1 を返す
increment(); // 何も出力しない、1 を返す

// 実用的な例 - 初期化関数
const initialize = once(() => {
  console.log('アプリケーション初期化中...');
  // コストのかかる初期化操作
  return '初期化完了';
});

// 複数回呼び出しても、初期化は1回だけ実行される
initialize(); // 'アプリケーション初期化中...' を出力
initialize(); // 何も出力しない
```

コストのかかる初期化操作やセットアップ関数を作成する際に便利です。例えば、データベース接続、APIトークンの初期化などに使用できます。

#### パラメータ

- `func` (`Function`): 1回だけ呼び出すように制限する関数です。

#### 戻り値

(`Function`): 1回だけ呼び出される新しい関数を返します。2回目の呼び出し以降は、最初の呼び出しの結果を返します。
