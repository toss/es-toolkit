# omitBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

条件関数に一致するプロパティを除外した新しいオブジェクトを生成します。

この関数はオブジェクトと条件関数を受け取り、条件関数がfalseを返すプロパティのみを含む新しいオブジェクトを返します。

## インターフェース

```typescript
function omitBy<T extends Record<string, any>>(
  obj: T,
  shouldOmit?: (value: T[keyof T], key: keyof T, obj: T) => boolean
): Partial<T>;
```

### パラメータ

- `obj` (`T`): プロパティを省略するオブジェクトです。
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): プロパティを省略するかどうかを決定する条件関数です。この関数はプロパティのキーと値を引数として受け取り、プロパティを省略する場合はtrue、そうでない場合はfalseを返します。

### 戻り値

(`Partial<T>`): 条件関数に一致しないプロパティで構成される新しいオブジェクトです。

## 例

```typescript
const obj = { a: 1, b: 'omit', c: 3 };
const shouldOmit = (value, key) => typeof value === 'string';
const result = omitBy(obj, shouldOmit);
// 結果は { a: 1, c: 3 } です
```
