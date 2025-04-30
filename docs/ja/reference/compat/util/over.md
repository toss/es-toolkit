# over

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた関数を呼び出し、その結果を配列として返す関数を作成します。

以下のような様々なタイプのイテレータを使用できます：

- **関数**: 各関数は同じ引数で呼び出され、結果が収集されます。
- **プロパティ名**: 各プロパティ名は、提供されたオブジェクトから値を抽出するために使用されます。
- **オブジェクト**: 各オブジェクトは、提供されたオブジェクトがそのプロパティと一致するかを確認するために使用されます。
- **プロパティ-値ペア**: 各ペアは、提供されたオブジェクトの特定のプロパティが値と一致するかを確認します。

## インターフェース

```typescript
function over(...iteratees: Array<Iteratee | Iteratee[]>): (...args: any[]) => unknown[];
```

### パラメータ

- `iteratees` (`Array<Iteratee | Iteratee[]>`): 呼び出す反復子。
  - `Iteratee` は `((...args: any[]) => unknown) | symbol | number | string | object | null` 型です。

### 戻り値

(`(...args: any[]) => unknown[]`): 新しい関数を返します。

## 例

```typescript
const func = over([Math.max, Math.min]);
const func2 = over(Math.max, Math.min);
func(1, 2, 3, 4);
// => [4, 1]
func2(1, 2, 3, 4);
// => [4, 1]

const func = over(['a', 'b']);
func({ a: 1, b: 2 });
// => [1, 2]

const func = over([{ a: 1 }, { b: 2 }]);
func({ a: 1, b: 2 });
// => [true, false]

const func = over([['a', 1], ['b', 2]]);
func({ a: 1, b: 2 });
// => [true, true]
```
