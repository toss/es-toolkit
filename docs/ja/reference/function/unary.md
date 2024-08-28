# unary

最大1つの引数だけを受け取る新しい関数を作成します。それ以上の引数は無視されます。

## インターフェース

```typescript
function unary<F extends (...args: any[]) => any>(func: F): (...args: any[]) => ReturnType<F>;
```

### パラメータ

- `func` (`F`): 引数を1つだけ受け取るようにする関数

### 戻り値

(`(...args: any[]) => ReturnType<F>`): 最大1つの引数だけを受け取るようにした関数

## 例

```typescript
import { unary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

unary(fn)(1, 2, 3); // [Arguments] { '0': 1 }
```
