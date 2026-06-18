# hasValue (`Map`)

Mapが特定の値を含むかどうかをチェックします。

```typescript
const exists = hasValue(map, searchElement);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/map`から独占的に利用できます。

:::

## 使用法

### `hasValue(map, searchElement)`

Mapが特定の値を含むかどうかを確認したい場合は `hasValue` を使用してください。この関数はSameValueZero比較を使用します(Array.prototype.includesと同様)。つまり、NaNはNaNと等しいと見なされます。

```typescript
import { hasValue } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = hasValue(map, 2);
// 結果: true

const result2 = hasValue(map, 5);
// 結果: false
```

様々な値の型を検索できます。

```typescript
import { hasValue } from 'es-toolkit/map';

// NaNを検索します(SameValueZero比較を使用)
const numbers = new Map([
  ['a', 1],
  ['b', NaN],
  ['c', 3],
]);

const hasNaN = hasValue(numbers, NaN);
// 結果: true

// オブジェクトを検索します(参照の等価性)
const obj = { id: 1 };
const objects = new Map([
  ['first', obj],
  ['second', { id: 2 }],
]);

const hasObj = hasValue(objects, obj);
// 結果: true

const hasSimilar = hasValue(objects, { id: 1 });
// 結果: false (異なる参照)
```

#### パラメータ

- `map` (`Map<K, V>`): 検索するMapです。
- `searchElement` (`V`): 検索する値です。

#### 戻り値

(`boolean`): Mapが値を含む場合はtrue、そうでない場合はfalseを返します。
