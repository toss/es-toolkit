# bindKey

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`object[key]` 메서드의 `this`를 고정하고, `partialArgs`로 미리 인자를 제공해요.

Symbol 타입의 `bindKey.placeholder`를 쓰면, 미리 제공한 인자가 사용될 위치를 결정할 수 있어요.

[`bind`](./bind.md) 함수와는 다르게, 고정된 함수가 아직 정의되지 않거나 재정의된 메서드를 참조하게 할 수 있어요.

## 인터페이스

```typescript
function bindKey<T extends Record<PropertyKey, any>, K extends keyof T>(
  object: T,
  key: K,
  ...partialArgs: any[]
): T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never;

namespace bindKey {
  placeholder: symbol;
}
```

### 파라미터

- `object` (`T`): `this` 를 고정하고 메서드를 호출할 객체.
- `key` (`K`): 고정할 메서드의 키.
- `partialArgs` (`any[]`): 미리 주어질 인자.

### 반환 값

(`T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never`): `this`가 고정된 함수.

## 예시

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

let bound = bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// Bound with placeholders.
bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// => 'hiya fred!'
```
