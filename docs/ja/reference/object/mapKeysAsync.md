# mapKeysAsync

非同期関数を通じてキーを変換した新しいオブジェクトを返します。

```typescript
const newObj = await mapKeysAsync(object, getNewKey);
```

## 使用法

### `mapKeysAsync(object, getNewKey, options?)`

各キーを非同期に変換して新しいオブジェクトを作りたい時に`mapKeysAsync`を使用してください。値はそのまま維持され、キーのみが`getNewKey`関数が返すPromiseの中の値に変更されます。

```typescript
import { mapKeysAsync } from 'es-toolkit/object';

// キーにプレフィックスを追加
const obj = { a: 1, b: 2 };
const prefixed = await mapKeysAsync(obj, async (value, key) => `prefix_${key}`);
// prefixedは{ prefix_a: 1, prefix_b: 2 }になります

// キーと値を組み合わせて新しいキーを作成
const combined = await mapKeysAsync(obj, async (value, key) => `${key}${value}`);
// combinedは{ a1: 1, b2: 2 }になります

// キーを大文字に変換
const uppercased = await mapKeysAsync(obj, async (value, key) => key.toString().toUpperCase());
// uppercasedは{ A: 1, B: 2 }になります

// 同時に実行される操作の数を制限
await mapKeysAsync(obj, async (value, key) => await processKey(key, value), { concurrency: 2 });
// 最大2つのキーのみが同時に処理されます
```

#### パラメータ

- `object` (`T extends Record<PropertyKey, any>`): キーを変換するオブジェクトです。
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => Promise<K>`): 新しいキーを生成する非同期関数です。値、キー、全体のオブジェクトをパラメータとして受け取ります。
- `options` (`MapKeysAsyncOptions`, オプション): 同時に実行される操作の数を制御するオプションです。
  - `concurrency` (`number`, オプション): 同時に実行できる操作の最大数です。指定しない場合、すべての操作が同時に実行されます。

#### 戻り値

(`Promise<Record<K, T[keyof T]>>`): キーが変換された新しいオブジェクトを持つPromiseを返します。
