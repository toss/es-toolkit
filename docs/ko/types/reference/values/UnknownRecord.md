# UnknownRecord

어떤 키가 들어 있는지 모르는 객체예요.

```typescript
type Data = UnknownRecord;
```

## 사용법

### `UnknownRecord`

`{}` 대신 사용하세요. `{}`는 생긴 것과 달리 빈 객체라는 뜻이 아니라서, `null`과 `undefined`만 빼면 숫자나 문자열까지 다 통과해요.

값이 `unknown`이라 바로 쓸 수는 없고, 무슨 타입인지 확인한 다음에 써야 해요.

```typescript
import type { UnknownRecord } from 'es-toolkit/types';

function log(data: UnknownRecord) {
  if (typeof data.id === 'string') {
    console.log(data.id);
  }
}

log({ id: '1' }); // 잘 통과해요

// log(42); // 숫자라서 에러가 나요. `{}`로 받았다면 그냥 통과했을 거예요.
```

#### 주의할 점

인덱스 시그니처가 있는 타입만 대입할 수 있어요. `interface`는 키를 하나씩 선언하기 때문에 거절돼요.

```typescript
interface Payload {
  id: string;
}

type PayloadAlias = { id: string };

declare const payload: Payload;
declare const alias: PayloadAlias;

const a: UnknownRecord = alias; // 잘 통과해요
// const b: UnknownRecord = payload; // 모양은 같은데 인덱스 시그니처가 없어서 에러가 나요.
```

`interface`가 들어올 수 있는 자리라면 `object`로 받으세요. 아니면 넘기는 쪽에서 `{ ...payload }`처럼 펼쳐서 주면 돼요.
