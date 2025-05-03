# cloneWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](mdc:../../../compatibility.md)해요.
:::

주어진 객체의 얕은 복사본을 만들되, 사용자 정의 함수를 통해 복사 방식을 커스터마이즈할 수 있어요. 이 메서드는 `clone`과 비슷하지만, 복제된 값을 생성하기 위한 커스터마이저 함수를 받을 수 있다는 점이 달라요. 만약 커스터마이저가 undefined를 반환하면, 기본 복제 방식을 사용해요.

커스터마이저를 제공하지 않으면 `clone`과 동일하게 동작해요.

## 인터페이스

```typescript
function cloneWith<T>(value: T, customizer?: (value: any) => any): T;
```

### 파라미터

- `value` (`T`): 복제할 값이에요.
- `customizer` (`Function`): 선택사항이에요. 복제 방식을 커스터마이즈하는 함수예요.

### 반환 값

(`T`): 주어진 객체의 얕은 복사본을 반환해요.

## 예시

```typescript
const num = 29;
const clonedNum = cloneWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = cloneWith(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = cloneWith(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false

const obj2 = { a: 1, b: 2 };
const clonedObjWithCustomizer = cloneWith(obj2, value => {
  if (typeof value === 'number') {
    return value * 2; // 숫자를 2배로 만들기
  }
  // undefined를 반환하면 기본 복제 방식을 사용해요
});
console.log(clonedObj2); // { a: 2, b: 4 }
```
