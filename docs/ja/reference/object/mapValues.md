# mapValues

オブジェクトの値を関数を通じて変換した新しいオブジェクトを返します。

```typescript
const newObj = mapValues(object, getNewValue);
```

## 参照

### `mapValues(object, getNewValue)`

オブジェクトの各値を変換して新しいオブジェクトを作りたい時に`mapValues`を使用してください。キーはそのまま維持され、値のみが`getNewValue`関数の結果に変更されます。

```typescript
import { mapValues } from 'es-toolkit/object';

// すべての値を2倍に
const numbers = { a: 1, b: 2, c: 3 };
const doubled = mapValues(numbers, value => value * 2);
// doubledは{ a: 2, b: 4, c: 6 }になります

// 文字列の値を大文字に変換
const strings = { first: 'hello', second: 'world' };
const uppercased = mapValues(strings, value => value.toUpperCase());
// uppercasedは{ first: 'HELLO', second: 'WORLD' }になります

// キーと値を一緒に活用
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = mapValues(scores, (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// gradesは{ alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }になります
```

#### パラメータ

- `object` (`T extends object`): 値を変換するオブジェクトです。
- `getNewValue` (`(value: T[K], key: K, object: T) => V`): 新しい値を生成する関数です。値、キー、全体のオブジェクトをパラメータとして受け取ります。

#### 戻り値

(`Record<K, V>`): 値が変換された新しいオブジェクトを返します。
