# functionsIn

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](mdc:../../../compatibility.md)해요.
:::

객체의 자체 속성과 상속된 열거 가능한 속성에서 함수 속성 이름들의 배열을 생성해요.

## 시그니처

```typescript
function functionsIn(object: any): string[];
```

### 파라미터

- `object`: 검사할 객체예요.

### 반환 값

(`string[]`): 객체의 자체 속성과 상속된 열거 가능한 속성에서 함수 속성 이름들의 배열을 반환해요.

## 예시

```typescript
import { functionsIn } from 'es-toolkit/compat';

function Foo() {
  this.a = function () {
    return 'a';
  };
  this.b = function () {
    return 'b';
  };
}

Foo.prototype.c = function () {
  return 'c';
};

// 상속된 함수를 포함한 함수 속성 이름들을 가져와요
functionsIn(new Foo());
// => ['a', 'b', 'c']

// 일반 객체에서도 동작해요
const object = {
  a: function () {
    return 'a';
  },
  b: function () {
    return 'b';
  },
};

functionsIn(object);
// => ['a', 'b']

// 객체가 아닌 경우 빈 배열을 반환해요
functionsIn(null);
// => []
functionsIn(undefined);
// => []
functionsIn(1);
// => []
```
