# result

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの指定されたパスの値を取得します。
解決された値が関数である場合、その関数はオブジェクトを`this`コンテキストとして呼び出されます。
値が`undefined`の場合、`defaultValue`が返されます。

## インターフェース

```typescript
function result<T>(
  object: unknown,
  path: string | number | symbol | ReadonlyArray<string | number | symbol>,
  defaultValue?: T | ((...args: unknown[]) => T)
): T;
```

### パラメータ

- `object` (`unknown`): クエリを行うオブジェクトです。
- `path` (`string | number | symbol | ReadonlyArray<string | number | symbol>`): 取得するプロパティのパスです。
- `defaultValue` (`T | ((...args: unknown[]) => T)`): 解決された値が`undefined`の場合に返される値です。

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
