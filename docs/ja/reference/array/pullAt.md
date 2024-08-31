# pullAt

指定されたインデックスの位置から配列の要素を削除し、削除された要素を返します。

この関数は負のインデックスをサポートしており、配列の末尾からカウントします。

## インターフェース

```typescript
function pullAt<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined>;
```

### パラメータ

- `arr` (`T[]`): 要素を削除する元の配列。
- `indicesToRemove` (`number[]`): 削除する要素の位置を指定するインデックスの配列。

### 戻り値

(`Array<T | undefined>`): 元の配列から削除された要素を含む新しい配列。

## 例

```typescript
import { pullAt } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]
```
