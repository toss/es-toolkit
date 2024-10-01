# invertBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

入力オブジェクトの値に提供された反復子関数を適用してキーが生成されるオブジェクトを作成します。
生成されたキーの値は、そのキーを生成する値に対応するプロパティ名（キー）の配列です。

反復子が提供されない場合、プロパティ値は文字列に変換され、キーとして使用されます。

## インターフェース

```typescript
function invertBy<K extends PropertyKey, V>(object: Record<K, V>, iteratee?: (value: V) => string): Record<string, K[]>;
```

### パラメータ

- `object` (`Record<K, V>`): 反転するオブジェクト。
- `iteratee` (`(value: V) => string`): オブジェクトのキーとして反転される値を別の文字列に変換する方法を指定する関数。提供されない場合、値はそのままキーとして反転されます。

### 戻り値

(`Record<string, K[]>`): キーと値が反転したオブジェクト。キーは `iteratee` 関数で変換された値になり、値は `iteratee` 関数が返した値が同じキーの配列です。

## 例

```typescript
const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj);
// result => { '1': ['a', 'c'], '2': ['b'] }

const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj, value => `group${value}`);
// result => { 'group1': ['a', 'c'], 'group2': ['b'] }
```
