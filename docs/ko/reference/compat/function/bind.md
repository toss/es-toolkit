# bind

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

함수의 `this`를 고정하고, `partialArgs`로 미리 인자를 제공해요.

Symbol 타입의 `bind.placeholder`를 쓰면, 미리 제공한 인자가 사용될 위치를 결정할 수 있어요.

내장 `Function#bind` 과는 다르게, 함수의 `length` 프로퍼티는 설정하지 않아요.

## 인터페이스

```typescript
function bind<F extends Function>(func: F, thisObj?: unknown, ...partialArgs: any[]): F;

namespace bind {
  placeholder: symbol;
}
```

### 파라미터

- `func` (`F`): `this` 를 고정할 함수.
- `thisObj` (`any`, optional): 함수에 고정될 `this` 객체.
- `partialArgs` (`any[]`): 미리 주어질 인자.

### 반환 값

(`F`): `this`가 고정된 함수.

## 예시

```typescript
import { bind } from 'es-toolkit/compat';

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: 'fred' };

let bound = bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// Bound with placeholders.
bound = bind(greet, object, bind.placeholder, '!');
bound('hi');
// => 'hi fred!'
```
