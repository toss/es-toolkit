# unary

인자를 최대 1개만 받는 새로운 함수를 만들어요. 그 이상으로 주어진 인자는 무시해요.

## 인터페이스

```typescript
function unary<F extends (...args: any[]) => any>(func: F): (...args: any[]) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 인자를 1개만 받도록 할 함수

### 반환 값

(`(...args: any[]) => ReturnType<F>`): 인자를 최대 1개만 받도록 한 함수

## 예시

```typescript
import { unary } from 'es-toolkit/function';

function fn(a, b, c) {
  console.log(arguments);
}

unary(fn)(1, 2, 3); // [Arguments] { '0': 1 }
```
