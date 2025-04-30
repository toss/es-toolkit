# countBy

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`iteratee`를 통해 `collection`의 각 요소를 실행한 결과에서 생성된 키로 구성된 객체를 만듭니다.
각 키에 해당하는 값은 해당 키가 반환된 횟수예요.

## 인터페이스

```typescript
function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: ArrayLike<T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
function countBy<T, K extends PropertyKey = PropertyKey>(
  collection: Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
function countBy<T, K extends PropertyKey>(
  collection: ArrayLike<T> | Record<PropertyKey, T> | null | undefined,
  iteratee?: ((item: T) => K) | keyof T | [keyof T, K] | Partial<T> | null | undefined
): Record<K, number>;
```

### 반환 값

(`undefined`): undefined

## 예시

```typescript
countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length'); // => { '3': 2, '5': 1 }
countBy({ a: 'apple', b: 'banana' }, v => v[0]); // => { 'a': 1, 'b': 1 }
```
