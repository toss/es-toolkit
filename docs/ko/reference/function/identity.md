# identity

입력받은 값을 그대로 반환해요.

```typescript
const result = identity(value);
```

## 사용법

### `identity(value)`

어떤 값을 변경하지 않고 그대로 반환하고 싶을 때 `identity`를 사용하세요.

인자로 주어지는 함수의 기본값으로 사용할 때 유용해요. 배열의 `map`이나 `filter`에서 값 자체를 반환하거나, 함수형 프로그래밍에서 플레이스홀더 역할로 사용해요.

```typescript
import { identity } from 'es-toolkit/function';

// 숫자를 그대로 반환해요
const num = identity(5);
console.log(num); // 5

// 문자열을 그대로 반환해요
const str = identity('hello');
console.log(str); // 'hello'

// 객체를 그대로 반환해요
const obj = identity({ key: 'value' });
console.log(obj); // { key: 'value' }

// 배열에서 사용하는 예시
const numbers = [1, 2, 3, 4, 5];
const same = numbers.map(identity);
console.log(same); // [1, 2, 3, 4, 5]
```

#### 파라미터

- `value` (`T`): 반환할 값이에요.

#### 반환 값

(`T`): 입력받은 값을 그대로 반환해요.
