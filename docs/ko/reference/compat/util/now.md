# now

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

1970년 1월 1일 00:00:00 UTC 이후 경과된 밀리초를 반환해요.

## 인터페이스

```typescript
function now(): number;
```

### 반환 값

(`number`): 1970년 1월 1일 00:00:00 UTC 이후 경과된 밀리초.

## 예시

```typescript
const currentTime = now();
console.log(currentTime); // Outputs the current time in milliseconds

const startTime = now();
// Some time-consuming operation
const endTime = now();
console.log(`Operation took ${endTime - startTime} milliseconds`);
```
