# takeRightWhile

条件関数が真を返す間、配列の最後から要素を取得して新しい配列を返します。

```typescript
const result = takeRightWhile(arr, shouldContinueTaking);
```

## 使用法

### `takeRightWhile(arr, shouldContinueTaking)`

配列の最後から条件を満たす要素を取得したい場合は `takeRightWhile` を使用してください。条件関数が偽を返す最初の要素に出会うと停止します。

```typescript
import { takeRightWhile } from 'es-toolkit/array';

// 4より小さい数字を最後から取得します
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);
// 結果: [3, 2, 1]

// 3より大きい数字を最後から取得します
takeRightWhile([1, 2, 3], n => n > 3);
// 結果: []

// 文字列の長さが5以下の要素を取得します
takeRightWhile(['hello', 'world', 'foo', 'bar'], str => str.length <= 5);
// 結果: ['hello', 'world', 'foo', 'bar']
```

#### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `shouldContinueTaking` (`(item: T, index: number, array: T[]) => boolean`): 各要素、インデックス、配列と共に呼び出される条件関数です。この関数が真を返す間、要素が結果に含まれます。

#### 戻り値

(`T[]`): 条件関数が真を返す間、配列の最後から取得した要素を含む新しい配列です。
