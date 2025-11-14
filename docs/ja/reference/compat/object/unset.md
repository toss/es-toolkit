# unset (Lodash 互換性)

::: warning `delete` 演算子を使用してください

この `unset` 関数は複雑なパス解析とネストされたオブジェクト処理により遅く動作します。

代わりに、より高速で現代的な `delete` 演算子を直接使用してください。

:::

オブジェクトの指定されたパスにあるプロパティを削除します。

```typescript
const success = unset(obj, path);
```

## 使用法

### `unset(obj, path)`

ネストされたオブジェクトから特定のパスのプロパティを削除したい場合に `unset` を使用してください。パスは文字列または配列で指定できます。

```typescript
import { unset } from 'es-toolkit/compat';

// 文字列パスでネストされたプロパティを削除
const obj = { a: { b: { c: 42 } } };
unset(obj, 'a.b.c'); // => true
console.log(obj); // { a: { b: {} } }

// 配列パスでネストされたプロパティを削除
const obj2 = { a: { b: { c: 42 } } };
unset(obj2, ['a', 'b', 'c']); // => true
console.log(obj2); // { a: { b: {} } }
```

配列のインデックスで要素を削除することもできます。

```typescript
import { unset } from 'es-toolkit/compat';

const arr = [1, 2, 3, 4];
unset(arr, 1); // => true
console.log(arr); // [1, undefined, 3, 4]（要素が削除され undefined になります）
```

プロパティが存在しない場合や既に削除されている場合でも `true` を返します。

```typescript
import { unset } from 'es-toolkit/compat';

const obj = { a: { b: 1 } };
unset(obj, 'a.c'); // => true（存在しないプロパティ）
```

`null` または `undefined` のオブジェクトは安全に処理されます。

```typescript
import { unset } from 'es-toolkit/compat';

unset(null, 'a.b'); // => true
unset(undefined, 'a.b'); // => true
```

#### パラメータ

- `obj` (`any`): 変更するオブジェクトです。
- `path` (`PropertyKey | PropertyKey[]`): 削除するプロパティのパスです。

#### 戻り値

(`boolean`): プロパティが削除された場合は `true` を返し、それ以外の場合は `false` を返します。
