# invertBy

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 객체의 키와 값을 [invert](../../object/invert.md) 함수처럼 뒤집은 새로운 객체를 생성해요.

값이 어떻게 키로 뒤집힐지를 `iteratee` 함수로 지정해요. `iteratee` 함수가 주어지지 않으면, 값이 그대로 키로 사용돼요.

새로운 객체의 값은, `iteratee` 함수가 반환한 값이 같은 키들의 배열이 돼요.

## 인터페이스

```typescript
function invertBy<K extends PropertyKey, V>(object: Record<K, V>, iteratee?: (value: V) => string): Record<string, K[]>;
```

### 파라미터

- `object` (`Record<K, V>`): 값을 뒤집을 객체.
- `iteratee` (`(value: V) => string`): 객체의 키로 뒤집힐 값을 다른 문자열로 바꾸는 방법을 지정하는 함수. 제공되지 않으면, 값이 그대로 키로 뒤집혀요.

### 반환 값

(`Record<string, K[]>`): 키와 값이 뒤집힌 객체. 키는 `iteratee` 함수로 변환된 값이 되고, 값은 `iteratee` 함수가 반환한 값이 같은 키들의 배열이에요.

## 예시

```typescript
const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj);
// result => { '1': ['a', 'c'], '2': ['b'] }

const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj, value => `group${value}`);
// result => { 'group1': ['a', 'c'], 'group2': ['b'] }
```
