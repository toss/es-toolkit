# filter (`Set`)

述語関数に基づいてSetをフィルタリングします。

```typescript
const filtered = filter(set, callback);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `filter(set, callback)`

特定の条件を満たす要素のみを含む新しいSetを作成したい場合は `filter` を使用してください。各要素をテストする述語関数を提供すると、述語がtrueを返す要素のみで構成された新しいSetを返します。

```typescript
import { filter } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = filter(set, value => value > 2);
// 結果: Set(3) { 3, 4, 5 }
```

様々な基準でフィルタリングできます。

```typescript
import { filter } from 'es-toolkit/set';

// 値の型でフィルタリングします。
const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const evenNumbers = filter(numbers, num => num % 2 === 0);
// 結果: Set(5) { 2, 4, 6, 8, 10 }

// オブジェクトをフィルタリングします。
const products = new Set([
  { name: 'Laptop', price: 1000, available: true },
  { name: 'Mouse', price: 25, available: false },
  { name: 'Keyboard', price: 75, available: true },
]);

const availableProducts = filter(products, product => product.available);
// 結果: LaptopとKeyboardを含むSet
```

#### パラメータ

- `set` (`Set<T>`): フィルタリングするSetです。
- `callback` (`(value: T, value2: T, set: Set<T>) => boolean`): 各要素をテストする述語関数です。

#### 戻り値

(`Set<T>`): 述語を満たす要素のみを含む新しいSetを返します。
