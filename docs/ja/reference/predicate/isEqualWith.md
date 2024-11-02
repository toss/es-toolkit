# isEqualWith

二つの値が与えられた比較関数を使って等しいかどうかを比較します。

比較関数を提供することで、二つの値が等しいかどうかを検証する方法を細かく調整できます。
与えられた比較関数が `true` を返すと、二つの値は等しいと見なされます。 `false` を返すと、二つの値は異なると見なされます。
`undefined` を返すと、[isEqual](./isEqual.md) が提供するデフォルトの方法で二つの値を比較します。

オブジェクト、配列、`Map`、`Set` のように複数の要素を持つ場合でも、与えられた比較関数を使って要素間の値を比較します。

基本的な比較方法の上に、複雑な比較を処理するための方法を定義できるため、柔軟に二つの値を比較できます。

## インターフェース

```typescript
function isEqualWith(
  a: any,
  b: any,
  areValuesEqual: (
    x: any,
    y: any,
    property?: PropertyKey,
    xParent?: any,
    yParent?: any,
    stack?: Map<any, any>
  ) => boolean | void
): boolean;
```

### パラメータ

- `a` (`unknown`): 比較する最初の値。
- `b` (`unknown`): 比較する2番目の値。
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 2つの値を比較する方法を示す比較関数。2つの値が等しいかどうかを示すブール値を返すことができます。`undefined`を返すと、デフォルトの方法で2つの値を比較します。
  - `x`: 最初のオブジェクト `a` に属する値。
  - `y`: 2番目のオブジェクト `b` に属する値。
  - `property`: `x` と `y` を取得するために使用されたプロパティキー。
  - `xParent`: 最初の値 `x` の親。
  - `yParent`: 2番目の値 `y` の親。
  - `stack`: 循環参照を処理するための内部スタック（`Map`）。

### 戻り値

(`boolean`): 値がカスタマイザーに従って等しい場合は `true`、それ以外の場合は `false`。

## 例

```typescript
const customizer = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};
isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true
isEqualWith([1, 2, 3], [1, 2, 3], customizer); // true
```
