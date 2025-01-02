# invoke

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`object`의 `path`에 있는 메서드를 주어진 인수로 호출해요.

## 인터페이스

```typescript
function invoke(object: unknown, path: PropertyKey | PropertyKey[], args: any[]): any;
```

### 파라미터

- `object` (`unknown`): 메서드를 호출할 객체.
- `path` (`PropertyKey | PropertyKey[]`): 호출할 메서드의 경로.
- `args` (`any[]`): 메서드를 호출할 때 사용할 인수.

### 반환 값

(`any`): 호출된 메서드의 결과.

## 예시

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

invoke(object, 'a.b', [1, 2]); // => 3
invoke(object, ['a', 'b'], [1, 2]); // => 3
```
