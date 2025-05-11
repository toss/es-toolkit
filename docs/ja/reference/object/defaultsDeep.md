# defaultsDeep

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

[defaults](./defaults.md) 関数に似ていますが、ネストされたオブジェクトに対しても再帰的にデフォルト値を割り当てます。

> 注意: この関数は最初のパラメータ `object` を変更します。

## インターフェース

```typescript
function defaultsDeep<T extends object>(object: T): NonNullable<T>;
function defaultsDeep<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaultsDeep<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaultsDeep<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### パラメータ

- `object` (`T`): デフォルト値を受け取る対象オブジェクト。
- `sources` (`S[]`): デフォルト値を提供する1つ以上のソースオブジェクト。

### 戻り値

(`object`): デフォルト値が適用された対象オブジェクト。

## 例

```typescript
// 基本的な使用法
defaultsDeep({ a: 1 }, { a: 2, b: 2 }); // { a: 1, b: 2 }

// ネストされたオブジェクトのマージ
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// null値は上書きしない
defaultsDeep({ a: { b: null } }, { a: { b: 2 } }); // { a: { b: null } }

// undefined値は上書きする
defaultsDeep({ a: { b: undefined } }, { a: { b: 2 } }); // { a: { b: 2 } }

// 複数のソースオブジェクトの使用
defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { d: 4 });
// { a: { b: 2, c: 3 }, d: 4 }

// 循環参照の処理
const obj1 = { foo: { b: { c: { d: {} } } }, bar: { a: 2 } };
const obj2 = { foo: { b: { c: { d: {} } } }, bar: {} };
obj1.foo.b.c.d = obj1; // 循環参照の作成
obj2.foo.b.c.d = obj2; // 循環参照の作成
obj2.bar.b = obj2.foo.b; // 交差参照
const result = defaultsDeep(obj1, obj2);
// 循環参照と参照構造が正しく維持される
```
