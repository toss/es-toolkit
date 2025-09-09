# keys

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`object` の列挙可能なプロパティ名を返します。

オブジェクトではない値はオブジェクトに変換されます。

## インターフェース

```typescript
function keys(object?: any): string[];
```

### パラメータ

- `object` (`object`): 問い合わせるオブジェクト。

### 戻り値

(`string[]`): プロパティ名の配列。

## 例

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;
keys(new Foo()); // ['a', 'b'] (iteration order is not guaranteed)

keys('hi'); // ['0', '1']
keys([1, 2, 3]); // ['0', '1', '2']
keys({ a: 1, b: 2 }); // ['a', 'b']
```
