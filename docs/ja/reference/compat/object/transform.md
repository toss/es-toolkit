# transform

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトの値を順番に処理しながら、希望する形に累積して新しいオブジェクトを作成します。

`accumulator`に初期値を提供しない場合、プロトタイプの新しい配列やオブジェクトを生成して使用します。

`iteratee`関数が`false`を返すと、処理を中断します。

## インターフェース

```typescript
export function transform<T, U>(
  object: readonly T[],
  iteratee?: (acc: U, curr: T, index: number, arr: readonly T[]) => void,
  accumulator?: U
): U;

export function transform<T, U>(
  object: Record<string, T>,
  iteratee?: (acc: U, curr: T, key: string, dict: Record<string, T>) => void,
  accumulator?: U
): U;

export function transform<T extends object, U>(
  object: T,
  iteratee?: (acc: U, curr: T[keyof T], key: keyof T, dict: Record<keyof T, T[keyof T]>) => void,
  accumulator?: U
): U;
```

### パラメータ

- `object` (`readonly T[] | T`): 処理するオブジェクト。
- `iteratee` (`(accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown`): 各処理で呼び出される関数。
- `accumulator` (`U`): 初期値。

### 戻り値

(`U`): 累積された値を返します。

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
