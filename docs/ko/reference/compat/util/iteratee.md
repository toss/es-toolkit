# iteratee

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

요소에서 값을 반환하는 함수를 만들어요.

`iteratee` 함수에 주어지는 파라미터의 종류에 따라서 반환하는 함수의 동작이 달라져요.

- **함수**: 주어진 함수를 있는 그대로 반환해요.
- **프로퍼티 이름**: 요소에서 주어진 프로퍼티의 값을 반환해요.
- **프로퍼티-값 쌍**: 요소의 프로퍼티가 주어진 값과 일치하는지 여부를 나타내는 참/거짓 값을 반환해요.
- **부분 객체**: 요소가 부분 객체의 프로퍼티와 값에 일치하는지 여부를 나타내는 참/거짓 값을 반환해요.

아무 인수도 제공하지 않거나 `null`을 전달하면, 이 함수는 [요소를 있는 그대로 반환하는 함수](../../function/identity.md)를 반환해요.

## 인터페이스

```typescript
function iteratee(value?: null): (value: T) => T;
function iteratee<F extends (...args: any[]) => unknown>(func: F): F;
function iteratee(value: symbol | number | string | object): (...args: any[]) => any;
function iteratee(
  value?: symbol | number | string | object | null | ((...args: any[]) => unknown)
): (...args: any[]) => any;
```

### 파라미터

- `value` (`symbol | number | string | object | null | ((...args: any[]) => any)`): iteratee로 변환할 값이에요. 문자열.

### 반환 값

(`(...args: any[]) => unknown`): 새로운 iteratee 함수를 반환해요. 문자열.

## 예시

```typescript
const func = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [{ a: 1 }, { a: 2 }, { a: 3 }]

const func = iteratee((object) => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func) // => [1, 2, 3]

const func = iteratee({ a: 1 });
[{ a: 1 }, { a: 2 }, { a: 3 }].find(func) // => { a: 1 }

const func = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(func) // => { a: 1 }
```
