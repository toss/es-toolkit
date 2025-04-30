# forInRight

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체를 역순으로 순회하면서 각 속성에 대해 `iteratee` 함수를 호출해요.

상속 받은 속성을 포함한 문자열 키를 가진 속성을 역순으로 순회해요.

`iteratee` 함수가 `false`를 반환하면 순회를 조기에 종료해요.

## 인터페이스

```typescript
function forInRight<T>(object: T, iteratee?: (value: T[keyof T], key: string, collection: T) => any): T;
function forInRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### 파라미터

- `object` (`T | null | undefined`): 순회할 객체
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 각 속성마다 호출될 함수. 기본값은 `identity` 함수

### 반환 값

(`T | null | undefined`): `object`를 반환해요.

## 예시

```typescript
import { forInRight } from 'es-toolkit/compat';

function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
};

// Shape의 인스턴스 생성
const square = new Shape();

// 객체의 모든 열거 가능한 속성(상속된 속성 포함)에 대해 역순으로 반복
forInRight(square, function (value, key) {
  console.log(key, value);
});
// 출력 순서는 역순:
// 'move', [Function]
// 'y', 0
// 'x', 0

// 반복자 함수가 false를 반환하면 반복이 중단됨
forInRight(square, function (value, key) {
  console.log(key, value);
  return key !== 'y'; // 'y'를 만나면 중단
});
// 출력:
// 'move', [Function]
// 'y', 0
```
