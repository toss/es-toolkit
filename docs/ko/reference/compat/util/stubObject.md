# stubObject (Lodash 호환성)

::: warning 객체 리터럴 `{}`를 사용하세요

이 `stubObject` 함수는 불필요한 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 객체 리터럴 `{}`를 사용하세요.

:::

항상 새로운 빈 객체를 반환해요.

```typescript
const emptyObject = stubObject();
```

## 레퍼런스

### `stubObject()`

매번 새로운 빈 객체가 필요할 때 `stubObject`를 사용하세요. 기본값으로 빈 객체를 제공하거나 콜백 함수에서 일관된 빈 객체를 반환할 때 유용해요.

```typescript
import { stubObject } from 'es-toolkit/compat';

// 기본값으로 빈 객체 제공
function processConfig(config = stubObject()) {
  return {
    ...config,
    processed: true
  };
}

processConfig(); // { processed: true }
processConfig({ name: 'test' }); // { name: 'test', processed: true }
```

콜백 함수에서 일관된 빈 객체를 반환할 때도 사용할 수 있어요.

```typescript
import { stubObject } from 'es-toolkit/compat';

// 조건에 따른 객체 반환
const getSettings = (hasSettings: boolean) => {
  return hasSettings ? { theme: 'dark', lang: 'ko' } : stubObject();
};

getSettings(true); // { theme: 'dark', lang: 'ko' }
getSettings(false); // {}
```

#### 파라미터

없음.

### 반환 값

(`{}`): 새로운 빈 객체를 반환해요.
