# ary

인자를 최대 `n`개까지만 제한해서 받는 새로운 함수를 만들어요. 그 이상으로 주어진 인자는 무시해요.

## 인터페이스

```typescript
function ary<F extends (...args: any[]) => any>(
  func: F,
  n: number
): (...args: any[]) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 인자를 받는 것을 제한할 함수.
- `n` (`number`, 선택): 최대로 받을 인자의 숫자.

### 반환 값

(`(...args: any[]) => ReturnType<F>`): 받을 수 있는 인자의 숫자가 제한된 함수.

## 예시

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
