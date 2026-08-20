# UnknownRecord

키도 값도 알 수 없는 객체예요.

```typescript
type Data = UnknownRecord;
```

## 사용법

### `UnknownRecord`

`{}` 대신 사용하세요. `{}`는 이름과 달리 `null`과 `undefined`만 빼고 숫자나 문자열까지 전부 받아요. 값이 `unknown`이라 꺼내 쓰려면 먼저 확인해야 해요.

```typescript
import type { UnknownRecord } from 'es-toolkit/types';

function log(data: UnknownRecord) {
  if (typeof data.id === 'string') {
    console.log(data.id);
  }
}

log({ id: '1' }); // 통과해요

// log(42); // 에러예요. `{}`였다면 통과했을 거예요.
```

#### 타입 파라미터

- 인덱스 시그니처가 있는 타입만 대입할 수 있어요. `interface`는 키를 하나씩 선언하기 때문에 거절되니, 호출하는 쪽에서 `interface`를 넘길 수 있다면 `object`로 받거나 호출부에서 펼쳐서 넘기세요.
