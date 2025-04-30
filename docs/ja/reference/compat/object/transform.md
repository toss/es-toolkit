# transform

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

あらゆるコレクション（配列またはオブジェクト）を、反復関数を適用して新しい結果に変換します。

`transform()`関数は、配列またはオブジェクトの各プロパティを通過して、新しい結果を構築します。
各プロパティに対して、現在の累積値とプロパティ値を使用して反復関数を呼び出します。
累積値を好きなように変更でき、最終的な累積値が結果になります。

累積値を提供しない場合、元のプロトタイプを持つ新しい配列またはオブジェクトを作成します。
反復関数から`false`を返すことで、変換を早期に停止することもできます。

## インターフェース

```typescript
function transform<T, U>(
  object?: T[],
  iteratee?: ((accumulator: U, value: T, index: number, object: T[]) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;
function transform<T extends object, U>(
  object?: T,
  iteratee?: ((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;
function transform<T, U>(
  object?: T[] | T | null | undefined,
  iteratee?: ((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null,
  accumulator?: U | undefined | null
): U | undefined | null;
```

### パラメータ

- `object` (`readonly T[] | T | null | undefined`): 反復するオブジェクトです。
- `iteratee` (`((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null`): 各イテレーションで呼び出される関数です。
- `accumulator` (`U | undefined | null`): 初期値です。

### 戻り値

(`U | undefined | null`): 累積された値を返します。

## 例

```typescript
// Transform an array
const array = [2, 3, 4];
transform(
  array,
  (acc, value) => {
    acc += value;
    return value % 2 === 0;
  },
  0
); // => 5

// Transform an object
const obj = { a: 1, b: 2, c: 1 };
transform(
  obj,
  (result, value, key) => {
    (result[value] || (result[value] = [])).push(key);
  },
  {}
); // => { '1': ['a', 'c'], '2': ['b'] }
```
