# cloneDeepWith

주어진 값을 사용자 정의 함수를 통해 깊게 복사해요.

```typescript
const customCloned = cloneDeepWith(obj, cloneValue);
```

## 레퍼런스

### `cloneDeepWith(obj, cloneValue)`

객체나 배열을 깊게 복사할 때 특정 값들에 대해서는 사용자 정의 방식으로 복사하고 싶을 때 `cloneDeepWith`를 사용하세요. 사용자 정의 함수 `cloneValue`가 값을 반환하면 그 값을 사용하고, `undefined`를 반환하면 기본 방식으로 복사해요.

```typescript
import { cloneDeepWith } from 'es-toolkit/object';

// 숫자는 2배로 만들어서 복사
const obj = { a: 1, b: { c: 2, d: 'text' } };
const clonedObj = cloneDeepWith(obj, (value) => {
  if (typeof value === 'number') {
    return value * 2;
  }
  // undefined를 반환하면 기본 방식으로 복사
});
console.log(clonedObj); // { a: 2, b: { c: 4, d: 'text' } }

// 배열의 모든 요소에 1을 더해서 복사
const arr = [1, [2, 3], { num: 4 }];
const clonedArr = cloneDeepWith(arr, (value) => {
  if (typeof value === 'number') {
    return value + 1;
  }
});
console.log(clonedArr); // [2, [3, 4], { num: 5 }]
```

사용자 정의 함수는 현재 값, 키, 원본 객체, 내부 스택을 인수로 받아요:

```typescript
const data = { 
  user: { name: 'Alice', age: 30 },
  settings: { theme: 'dark', lang: 'ko' }
};

const result = cloneDeepWith(data, (value, key, obj, stack) => {
  // 'user' 객체는 특별한 방식으로 복사
  if (key === 'user' && typeof value === 'object') {
    return { ...value, cloned: true };
  }
  
  // 문자열에 prefix 추가
  if (typeof value === 'string') {
    return `cloned_${value}`;
  }
});

console.log(result);
// {
//   user: { name: 'cloned_Alice', age: 30, cloned: true },
//   settings: { theme: 'cloned_dark', lang: 'cloned_ko' }
// }
```

Date 객체에만 특별한 처리를 할 수도 있어요:

```typescript
const data = {
  created: new Date('2023-01-01'),
  updated: new Date('2023-12-31'),
  name: 'Document'
};

const cloned = cloneDeepWith(data, (value) => {
  // Date 객체는 시간을 1년 뒤로 설정
  if (value instanceof Date) {
    const newDate = new Date(value);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
});

console.log(cloned.created.getFullYear()); // 2024
console.log(cloned.updated.getFullYear()); // 2024
```

#### 파라미터

- `obj` (`T`): 깊게 복사할 값이에요.
- `cloneValue` (`(value: any, key: PropertyKey | undefined, obj: T, stack: Map<any, any>) => any`): 사용자 정의 복사 함수예요. 복사할 값을 반환하거나, 기본 방식을 사용하려면 `undefined`를 반환해주세요.
  - `value`: 현재 복사되고 있는 값이에요.
  - `key`: 현재 복사되고 있는 값의 속성 이름이에요.
  - `obj`: 복사할 원본 객체예요.
  - `stack`: 순환 참조를 처리하기 위한 내부 스택이에요.

#### 반환 값

(`T`): 사용자 정의 함수를 통해 처리된 깊은 복사본이에요.
