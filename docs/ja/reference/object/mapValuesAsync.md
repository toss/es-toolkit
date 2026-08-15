# mapValuesAsync

非同期関数を通じて値を変換した新しいオブジェクトを返します。

```typescript
const newObj = await mapValuesAsync(object, getNewValue);
```

## 使用法

### `mapValuesAsync(object, getNewValue, options?)`

各値を非同期に変換して新しいオブジェクトを作りたい時に`mapValuesAsync`を使用してください。キーはそのまま維持され、値のみが`getNewValue`関数が返すPromiseの中の値に変更されます。

```typescript
import { mapValuesAsync } from 'es-toolkit/object';

// すべての値を2倍に
const numbers = { a: 1, b: 2, c: 3 };
const doubled = await mapValuesAsync(numbers, async value => value * 2);
// doubledは{ a: 2, b: 4, c: 6 }になります

// 文字列の値を大文字に変換
const strings = { first: 'hello', second: 'world' };
const uppercased = await mapValuesAsync(strings, async value => value.toUpperCase());
// uppercasedは{ first: 'HELLO', second: 'WORLD' }になります

// キーと値を一緒に活用
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = await mapValuesAsync(scores, async (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// gradesは{ alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }になります

// 同時に実行される操作の数を制限
const items = { a: 1, b: 2, c: 3 };
await mapValuesAsync(items, async item => await processItem(item), { concurrency: 2 });
// 最大2つの値のみが同時に処理されます
```

#### パラメータ

- `object` (`T extends object`): 値を変換するオブジェクトです。
- `getNewValue` (`(value: T[K], key: K, object: T) => Promise<V>`): 新しい値を生成する非同期関数です。値、キー、全体のオブジェクトをパラメータとして受け取ります。
- `options` (`MapValuesAsyncOptions`, オプション): 同時に実行される操作の数を制御するオプションです。
  - `concurrency` (`number`, オプション): 同時に実行できる操作の最大数です。指定しない場合、すべての操作が同時に実行されます。

#### 戻り値

(`Promise<Record<K, V>>`): 値が変換された新しいオブジェクトを持つPromiseを返します。
