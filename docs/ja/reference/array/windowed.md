# windowed

指定されたサイズのウィンドウが配列に沿って一定にスライドしながら、各ウィンドウのスナップショットを含む新しい配列を返します。

```typescript
const windows = windowed(arr, size, step?, options?);
```

## 使用法

### `windowed(arr, size, step?, options?)`

指定されたサイズのウィンドウが配列に沿って一定にスライドしながら、各ウィンドウのスナップショットを含む配列を返したい場合は `windowed` を使用してください。

時系列データ分析で移動平均を計算したり、文字列からn-gramを抽出したり、配列から特定のパターンを見つけるときに便利です。また、データをバッチ単位で処理したり、スライディングウィンドウアルゴリズムを実装するときにも活用できます。

```typescript
import { windowed } from 'es-toolkit/array';

// 基本的な使い方 - サイズ3のウィンドウを作ります。
const numbers = [1, 2, 3, 4, 5];
const result = windowed(numbers, 3);
console.log(result); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// stepを指定してウィンドウ間隔を調整します。
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const stepped = windowed(data, 3, 2);
console.log(stepped); // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]

// 文字列配列でも使用できます。
const words = ['a', 'b', 'c', 'd', 'e'];
const wordWindows = windowed(words, 2);
console.log(wordWindows); // [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']]
```

部分ウィンドウを含めたい場合は `partialWindows` オプションを使用してください。

```typescript
import { windowed } from 'es-toolkit/array';

const numbers = [1, 2, 3, 4, 5, 6];

// 部分ウィンドウなし（デフォルト）
const complete = windowed(numbers, 4, 3);
console.log(complete); // [[1, 2, 3, 4]]

// 部分ウィンドウを含む
const withPartial = windowed(numbers, 4, 3, { partialWindows: true });
console.log(withPartial); // [[1, 2, 3, 4], [4, 5, 6]]
```

各スナップショットは配列形式で提供され、最後のいくつかの配列は指定されたサイズより少ない要素を持つ可能性があります。

```typescript
import { windowed } from 'es-toolkit/array';

const small = [1, 2];

// ウィンドウが配列より大きい場合
console.log(windowed(small, 5)); // []
console.log(windowed(small, 5, 1, { partialWindows: true })); // [[1, 2], [2]]
```

#### パラメータ

- `arr` (`readonly T[]`): ウィンドウを作る配列です。
- `size` (`number`): 各ウィンドウのサイズです。1より大きい整数である必要があります。
- `step` (`number`, オプション): ウィンドウ間の間隔です。1より大きい整数である必要があり、デフォルト値は `1` です。
- `options.partialWindows` (`boolean`, オプション): 配列の最後で完全でないウィンドウも含めるかどうかです。デフォルト値は `false` です。

#### 戻り値

(`T[][]`): 指定されたサイズと間隔で作られたウィンドウの配列です。

#### エラー

- `size` または `step` が正の整数でない場合、エラーをスローします。
