# result

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの指定されたパスから値を取得します。

[get](./get.md) 関数と基本的な動作は同じですが、値を探す過程で関数に遭遇した場合、その関数を呼び出しながら進みます。

見つかった値が`undefined`の場合、デフォルト値を返し、デフォルト値が関数であればその関数を呼び出します。

## インターフェース

```typescript
function result(object: any, path: PropertyKey | PropertyKey[], defaultValue?: any | ((...args: any[]) => any)): any;
```

### パラメータ

- `object` (`unknown`): クエリを行うオブジェクトです。
- `path` (`PropertyKey | PropertyKey[]`): 取得するプロパティのパスです。
- `defaultValue` (`any`): 解決された値が`undefined`の場合に返される値です。

### 戻り値

(`T`): 解決された値を返します。

## 例

```typescript
const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.c');
// => 3

const obj = { a: () => 5 };
result(obj, 'a');
// => 5 (calls the function `a` and returns its result)

const obj = { a: { b: null } };
result(obj, 'a.b.c', 'default');
// => 'default'

const obj = { a: { b: { c: 3 } } };
result(obj, 'a.b.d', () => 'default');
// => 'default'
```
