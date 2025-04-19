# forOwn

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの自分自身の列挙可能なプロパティを反復し、各プロパティに対してiterateeを呼び出します。iterateeは、3つの引数：（value、key、object）で呼び出されます。iteratee関数は、falseを明示的に返すことによって早期に反復を終了することができます。

## インターフェース

```typescript
function forOwn<T>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: string, collection: T) => any
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

forOwn(new Foo(), function (value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```
