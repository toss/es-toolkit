# countBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

各要素を`iteratee`で処理した結果から生成されたキーで構成されるオブジェクトを作成します。各キーに対応する値は、そのキーが返された回数です。

## インターフェース

```typescript
function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
function countBy<T, K extends PropertyKey>(
  collection: ArrayLike<T> | Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
```

### 戻り値

(`undefined`): undefined

## 例

```typescript
countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
countBy({ a: 'apple', b: 'banana' }, v => v[0]); // => { 'a': 1, 'b': 1 }
```
