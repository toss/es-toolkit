# has

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトが指定されたパスに対応するプロパティを持っているかどうかを確認します。

パスとしては、オブジェクトのプロパティ名、プロパティ名の配列、または深いパスを表す文字列を使用できます。

パスがインデックスを表し、オブジェクトが配列または `arguments` オブジェクトの場合、そのインデックスが有効か（0以上で長さ未満か）を確認します。そのため、すべてのインデックスが定義されていないスパース配列（Sparse array）にも使用できます。

## インターフェース

```typescript
function has(object: unknown, path: string | number | symbol | Array<string | number | symbol>): boolean;
```

### パラメータ

- `object` (`unknown`): プロパティの存在を確認するオブジェクト。
- `path` (`string`, `number`, `symbol`, `Array<string | number | symbol>`): プロパティの存在を確認するパス。プロパティ名、プロパティ名の配列、または深いパスを表す文字列を使用できます。

### 戻り値

(`boolean`): オブジェクトがパスに値を持っている場合は `true`、そうでない場合は `false`。

## 例

```typescript
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

has(obj, 'a'); // true
has(obj, ['a', 'b']); // true
has(obj, ['a', 'b', 'c']); // true
has(obj, 'a.b.c'); // true
has(obj, 'a.b.d'); // false
has(obj, ['a', 'b', 'c', 'd']); // false
has([], 0); // false
has([1, 2, 3], 2); // true
has([1, 2, 3], 5); // false
```

## デモ

::: sandpack

```ts index.ts
import { has } from 'es-toolkit/compat';

const obj = { a: { b: { c: 3 } } };

console.log(has(obj, 'a.b.c'));
```

:::
