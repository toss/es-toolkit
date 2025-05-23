# isNative

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`value`가 네이티브 함수인지 확인해요.

네이티브 함수는 JavaScript 엔진 자체에 구현된 함수를 의미해요. 예를 들어 `Array.prototype.map`, `Object.keys`, `Function.prototype.bind` 등이 있어요.

## 인터페이스

```typescript
function isNative(value: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): 확인할 값

### 반환 값

(`boolean`): `value`가 네이티브 함수이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isNative } from 'es-toolkit/compat';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
