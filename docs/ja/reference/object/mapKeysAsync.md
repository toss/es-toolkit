# mapKeysAsync

非同期関数を通じてキーを変換した新しいオブジェクトを返します。

```typescript
const newObj = await mapKeysAsync(object, getNewKey);
```

## 使用方法

### `mapKeysAsync(object, getNewKey, options?)`

各キーを非同期に変換して新しいオブジェクトを作成する場合に`mapKeysAsync`を使用します。値はそのまま保持され、キーのみが`getNewKey`関数の解決結果に変更されます。

```typescript
import { mapKeysAsync } from 'es-toolkit/object';

// キーにプレフィックスを追加
const obj = { a: 1, b: 2 };
const prefixed = await mapKeysAsync(obj, (value, key) => `prefix_${key}`);
// prefixed は { prefix_a: 1, prefix_b: 2 } になる

// キーと値を組み合わせて新しいキーを作成
const combined = await mapKeysAsync(obj, (value, key) => `${key}${value}`);
// combined は { a1: 1, b2: 2 } になる

// キーを大文字に変換
const uppercased = await mapKeysAsync(obj, (value, key) => key.toString().toUpperCase());
// uppercased は { A: 1, B: 2 } になる

// 並行処理数を制限
await mapKeysAsync(obj, async (value, key) => await processKey(key, value), { concurrency: 2 });
// 最大2つのキーが同時に処理される
```

#### パラメータ

- `object` (`T extends Record<PropertyKey, any>`): キーを変換する元のオブジェクト。
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => Promise<K>`): 新しいキーを生成する非同期関数。値、キー、オブジェクト全体をパラメータとして受け取る。
- `options` (`MapKeysAsyncOptions`, 省略可): 並行処理数を制御するオプション。
  - `concurrency` (`number`, 省略可): 並行処理の最大数。指定しない場合、すべての操作が同時に実行される。

#### 戻り値

(`Promise<Record<K, T[keyof T]>>`): 変換されたキーを持つ新しいオブジェクトに解決されるプロミス。
