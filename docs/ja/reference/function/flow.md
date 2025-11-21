# flow

複数の関数を順番に実行する新しい関数を作成します。

```typescript
const combinedFunc = flow(func1, func2, func3);
```

## 使用法

### `flow(...funcs)`

関数を連結してパイプラインを作成したいときに`flow`を使用してください。前の関数の結果が次の関数の入力になります。データを複数の段階で変換するときに便利です。

```typescript
import { flow } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flow(add, square, double);

// まずadd(1, 2) = 3
// 次にsquare(3) = 9
// 最後にdouble(9) = 18
combined(1, 2);
// Returns: 18
```

データ変換パイプラインを作成するときに特に便利です。

```typescript
const processData = flow(
  (text: string) => text.trim(),
  (text: string) => text.toLowerCase(),
  (text: string) => text.split(' '),
  (words: string[]) => words.filter(word => word.length > 3)
);

processData('  Hello World JavaScript  ');
// Returns: ['hello', 'world', 'javascript']
```

#### パラメータ

- `funcs` (`Array<(...args: any[]) => any>`): 順番に実行する関数です。

#### 戻り値

(`(...args: any[]) => any`): 与えられた関数を順番に実行する新しい関数です。最初の関数は複数の引数を受け取ることができ、残りの関数は前の関数の結果を受け取ります。
