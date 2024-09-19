# isPlainObject

주어진 값이 순수 객체(Plain object)인지 확인해요.

## 인터페이스

```typescript
function isPlainObject(object: object): boolean;
```

### 파라미터

- `object` (`object`): 검사할 값.

### 반환 값

(`boolean`): 값이 순수 객체이면 true.

## 예시

```typescript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```

## 성능 비교

|                   | [번들 사이즈](../../bundle-size.md) | [런타임 성능](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 279 바이트 (82.4% 작음)             | 1,505,684 회 (1.70× 빠름)           |
| es-toolkit/compat | 435 바이트 (72.5% 작음)             | 2,013,760 회 (2.28× 빠름)           |
| lodash-es         | 1,586 바이트                        | 882,669 회                          |
