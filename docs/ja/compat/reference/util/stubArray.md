# stubArray (Lodash 互換性)

::: warning `[]`を直接使用してください

この `stubArray` 関数は単純に空の配列を返すラッパー関数で不要な抽象化です。

代わりに、より高速で直接的な`[]`を使用してください。

:::

常に新しい空の配列を返します。

```typescript
const emptyArray = stubArray();
```

## 使用法

### `stubArray()`

常に新しい空の配列を返す関数です。デフォルト値として空の配列が必要な時や関数型プログラミングで一貫した戻り値が必要な時に使用します。

```typescript
import { stubArray } from 'es-toolkit/compat';

// 空の配列を返す
const emptyArray = stubArray();
console.log(emptyArray); // => []

// 配列メソッドでデフォルト値として使用する
const items = [1, 2, 3];
const result = items.filter(x => x > 5) || stubArray();
console.log(result); // => []

// 関数型プログラミングで使用する
const getData = () => stubArray();
const data = getData();
data.push('item'); // 新しい配列なので安全
```

毎回新しい配列インスタンスを返します。

```typescript
import { stubArray } from 'es-toolkit/compat';

const arr1 = stubArray();
const arr2 = stubArray();

console.log(arr1 === arr2); // => false (異なるインスタンス)
console.log(Array.isArray(arr1)); // => true
console.log(arr1.length); // => 0
```

#### パラメータ

パラメータはありません。

#### 戻り値

(`any[]`): 新しい空の配列を返します。
