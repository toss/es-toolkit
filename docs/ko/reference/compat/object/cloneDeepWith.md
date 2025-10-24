# cloneDeepWith (Lodash 호환성)

::: warning 커스텀 로직 구현을 권장해요

이 `cloneDeepWith` 함수는 복잡한 커스터마이저 함수와 깊은 복사 처리로 인해 상대적으로 느려요.

대신 `cloneDeep`과 커스텀 로직을 직접 구현하는 방식을 사용하세요.

:::

커스터마이저 함수를 사용해서 객체의 깊은 복사본을 만들어요.

```typescript
const cloned = cloneDeepWith(value, customizer);
```

## 레퍼런스

### `cloneDeepWith(value, customizer?)`

깊은 복사 방식을 커스터마이징하고 싶을 때 `cloneDeepWith`를 사용하세요. 커스터마이저 함수로 특정 값들의 복사 방식을 제어할 수 있어요.

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

// 기본 사용법 (커스터마이저 없음)
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};
const cloned = cloneDeepWith(obj);
// Returns: { a: 1, b: { c: 2 } } (완전히 새로운 인스턴스들)

// Date 객체 특별 처리
const obj2 = {
  name: 'test',
  createdAt: new Date('2023-01-01'),
  nested: {
    updatedAt: new Date('2023-12-31'),
  },
};
const cloned2 = cloneDeepWith(obj2, value => {
  if (value instanceof Date) {
    // Date를 타임스탬프 숫자로 변환
    return value.getTime();
  }
  // undefined 반환 시 기본 깊은 복사 방식 사용
});
// Returns: {
//   name: 'test',
//   createdAt: 1672531200000,
//   nested: { updatedAt: 1703980800000 }
// }

// 배열 요소 변환
const arr = [1, [2, 3], { a: 4, b: [5, 6] }];
const clonedArr = cloneDeepWith(arr, value => {
  if (typeof value === 'number') {
    return value * 10;
  }
});
// Returns: [10, [20, 30], { a: 40, b: [50, 60] }]

// 함수 처리
const objWithFunc = {
  data: { count: 1 },
  increment: function () {
    this.data.count++;
  },
};
const clonedWithFunc = cloneDeepWith(objWithFunc, value => {
  if (typeof value === 'function') {
    // 함수를 문자열로 변환
    return value.toString();
  }
});
// Returns: {
//   data: { count: 1 },
//   increment: "function() { this.data.count++; }"
// }
```

순환 참조와 커스터마이저 조합:

```typescript
import { cloneDeepWith } from 'es-toolkit/compat';

const obj = { a: 1, b: { c: 2 } };
obj.b.self = obj; // 순환 참조

const cloned = cloneDeepWith(obj, value => {
  if (typeof value === 'number') {
    return value + 100;
  }
});

console.log(cloned.a); // 101
console.log(cloned.b.c); // 102
console.log(cloned.b.self === cloned); // true (순환 참조 유지)
```

#### 파라미터

- `value` (`T`): 깊은 복사할 값이에요.
- `customizer` (`function`, 선택적): 복사 방식을 결정하는 함수예요. `(value: any, key?: string, object?: any, stack?: Map<any, any>) => any` 형태예요.

#### 반환 값

(`T`): 커스터마이저에 의해 처리된 깊은 복사본을 반환해요.
