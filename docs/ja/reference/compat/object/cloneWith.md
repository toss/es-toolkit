# cloneWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](mdc:../../../compatibility.md)します。
:::

与えられたオブジェクトのシャローコピーを作成し、カスタマイズ関数を使用してクローン方法をカスタマイズできます。このメソッドは `clone` と似ていますが、クローンされた値を生成するためのカスタマイザー関数を受け取ることができる点が異なります。カスタマイザーが undefined を返した場合、デフォルトのクローン処理が使用されます。

カスタマイザーを指定しない場合は、`clone` と同じように動作します。

## インターフェース

```typescript
function cloneWith<T>(value: T, customizer?: (value: any) => any): T;
```

### パラメータ

- `value` (`T`): クローンする値です。
- `customizer` (`Function`): オプション。クローン処理をカスタマイズする関数です。

### 戻り値

(`T`): 与えられたオブジェクトのシャローコピーを返します。

## 例

```typescript
const num = 29;
const clonedNum = cloneWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = cloneWith(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = cloneWith(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false

const obj2 = { a: 1, b: 2 };
const clonedObjWithCustomizer = cloneWith(obj2, value => {
  if (typeof value === 'number') {
    return value * 2; // 数値を2倍にする
  }
  // undefined を返すとデフォルトのクローン処理が使用されます
});
console.log(clonedObjWithCustomizer); // { a: 2, b: 4 }
```
