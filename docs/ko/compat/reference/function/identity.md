# identity (Lodash 호환성)

::: warning `es-toolkit`의 `identity`를 사용하세요

이 `identity` 함수는 `es-toolkit`의 메인 라이브러리에도 동일한 기능의 함수가 있어요. 단순히 입력값을 그대로 반환하는 기능이에요.

대신 더 빠르고 현대적인 `es-toolkit`의 [identity](../../function/identity.md)를 사용하세요.

:::

입력받은 값을 그대로 반환해요.

```typescript
const result = identity(value);
```

## 사용법

### `identity(value)`

입력받은 값을 그대로 반환하고 싶을 때 `identity`를 사용하세요. 주로 기본값이나 플레이스홀더 함수로 사용되며, 함수형 프로그래밍에서 자주 사용돼요.

```typescript
import { identity } from 'es-toolkit/compat';

// 기본 사용법
console.log(identity(5)); // 5
console.log(identity('hello')); // 'hello'
console.log(identity({ key: 'value' })); // { key: 'value' }

// 배열의 map과 함께 사용 (값 복사)
const numbers = [1, 2, 3, 4, 5];
const copied = numbers.map(identity);
console.log(copied); // [1, 2, 3, 4, 5]

// 필터링에서 기본값으로 사용
const values = [1, 0, '', 'hello', null, undefined, false, true];
const filtered = values.filter(identity); // 참으로 평가되는 값들만 남김
console.log(filtered); // [1, 'hello', true]

// 기본 변환 함수로 사용
function processData(data, transform = identity) {
  return transform(data);
}

console.log(processData('hello')); // 'hello'
console.log(processData('hello', x => x.toUpperCase())); // 'HELLO'
```

대부분의 경우 더 간단한 화살표 함수 `x => x`로 대체할 수 있어요:

```typescript
// identity 대신 화살표 함수 사용 (권장)
const copied = numbers.map(x => x);
const filtered = values.filter(x => x);
```

#### 파라미터

- `value` (`T`): 반환할 값이에요.

#### 반환 값

(`T`): 입력받은 값을 그대로 반환해요.
