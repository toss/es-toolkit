# invert (Lodash 互換性)

::: warning `es-toolkit`の`invert`を使用してください

この`invert`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[`invert`](../../object/invert.md)を使用してください。

:::

オブジェクトのキーと値を入れ替えます。

```typescript
const inverted = invert(object);
```

## 参照

### `invert(object)`

オブジェクトのキーと値を入れ替えたい場合は`invert`を使用してください。元のオブジェクトのキーは新しいオブジェクトの値になり、元のオブジェクトの値は新しいオブジェクトのキーになります。

```typescript
import { invert } from 'es-toolkit/compat';

// 基本的なキー・値の入れ替え
const object = { a: 1, b: 2, c: 3 };
invert(object);
// => { '1': 'a', '2': 'b', '3': 'c' }

// 文字列値の入れ替え
const colors = { red: '#ff0000', green: '#00ff00', blue: '#0000ff' };
invert(colors);
// => { '#ff0000': 'red', '#00ff00': 'green', '#0000ff': 'blue' }

// 混合キーと値のタイプ
const mixed = { a: 1, 2: 'b', c: 3, 4: 'd' };
invert(mixed);
// => { '1': 'a', 'b': '2', '3': 'c', 'd': '4' }
```

重複した値がある場合、最後のキーが使用されます。

```typescript
import { invert } from 'es-toolkit/compat';

// 重複した値がある場合
const object = { a: 1, b: 1, c: 2 };
invert(object);
// => { '1': 'b', '2': 'c' }
// 'a'は上書きされて失われます
```

#### パラメータ

- `object` (`object`): 入れ替えるオブジェクトです。

#### 戻り値

(`Record<string, string>`): キーと値が入れ替わった新しいオブジェクトを返します。
