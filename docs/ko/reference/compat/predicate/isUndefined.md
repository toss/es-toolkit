# isUndefined (Lodash 호환성)

::: warning es-toolkit의 [ isUndefined](../../predicate/isUndefined.md)를 사용하세요

이 `isUndefined` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isUndefined](../../predicate/isUndefined.md)를 사용하세요.

:::

값이 `undefined`인지 확인해요.

```typescript
const result = isUndefined(value);
```

## 사용법

### `isUndefined(x)`

값이 정확히 `undefined`인지 타입 안전하게 확인하고 싶을 때 `isUndefined`를 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isUndefined } from 'es-toolkit/compat';

// undefined만 true
isUndefined(undefined); // true

// null도 false
isUndefined(null); // false

// 다른 모든 값들도 false
isUndefined(0); // false
isUndefined(''); // false
isUndefined(false); // false
isUndefined([]); // false
isUndefined({}); // false
isUndefined('undefined'); // false
isUndefined(NaN); // false
```

`undefined`와 `null`을 구분해서 확인할 수 있어요.

```typescript
import { isUndefined } from 'es-toolkit/compat';

function handleValue(value: string | null | undefined) {
  if (isUndefined(value)) {
    console.log('값이 undefined에요');
  } else if (value === null) {
    console.log('값이 명시적으로 null이에요');
  } else {
    console.log(`값이 있어요: ${value}`);
  }
}

handleValue(undefined); // "값이 undefined에요"
handleValue(null); // "값이 명시적으로 null이에요"
handleValue('hello'); // "값이 있어요: hello"
```

선언되지 않은 변수나 초기화되지 않은 속성을 확인할 때 유용해요.

```typescript
import { isUndefined } from 'es-toolkit/compat';

const obj: { name?: string; age?: number } = { name: 'John' };

if (isUndefined(obj.age)) {
  console.log('나이가 설정되지 않았어요');
  obj.age = 25; // 기본값 설정
}

// 함수 매개변수의 기본값 처리
function greet(name: string, title?: string) {
  if (isUndefined(title)) {
    title = '님';
  }
  console.log(`안녕하세요, ${name}${title}!`);
}

greet('김철수'); // "안녕하세요, 김철수님!"
greet('김철수', '선생'); // "안녕하세요, 김철수선생!"
```

#### 파라미터

- `x` (`any`): `undefined`인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 `undefined`이면 `true`, 아니면 `false`를 반환해요.
