# noop

아무것도 하지 않는 함수예요. 함수를 요구하는 곳에 빈 자리를 채우기 위해 사용하거나, 기본값으로 사용할 수 있어요.

## 인터페이스

```typescript
function noop(): void;
```

### 반환 값

(`void`): 이 함수는 아무것도 반환하지 않아요.

## 예시

```typescript
import { noop } from 'es-toolkit/function';

interface Props {
  onChange?: () => void;
}

function MyComponent({ onChange = noop }: Props) {
  // 여기서 onChange는 undefined일 수 없어서, 자유롭게 부를 수 있어요.
  onChange();
}
```
