# countBy

配列に含まれる要素を `mapper` 関数が返す値に基づいて分類し、数を数えます。

## インターフェース

```typescript
function countBy<T>(arr: T[], mapper: (item: T) => string): Record<string, number>;
```

### パラメータ

- `arr` (`T[]`): 要素の数を数えたい配列。
- `mapper` (`(item: T) => string`): 要素を分類する基準となる値を返す関数。

### 戻り値

(`Record<string, number>`) 各要素が分類ごとにいくつあるかを計算したオブジェクト。

## 例

```javascript
import { countBy } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5, 6];
const result = countBy(array, x => (x % 2 === 0 ? 'even' : 'odd'));

console.log(result);
// 出力: { 'odd': 3, 'even': 3 }
```
