# isNative

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
import { isNative } from 'es-toolkit/predicate';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
