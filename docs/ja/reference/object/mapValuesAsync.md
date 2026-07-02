# mapValuesAsync

非同期関数を通じて値を変換した新しいオブジェクトを返します。

```typescript
const newObj = await mapValuesAsync(object, getNewValue);
```

## 使用方法

### `mapValuesAsync(object, getNewValue, options?)`

各値を非同期に変換して新しいオブジェクトを作成する場合に`mapValuesAsync`を使用します。キーはそのまま保持され、値のみが`getNewValue`関数の解決結果に変更されます。

```typescript
import { mapValuesAsync } from 'es-toolkit/object';

// すべての値を2倍にする
const numbers = { a: 1, b: 2, c: 3 };
const doubled = await mapValuesAsync(numbers, async value => value * 2);
// doubled は { a: 2, b: 4, c: 6 } になる

// 文字列値を大文字に変換
const strings = { first: 'hello', second: 'world' };
const uppercased = await mapValuesAsync(strings, async value => value.toUpperCase());
// uppercased は { first: 'HELLO', second: 'WORLD' } になる

// キーと値の両方を使用
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = await mapValuesAsync(scores, async (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades は { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' } になる

// 並行処理数を制限
const items = { a: 1, b: 2, c: 3 };
await mapValuesAsync(items, async item => await processItem(item), { concurrency: 2 });
// 最大2つの値が同時に処理される
```

#### パラメータ

- `object` (`T extends object`): 値を変換する元のオブジェクト。
- `getNewValue` (`(value: T[K], key: K, object: T) => Promise<V>`): 新しい値を生成する非同期関数。値、キー、オブジェクト全体をパラメータとして受け取る。
- `options` (`MapValuesAsyncOptions`, 省略可): 並行処理数を制御するオプション。
  - `concurrency` (`number`, 省略可): 並行処理の最大数。指定しない場合、すべての操作が同時に実行される。

#### 戻り値

(`Promise<Record<K, V>>`): 変換された値を持つ新しいオブジェクトに解決されるプロミス。
