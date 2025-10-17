# isMatch

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`target`이 `source`의 모양 및 값을 포함하는지 확인해요. 객체, 배열, `Map`, `Set`의 깊은 비교를 지원해요.

`source`의 모든 속성/요소가 `target`에 존재하고 일치하면 `true`를 반환해요. `target`이 `source`보다 더 많은 속성/요소를 가지고 있어도 괜찮아요.

## 인터페이스

```typescript
function isMatch(target: unknown, source: unknown): boolean;
```

### 파라미터

- `target` (`unknown`): 검사할 대상 값.
- `source` (`unknown`): 대상에 포함되어야 할 모양과 값을 가진 패턴.

### 반환 값

(`boolean`): `target`이 `source`의 모든 속성/요소를 포함하면 `true`. 아니면 `false`.

## 예시

### 객체 일치

```typescript
isMatch({ a: 1, b: 2 }, { a: 1 }); // true
```

### 배열 일치

```typescript
isMatch([1, 2, 3], [1, 2, 3]); // true
isMatch([1, 2, 2, 3], [2, 2]); // true
isMatch([1, 2, 3], [2, 2]); // false
```

### `Map` 일치

```typescript
const targetMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
const sourceMap = new Map([['key1', 'value1']]);
isMatch(targetMap, sourceMap); // true
```

### `Set` 일치

```javascript
const targetSet = new Set([1, 2, 3]);
const sourceSet = new Set([1, 2]);
isMatch(targetSet, sourceSet); // true
```
