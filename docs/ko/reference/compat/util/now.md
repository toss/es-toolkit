# now (Lodash 호환성)

::: warning Date.now 사용 권장

현재 시간을 밀리초로 가져올 때는 Date.now()를 직접 사용하는 것이 더 명확하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 Date.now()를 사용하세요.

:::

1970년 1월 1일 00:00:00 UTC 이후 경과된 밀리초를 반환해요.

```typescript
const currentTime = now();
console.log(currentTime); // 현재 시간을 밀리초로 출력
```

## 레퍼런스

### `now(): number`

현재 시간을 밀리초로 반환해요.

### 반환 값

(`number`): 1970년 1월 1일 00:00:00 UTC 이후 경과된 밀리초
