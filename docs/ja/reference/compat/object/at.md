# at

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの `paths` に対応する値の配列を返します。

## インターフェース

```typescript
function at<T>(object: T, ...paths: Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>): unknown[];
```

### パラメータ

- `object` (`T`): 反復処理するオブジェクトです。
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): 取得するプロパティのパスです。各パスは文字列、数値、シンボル、またはこれらの配列や配列風オブジェクトが使用できます。

### 戻り値

(`unknown[]`): 指定されたパスに対応する値の配列を返します。

## 例

```js
const object = { a: [{ b: { c: 3 } }, 4] };

at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]

// パスを引数として直接指定することもできます
at(object, 'a[0].b.c', 'a[1]');
// => [3, 4]

// 配列でも動作します
const array = [1, 2, 3];
at(array, 0, 2);
// => [1, 3]

// 存在しないパスに対しては undefined を返します
at(object, 'a.b.c');
// => [undefined]

// 複数のパスが配列として提供された場合、フラット化されます
at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
```
