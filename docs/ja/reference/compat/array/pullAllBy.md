# pullAllBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

提供された関数で要素をマッピングした後、配列から指定されたすべての値を削除します。
要素をマッピングする方法はいくつかの方法で指定できます。

- **関数**: 要素を比較する前に、各要素を与えられた関数でマッピングします。各要素に対して関数が実行され、その戻り値で要素を比較します。
- **プロパティ名**: 指定されたプロパティの値で要素を比較します。
- **部分オブジェクト**: 両方の要素が与えられた部分オブジェクトのすべてのプロパティと値に一致するかどうかを基準に比較します。
- **プロパティ-値のペア**: 両方の要素が指定されたプロパティと値に一致するかどうかを基準に比較します。

この関数は`arr`をその場で変更します。
元の配列を変更せずに値を削除したい場合は、[differenceBy](../../array/differenceBy.md)を使用してください。

## インターフェース

```typescript
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: (value: T) => unknown): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: Partial<T>): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: [keyof T, unknown]): T[];
function pullAllBy<T>(arr: T[], valuesToRemove: ArrayLike<T>, getValue: keyof T): T[];
```

### パラメータ

- `arr` (`T[]`): 変更する配列。
- `valuesToRemove` (`ArrayLike<T>`): 配列から削除する値。
- `getValue`:
  - **関数** (`(value: T) => unknown`): 要素を比較する前に、各要素を与えられた関数でマッピングします。各要素に対して関数が実行され、その戻り値で要素を比較します。
  - **プロパティ名** (`keyof T`): 指定されたプロパティの値で要素を比較します。
  - **部分オブジェクト** (`Partial<T>`): 両方の要素が与えられた部分オブジェクトのすべてのプロパティと値に一致するかどうかを基準に比較します。
  - **プロパティ-値のペア** (`[keyof T, unknown]`): 両方の要素が指定されたプロパティと値に一致するかどうかを基準に比較します。

### 戻り値

(`T[]`): 指定された値が削除された修正済み配列。

## 例

```typescript
// Using a iteratee function
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], obj => obj.value);
console.log(result); // [{ value: 2 }]

// Using a property name
const items = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }];
const result = pullAllBy(items, [{ value: 1 }, { value: 3 }], 'value');
console.log(result); // [{ value: 2 }]
```
