# bindKey (Lodash 호환성)

::: warning 화살표 함수나 `bind` 메소드를 사용하세요

이 `bindKey` 함수는 동적 메소드 바인딩과 플레이스홀더 처리로 인해 복잡하고 느리게 동작해요. JavaScript의 기본 `bind` 메소드나 화살표 함수를 사용하면 더 간단하고 성능이 좋아요.

대신 더 빠르고 현대적인 화살표 함수나 `Function.prototype.bind`를 사용하세요.

:::

객체의 메소드를 바인딩하되, 나중에 재정의될 수 있는 메소드를 참조할 수 있게 해요.

```typescript
const bound = bindKey(object, key, ...partialArgs);
```

## 사용법

### `bindKey(object, key, ...partialArgs)`

객체의 메소드를 바인딩하면서도 메소드가 나중에 변경될 수 있게 하고 싶을 때 `bindKey`를 사용하세요. 일반적인 `bind`와 달리 메소드를 호출할 때마다 최신 메소드를 참조해요.

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// 메소드를 바인딩해요.
let bound = bindKey(object, 'greet', 'hi');
bound('!');
// Returns: 'hi fred!'

// 메소드를 재정의해요.
object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

// 바인딩된 함수가 새로운 메소드를 호출해요.
bound('!');
// Returns: 'hiya fred!'
```

플레이스홀더를 사용하여 인자의 위치를 예약할 수 있어요.

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

// 플레이스홀더를 사용해요.
const bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// Returns: 'hi fred!'
```

부분 적용된 인자들이 먼저 전달되고, 그 다음에 호출 시 전달된 인자가 추가돼요.

```typescript
import { bindKey } from 'es-toolkit/compat';

const object = {
  add: function (a, b, c) {
    return a + b + c;
  },
};

// 첫 번째 인자를 미리 설정해요.
const bound = bindKey(object, 'add', 10);
bound(20, 30);
// Returns: 60 (10 + 20 + 30)
```

#### 파라미터

- `object` (`object`): 메소드를 호출할 객체예요.
- `key` (`string`): 호출할 메소드의 키예요.
- `...partialArgs` (`any[]`, 선택): 메소드에 미리 전달할 인자들이에요. `bindKey.placeholder`를 사용하여 인자 위치를 예약할 수 있어요.

#### 반환 값

(`(...args: any[]) => any`): 바인딩된 새로운 함수를 반환해요. 이 함수는 호출될 때마다 객체의 최신 메소드를 참조해요.
