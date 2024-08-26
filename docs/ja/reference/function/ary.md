# ary

最大`n`個までの引数を受け取る新しい関数を作成します。それ以上の引数は無視されます。

## インターフェース

```typescript
function ary<F extends (...args: any[]) => any>(func: F, n: number): (...args: any[]) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数の受け取りを制限する関数。
- `n` (`number`, オプション): 受け取る引数の最大数。

### 戻り値

(`(...args: any[]) => ReturnType<F>`): 受け取れる引数の数が制限された関数。

## 例

```typescript
import { ary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

ary(fn, 2)(1, 2, 3); // [Arguments] { '0': 1, '1': 2 }
ary(fn); // [Arguments] { '0': 1, '1': 2, '2': 3 }
ary(fn, -1); // [Arguments] {}
ary(fn, 1.5); // [Arguments] { '0': 1 }
ary(fn, 2, {}); // [Arguments] { '0': 1, '1': 2, '2': 3 }
```
