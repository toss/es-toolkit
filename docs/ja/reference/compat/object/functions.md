# functions

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの自分の列挙可能なプロパティから関数プロパティ名の配列を作成します。

## インターフェース

```typescript
function functions(object: any): string[];
```

### パラメータ

- `object` (`Object`): 調査するオブジェクトです。

### 戻り値

(`Array`): 関数名を返します。

## 例

```typescript
function Foo() {
  this.a = () => 'a'
  this.b = () => 'b'
}

Foo.prototype.c = () => 'c'

functions(new Foo)
// => ['a', 'b']
```