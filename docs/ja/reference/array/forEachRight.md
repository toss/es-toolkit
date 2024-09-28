# forEachRight

配列 (`arr`) の要素を右から左に順に走査し、各要素に対して `callback` 関数を呼び出します。

## インターフェース

```ts
function forEachRight<T>(arr: T[], callback: (value: T, index: number, arr: T[]) => void): void;
```

### パラメータ

- `arr`: (`T[]`): 走査する配列。
- `callback`: (`(value: T, index: number, arr: T[])`): 各反復で呼び出される関数です。
  - `value`: 配列内で現在処理中の要素。
  - `index`: 配列内で現在処理中の要素のインデックス。
  - `arr`: `forEachRight` 関数が呼び出された配列。

### 戻り値

`void`

## 例

```ts
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// forEachRight 関数を使用して配列を走査し、各要素を結果配列に追加します。
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // 出力: [3, 2, 1];
```
