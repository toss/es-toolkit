# method

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 객체의 `path`에 있는 메서드를 제공된 인자로 호출하는 함수를 생성해요.

## 인터페이스

```typescript
function method(path: PropertyKey | PropertyKey[], ...args: any[]): (object?: unknown) => any;
```

### 파라미터

- `path` (`PropertyKey | PropertyKey[]`): 호출할 메서드의 경로.
- `args` (`...any`): 메서드를 호출할 때 사용할 인수.

### 반환 값

(`(object?: unknown) => any`): 객체를 받아서 `args`로 `path`에 있는 메서드를 호출하는 새 함수.

## 예시

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = method('a.b', 1, 2);
console.log(add(object)); // => 3
```
