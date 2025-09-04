# ary

주어진 함수가 최대 `n`개의 인자만 받도록 제한하는 새로운 함수를 생성해요. 추가로 전달된 인자는 무시돼요.

```typescript
const limitedFunc = ary(func, n);
```

## 레퍼런스

### `ary(func, n)`

함수가 받을 수 있는 인자의 개수를 제한하고 싶을 때 `ary` 함수를 사용하세요.

```typescript
import { ary } from 'es-toolkit';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// 인자를 받지 않도록 제한
ary(fn, 0)(1, 2, 3); // []

// 1개의 인자만 받도록 제한
ary(fn, 1)(1, 2, 3); // [1]

// 2개의 인자만 받도록 제한
ary(fn, 2)(1, 2, 3); // [1, 2]
```

`ary`는 함수형 프로그래밍에서 특히 유용해요. 콜백 함수가 예상치 않은 인자를 받는 것을 방지할 수 있어요.

```typescript
// parseInt는 (string, radix) 두 개의 인자를 받지만,
// map은 (value, index, array) 세 개의 인자를 전달해요.

['1', '2', '3'].map(parseInt);  
// 결과: [1, NaN, NaN] 
// 왜냐하면 parseInt('2', 1), parseInt('3', 2)가 실행되기 때문이에요.

// ary를 사용해서 첫 번째 인자만 전달하도록 제한
['1', '2', '3'].map(ary(parseInt, 1));  
// 결과: [1, 2, 3] ✅
```

### 파라미터

- `func` (`F`): 인자 개수를 제한할 함수예요.
- `n` (`number`): 최대로 받을 인자의 개수예요.

### 반환 값

(`(...args: any[]) => ReturnType<F>`): 최대 `n`개의 인자만 받는 새로운 함수예요.
