# indexOf

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

배열에서 주어진 요소가 첫 번째로 일치하는 인덱스를 찾아요.

`Array.prototype.indexOf`와 거의 같게 동작하는데요, `NaN` 값을 찾을 수 있어요.
`NaN`이 아닌 요소를 비교할 때는 엄격 동등 연산(`===`)을 사용해요.

## 인터페이스

```typescript
function indexOf<T>(array: T[] | null | undefined, searchElement: T, fromIndex?: number): number;
```

### 파라미터

- `array` (`T[] | null | undefined`): 검색할 배열.
- `searchElement` (`T`): 찾을 값.
- `fromIndex` (`number`, 선택): 검색을 시작할 인덱스.

### 반환 값

(`number`): 배열에서 주어진 값과 첫 번째로 일치하는 요소의 인덱스. 일치하는 요소를 찾을 수 없으면 `-1`을 반환해요.

## 예시

```typescript
const array = [1, 2, 3, NaN];
indexOf(array, 3); // => 2
indexOf(array, NaN); // => 3
```
