# methodOf (Lodash 호환성)

::: warning 직접 메서드 호출 권장

객체의 메서드를 호출할 때는 직접 호출하거나 Function.prototype.call을 사용하는 것이 더 명확하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 직접 메서드 호출을 사용하세요.

:::

주어진 경로에 있는 객체의 메서드를 미리 정의된 파라미터로 호출하는 함수를 만들어요.

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = methodOf(object, 1, 2);
console.log(add('a.b')); // => 3
```

## 레퍼런스

### `methodOf(object: object, ...args: any[]): (path: PropertyKey | PropertyKey[]) => any`

객체의 메서드를 미리 정의된 파라미터로 호출하는 함수를 생성해요.

#### 파라미터

- `object` (`object`): 조회할 객체
- `args` (`...any`): 메서드를 호출할 때 사용할 인수

### 반환 값

(`(path: PropertyKey | PropertyKey[]) => any`): 경로를 받아 메서드를 호출하는 새로운 함수
