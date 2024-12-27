# propertyOf

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの指定されたパスで値を返す関数を作成します。

`property` は特定のパスにバインドされた関数を作成し、異なるオブジェクトをクエリすることができますが、
`propertyOf` は特定のオブジェクトにバインドされた関数を作成し、そのオブジェクト内の異なるパスをクエリすることができますます。

## インターフェース

```typescript
function propertyOf(object: unknown): (path: PropertyKey | PropertyKey[]) => unknown;
```

### パラメータ

- `object` (`unknown`): クエリするオブジェクトます。

### 戻り値

(`(path: PropertyKey | PropertyKey[]) => unknown`): パスを受け取り、指定されたパスのオブジェクトから値を取得する新しい関数を返します。
ます。

## 例

```typescript
const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue('a.b.c');
console.log(result); // => 3

const getValue = propertyOf({ a: { b: { c: 3 } } });
const result = getValue(['a', 'b', 'c']);
console.log(result); // => 3
```
