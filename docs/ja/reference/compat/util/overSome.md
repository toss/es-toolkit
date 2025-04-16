# overSome

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

提供された値に対して、与えられた述語のいずれかが真を返すかどうかをチェックする関数を作成します。

この関数は、個々の述語関数、または述語の配列のいずれかを取る複数の述語を受け取り、
提供された値で呼び出されたときにいずれかの述語が真を返すかどうかをチェックする新しい関数を返します。ます。

## インターフェース

```typescript
function overSome<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U | V;
function overSome<T>(
  ...predicates: Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>
): (...values: T[]) => boolean;
```

### パラメータ

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  述語または述語の配列のリストです。各述語は、型 `T` の1つ以上の値を取り、その値に対して条件が満たされているかどうかを示すブール値を返す関数です。
  数値配列。

### 戻り値

(`(...values: T[]) => boolean`): 値のリストを取り、提供された値に対していずれかの述語が真を返すときに `true` を返し、そうでない場合は `false` を返す関数。
数値配列。

## 例

```typescript
const func = overSome(
  (value) => typeof value === 'string',
  (value) => typeof value === 'number',
  (value) => typeof value === 'symbol'
);

func("hello"); // true
func(42); // true
func(Symbol()); // true
func([]); // false

const func = overSome([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 0, b: 2 }); // true
func({ a: 0, b: 0 }); // false

const func = overSome(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a > 0 && b > 0
);

func("hello", "world"); // true
func(1, 10); // true
func(0, 2); // false
```
