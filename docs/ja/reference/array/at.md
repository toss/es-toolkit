# at

指定したインデックスの位置から配列の要素を取得します。

この関数は負のインデックスをサポートしており、配列の末尾からカウントします。

## インターフェース

```typescript
function at<T>(arr: T[], indices: number[]): Array<T | undefined>;
```

### パラメータ

- `arr` (`T[]`): 要素を取得する元の配列。
- `indices` (`number[]`): 取得する要素の位置を指定するインデックスの配列。

### 戻り値

(`Array<T | undefined>`): 指定されたインデックスの位置にある要素を含む新しい配列。

## 例

```typescript
import { at } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const result = at(numbers, [1, 3, 4]);
console.log(result); // [20, 40, 50]
```
