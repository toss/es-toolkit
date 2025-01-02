# toPlainObject

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`を普通のオブジェクトに変換します。`value`の継承された列挙可能な文字列キー属性を普通のオブジェクトの自身の属性に平坦化します。

## インターフェース

```typescript
function toPlainObject(value: any): Record<string, any>;
```

### パラメータ

- `value` (`any`): 変換する値です。

### 戻り値

(`Record<string, any>`): 変換されたオブジェクトを返します。

## 例

```typescript
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

toPlainObject(new Foo()); // => { 'b': 2, 'c': 3 }
```
