# transform

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

繰り返し処理を適用して、任意のコレクション（配列またはオブジェクト）を新しい結果に変換します。

## インターフェース

```typescript
function transform<T, U>(object?: T[], iteratee?: ((accumulator: U, value: T, index: number, object: T[]) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
function transform<T extends object, U>(object?: T, iteratee?: ((accumulator: U, value: T[keyof T], key: keyof T, object: T) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
function transform<T, U>(object?: T[] | T | null | undefined, iteratee?: ((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null, accumulator?: U | undefined | null): U | undefined | null;
```

### パラメータ

- `object` (`readonly T[] | T | null | undefined`): 反復するオブジェクト。
- `iteratee` (`((accumulator: U, value: T | T[keyof T], key: any, object: T[] | T) => unknown) | undefined | null`): 各反復で呼び出される関数。
- `accumulator` (`U | undefined | null`): 初期値。

### 戻り値

(`U | undefined | null`): 蓄積された値を返します。

## 例

```typescript
// Transform an array
const array = [2, 3, 4];
transform(array, (acc, value) => { acc += value; return value % 2 === 0; }, 0) // => 5

// Transform an object
const obj = { 'a': 1, 'b': 2, 'c': 1 };
transform(obj, (result, value, key) => { (result[value] || (result[value] = [])).push(key) }, {}) // => { '1': ['a', 'c'], '2': ['b'] }
```