# at

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체의 `paths`에 해당하는 값들의 배열을 반환합니다.

## 인터페이스

```typescript
function at<T>(object: T, ...paths: Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>): unknown[];
```

### 파라미터

- `object` (`T`): 순회할 객체입니다.
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): 선택할 속성 경로들입니다. 각 경로는 문자열, 숫자, 심볼 또는 이들의 배열이나 유사 배열 객체가 될 수 있습니다.

### 반환 값

(`unknown[]`): 지정된 경로들에 해당하는 값들의 배열을 반환합니다.

## 예시

```js
const object = { a: [{ b: { c: 3 } }, 4] };

at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]

// 경로를 인자로 직접 제공할 수도 있습니다
at(object, 'a[0].b.c', 'a[1]');
// => [3, 4]

// 배열에서도 작동합니다
const array = [1, 2, 3];
at(array, 0, 2);
// => [1, 3]

// 존재하지 않는 경로에 대해서는 undefined를 반환합니다
at(object, 'a.b.c');
// => [undefined]

// 경로를 배열로 제공하면 평면화됩니다
at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
```
