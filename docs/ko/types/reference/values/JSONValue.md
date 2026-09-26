# JSONValue

JSON으로 주고받을 수 있는 값이에요.

```typescript
type Value = JSONValue;
```

## 사용법

### `JSONValue`

API 응답이나 설정 파일처럼 JSON으로 오가는 데이터에 사용하세요. 함수나 `Date`, `undefined`는 `JSON.stringify`를 거치면 원래 모습이 사라지기 때문에 넣을 수 없어요.

```typescript
import type { JSONValue } from 'es-toolkit/types';

declare function parse(text: string): JSONValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JSONValue
}

const ok: JSONValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JSONValue = { at: new Date() }; // Date는 JSON으로 못 담아서 에러가 나요.

// 객체 형태만 받고 싶다면 Record로 감싸서 쓰세요.
declare function send(body: Record<string, JSONValue>): void;
```

#### 주의할 점

`NaN`과 `Infinity`는 `number`라서 타입 검사는 통과하지만, `JSON.stringify`를 거치면 `null`이 돼요. 타입으로는 막을 수 없으니 값을 만들 때 조심하세요.
