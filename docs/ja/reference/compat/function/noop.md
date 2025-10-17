# noop (Lodash 互換性)

::: warning `es-toolkit` の `noop` を使用してください

`es-toolkit` にも同じ動作をする [noop](../../function/noop.md) 関数があります。

:::

何もしない空の関数です。

```typescript
noop();
```

## 参照

### `noop(...args)`

何もしないプレースホルダー関数が必要な場合は `noop` を使用してください。デフォルト値やコールバック関数としてよく使われます。

```typescript
import { noop } from 'es-toolkit/compat';

// 基本的な使用法
noop(); // 何もしない
noop(1, 2, 3); // 引数を受け取るが何もしない

// デフォルトのコールバックとして使用
function processData(data, callback = noop) {
  // データ処理
  console.log('データ処理中...', data);

  // コールバック呼び出し(提供されていなければ noop)
  callback(data);
}

processData('テスト'); // コールバックが提供されていなくてもエラーなく動作

// 現代的な代替案(推奨)
function modernProcessData(data, callback = () => {}) {
  console.log('データ処理中...', data);
  callback(data);
}

// またはオプショナルなコールバックを使用
function processDataOptional(data, callback) {
  console.log('データ処理中...', data);
  callback?.(data); // コールバックが提供された場合のみ呼び出し
}
```

デフォルト値やプレースホルダーが必要な状況で便利ですが、現代の JavaScript ではオプショナルチェイニング(`?.`)やデフォルトパラメータを使用する方が一般的です。

#### パラメータ

- `...args` (`any[]`): どんな引数でも受け取れますが、すべて無視されます。

#### 戻り値

(`void`): 何も返しません。
