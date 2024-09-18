# property

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの指定されたパスにある値を取得する関数を作成します。値を取得するには [`get`](./get.md) 関数を使用します。

## インターフェース

```typescript
function property(path: PropertyKey | readonly PropertyKey[]): (object: unknown) => any;
```

### パラメータ

- `path` (`string` または `number` または `symbol` または `Array<string | number | symbol>`): プロパティを取得するパス。

### 戻り値

(`(object: unknown) => any`): オブジェクトの指定されたパスにある値を取得する関数。

## 例

```typescript
import { property } from 'es-toolkit/compat';

const getObjectValue = property('a.b.c');
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3

const getObjectValue = property(['a', 'b', 'c']);
const result = getObjectValue({ a: { b: { c: 3 } } });
console.log(result); // => 3
```
