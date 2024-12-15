# asyncNoop

비동기적으로 아무것도 하지 않는 함수예요. 함수를 요구하는 곳에 빈 자리를 채우기 위해 사용하거나, 기본값으로 사용할 수 있어요.

## 인터페이스

```typescript
function asyncNoop(): Promise<void>;
```

### 반환 값

(`Promise<void>`): `undefined`로 이행하는 `Promise`.

## 예시

```typescript
import { asyncNoop } from 'es-toolkit/function';

interface Props {
  fetchData?: () => Promise<void>;
}

function MyComponent({ fetchData = asyncNoop }: Props) {
  const handleFetchData = async () => {
    // 여기서 fetchData는 undefined일 수 없어서, 자유롭게 부를 수 있어요.
    await fetchData();
  };

  handleFetchData();
}
```
