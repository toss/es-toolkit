# toDefaulted (Lodash 호환성)

::: warning 스프레드 연산자나 `Object.assign`을 사용하세요

이 `toDefaulted` 함수는 깊은 복제와 복잡한 기본값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 스프레드 연산자(`...`)나 `Object.assign()`을 사용하세요.

:::

객체에 기본값들을 적용한 새로운 객체를 만들어요.

```typescript
const defaulted = toDefaulted(object, ...sources);
```

## 레퍼런스

### `toDefaulted(object, ...sources)`

대상 객체에 하나 이상의 소스 객체에서 기본값을 적용한 새로운 객체를 생성하고 싶을 때 `toDefaulted`를 사용하세요. `undefined`인 속성이나 `Object.prototype`에서 오는 속성들에만 기본값이 설정돼요.

```typescript
import { toDefaulted } from 'es-toolkit/compat';

// 기본적인 기본값 설정
const user = { name: 'John' };
const defaults = { name: 'Anonymous', age: 25, role: 'user' };
toDefaulted(user, defaults);
// => { name: 'John', age: 25, role: 'user' }

// 여러 소스에서 기본값 적용
const config = { theme: 'dark' };
const defaults1 = { theme: 'light', lang: 'en' };
const defaults2 = { lang: 'ko', region: 'Asia' };
toDefaulted(config, defaults1, defaults2);
// => { theme: 'dark', lang: 'en', region: 'Asia' }
```

`undefined` 값만 기본값으로 대체하고, `null` 값은 유지해요.

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const data = {
  name: undefined,
  age: null,
  active: false,
};
const defaults = {
  name: 'Default',
  age: 18,
  active: true,
  role: 'user',
};

toDefaulted(data, defaults);
// => { name: 'Default', age: null, active: false, role: 'user' }
```

원본 객체는 변경되지 않고 새로운 객체가 반환돼요.

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const original = { a: 1 };
const result = toDefaulted(original, { a: 2, b: 3 });

console.log(original); // { a: 1 } (변경되지 않음)
console.log(result); // { a: 1, b: 3 } (새로운 객체)
```

#### 파라미터

- `object` (`object`): 기본값을 적용받을 대상 객체예요.
- `sources` (`object[]`): 기본값을 제공하는 소스 객체들이에요. 왼쪽에서 오른쪽 순서로 적용돼요.

#### 반환 값

(`object`): 기본값이 적용된 새로운 객체를 반환해요.
