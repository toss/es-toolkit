# asyncNoop

비동기적으로 아무것도 하지 않는 함수예요.

```typescript
const promise = asyncNoop();
```

::: info [`noop`](./noop.md) 함수

동기적으로 아무것도 하지 않는 함수가 필요하다면, 바로 `void`를 반환하는 `noop` 함수를 사용하세요.

:::

## 사용법

### `asyncNoop()`

비동기 함수가 필요한 곳에 빈 자리를 채우거나 기본값으로 사용하고 싶을 때 `asyncNoop`을 사용하세요. `undefined`로 이행하는 `Promise`를 반환해요.

```typescript
import { asyncNoop } from 'es-toolkit/function';

// 기본값으로 사용하는 예시
interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // fetchData는 항상 함수이므로 안전하게 호출할 수 있어요
    await fetchData();
  };

  handleFetchData();
}

// 직접 호출하는 예시
asyncNoop();
// Returns: Promise<void>

await asyncNoop();
// Returns: undefined
```

#### 반환 값

(`Promise<void>`): `undefined`로 이행하는 `Promise`예요.
