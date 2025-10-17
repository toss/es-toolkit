# join (Lodash 호환성)

::: warning `Array.prototype.join()`을 사용하세요

이 `join` 함수는 ArrayLike 객체 처리, null/undefined 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.join()`을 사용하세요.

:::

배열의 요소를 문자열로 결합해요.

## 인터페이스

```typescript
function join<T>(array: T[], separator?: string): string;
```

### 파라미터

- `array` (`T[]`) - 결합할 배열이에요.

::: info `array`는 `ArrayLike<T>`이거나 `null` 또는 `undefined`일 수 있어요

lodash와 완전히 호환되도록 `join` 함수는 `array`를 다음과 같이 처리해요.

- `array`가 `ArrayLike<T>`인 경우, 배열로 변환하기 위해 `Array.from(...)`을 사용해요.
- `array`가 `null` 또는 `undefined`인 경우, 빈 배열로 간주돼요.

:::

- `separator` (`string`) - 요소를 결합하는 데 사용하는 구분자. 기본값은 쉼표(,)예요.

#### 반환 값

(`string`): 지정된 구분자로 배열의 모든 요소가 결합된 문자열을 반환해요.

## 예시

```typescript
const arr = ['a', 'b', 'c'];
const result = join(arr, '~');
console.log(result); // Output: "a~b~c"
```
