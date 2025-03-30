# overEvery

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

提供された値に対して、すべての指定された述語が真を返すかどうかを確認する関数を作成します。

この関数は、複数の述語を受け取ります。これは個別の述語関数や述語の配列のいずれかであり、
提供された値に対してすべての述語が真を返すかどうかを確認する新しい関数を返します。

## インターフェース

```typescript
function overEvery<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U & V;
function overEvery<T>(
  ...predicates: Array<((...args: T[]) => boolean) | ReadonlyArray<(...args: T[]) => boolean>>
): (...args: T[]) => boolean;
```

### パラメータ

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  述語または述語の配列のリストです。各述語は、型 `T` の1つ以上の値を受け取り、
  その値に対して条件が満たされるかどうかを示すブール値を返す関数です。

### 戻り値

(`(...values: T[]) => boolean`): 値のリストを取り、提供された値に対してすべての述語が真を返す場合は `true` を、
そうでない場合は `false` を返す関数です。

## 例

```typescript
const func = overEvery(
  (value) => typeof value === 'string',
  (value) => value.length > 3
);

func("hello"); // true
func("hi"); // false
func(42); // false

const func = overEvery([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 1, b: 2 }); // true
func({ a: 0, b: 2 }); // false

const func = overEvery(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a.length > 3 && b.length > 3
);

func("hello", "world"); // true
func("hi", "world"); // false
func(1, 10); // false
```
