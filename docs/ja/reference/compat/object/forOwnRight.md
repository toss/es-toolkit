# forOwnRight

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトのプロパティを逆順に順次処理し、各プロパティに対して `iteratee` 関数を呼び出します。

オブジェクトが直接所有するプロパティのみを処理し、継承されたプロパティや `Symbol` キーを持つプロパティは含まれません。

`iteratee` 関数が `false` を返すことで、順次処理を早期に終了することができます。

## インターフェース

```typescript
function forOwnRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### パラメータ

- `object` (`T | null | undefined`): 反復するためのオブジェクトです。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 各反復で呼び出される関数です。提供されていない場合は、同一関数が使用されます。

### 戻り値

(`T | null | undefined`): オブジェクトを返します。

## 例

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

forOwnRight(new Foo(), function (value, key) {
  console.log(key);
});
// => 'b' と 'a' を出力します (順序は保証されません)。
```
