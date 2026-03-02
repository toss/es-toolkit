# zipObject (Lodash互換)

::: warning `es-toolkit`の[zipObject](../../array/zipObject.md)を使用してください

この`zipObject`関数はLodash互換性のための追加処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[zipObject](../../array/zipObject.md)を使用してください。

:::

2つの配列を使用してオブジェクトを作成します。最初の配列はプロパティ名として、2番目の配列は対応する値として使用されます。

```typescript
const result = zipObject(keys, values);
```

## 使用法

### `zipObject(keys, values)`

キー配列と値配列から1つのオブジェクトを作成したい場合は`zipObject`を使用してください。最初の配列の要素をプロパティ名として、2番目の配列の要素を対応する値として使用してオブジェクトを作成します。APIレスポンスの処理やデータの変換時に特に便利です。

```typescript
import { zipObject } from 'es-toolkit/compat';

// 基本的な使用法
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];
const result = zipObject(keys, values);
// 戻り値: { a: 1, b: 2, c: 3 }

// 長さが異なる配列
const keys2 = ['x', 'y', 'z'];
const values2 = [10, 20];
const result2 = zipObject(keys2, values2);
// 戻り値: { x: 10, y: 20, z: undefined }

// 空配列が提供された場合
const result3 = zipObject([], []);
// 戻り値: {}
```

#### パラメータ

- `keys` (`PropertyKey[]`): プロパティ名として使用する配列。
- `values` (`T[]`): プロパティ値として使用する配列。

#### 戻り値

(`Record<PropertyKey, T>`): 作成されたオブジェクト。
