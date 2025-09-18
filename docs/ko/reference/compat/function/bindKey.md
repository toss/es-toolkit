# bindKey (Lodash 호환성)

::: warning `bind` 메소드나 화살표 함수를 사용하세요

이 `bindKey` 함수는 동적 메소드 바인딩을 위한 복잡한 로직을 처리해요. 대부분의 경우 더 간단한 방법으로 대체할 수 있어요.

대신 더 빠르고 현대적인 `Function.prototype.bind()`나 화살표 함수를 사용하세요.

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
