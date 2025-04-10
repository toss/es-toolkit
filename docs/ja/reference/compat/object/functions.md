# functions

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトのプロパティのうち、値が関数であるプロパティの名前から構成される配列を作成します。

直接所有するプロパティと文字列キーを持つプロパティのみを確認します。継承されたプロパティや`Symbol`キーを持つプロパティは確認しません。

## インターフェース

```typescript
function functions(object: unknown): string[];
```

### パラメータ

- `object` (`unknown`): 検査するオブジェクト。

### 戻り値

(`string[]`): 関数名を含む文字列の配列。

## 例

```typescript
function Foo() {
  this.a = () => 'a';
  this.b = () => 'b';
}

Foo.prototype.c = () => 'c';

functions(new Foo());
// => ['a', 'b']
```
