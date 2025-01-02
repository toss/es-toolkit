# keysIn

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトから文字列キーであるプロパティの名前を取得します。プロトタイプから継承されたものも含みます。

- 値がオブジェクトでない場合、オブジェクトに変換されます。
- [配列のようなオブジェクト](../predicate/isArrayLike.md)は配列のように扱われます。
- 一部のインデックスが欠けている疎な配列は密な配列のように扱われます。
- 値が `null` または `undefined` の場合、空の配列を返します。
- プロトタイプオブジェクトを処理する際には、`constructor` プロパティは結果から除外されます。

## インターフェース

```typescript
function keysIn(object?: unknown): string[];
```

### パラメータ

- `object` (`unknown`): キーを調べるためのオブジェクト。

### 戻り値

(`string[]`): オブジェクトから取得した文字列キーの配列。

## 例

```typescript
const obj = { a: 1, b: 2 };
console.log(keysIn(obj)); // ['a', 'b']

const arr = [1, 2, 3];
console.log(keysIn(arr)); // ['0', '1', '2']

function Foo() {}
Foo.prototype.a = 1;
console.log(keysIn(new Foo())); // ['a']
```
