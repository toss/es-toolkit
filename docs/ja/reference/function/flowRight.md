# flowRight

与えられた関数を右から左に順番に実行する新しい関数を作成します。

```typescript
const combined = flowRight(func1, func2, func3);
```

## 参照

### `flowRight(...funcs)`

複数の関数を右から左に順番に実行する新しい関数を作成したいときに`flowRight`を使用してください。前の関数の戻り値が次の関数のパラメータとして渡されます。

関数を逆順に組み合わせてデータ変換パイプラインを作成するときに便利です。`flow`と逆の方向で関数を実行します。

```typescript
import { flowRight } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

// 右から左に実行: double -> square -> add
const combined = flowRight(double, square, add);
console.log(combined(1, 2)); // 18
// 実行順序: add(1, 2) = 3, square(3) = 9, double(9) = 18

// 単一関数でも使用可能
const single = flowRight((x: number) => x + 1);
console.log(single(5)); // 6
```

`this`コンテキストも関数に渡されます。

```typescript
import { flowRight } from 'es-toolkit/function';

const context = {
  multiplier: 3,
};

function multiply(this: typeof context, x: number) {
  return x * this.multiplier;
}

const add = (x: number) => x + 10;

const combined = flowRight(multiply, add).bind(context);
console.log(combined(5)); // 45
// 実行順序: add(5) = 15, multiply(15) = 45
```

#### パラメータ

- `funcs` (`(...args: any[]) => any`): 組み合わせる関数です。

#### 戻り値

(`(...args: any[]) => any`): 与えられた関数を右から左に順番に実行する新しい関数を返します。
