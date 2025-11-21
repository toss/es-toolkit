# curry

関数をカリー化して一度に一つの引数で呼び出せるようにします。

```typescript
const curriedFunc = curry(func);
```

## 使用法

### `curry(func)`

関数を部分的に適用したいときに`curry`を使用してください。カリー化された関数は必要なすべての引数を受け取るまで新しい関数を返します。すべての引数が提供されると元の関数が実行されます。

```typescript
import { curry } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// 引数`a`に値`10`を提供します
const sum10 = curriedSum(10);

// 引数`b`に値`15`を提供します
const sum25 = sum10(15);

// 引数`c`に値`5`を提供します
// すべての引数を受け取ったので値を返します
const result = sum25(5);
// Returns: 30
```

再利用可能な関数を作成するときに便利です。

```typescript
function multiply(a: number, b: number) {
  return a * b;
}

const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);
const triple = curriedMultiply(3);

double(5); // Returns: 10
triple(5); // Returns: 15
```

#### パラメータ

- `func` (`(...args: any[]) => any`): カリー化する関数です。

#### 戻り値

(`(...args: any[]) => any`): 一度に一つの引数で呼び出せるカリー化された関数です。
