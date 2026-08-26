# JsonValue

`JSON.parse`가 만들어낼 수 있는 모든 값이에요.

```typescript
type Value = JsonValue;
```

## 사용법

### `JsonValue`

API 응답이나 설정 파일처럼 JSON을 거쳐 오가는 데이터에 사용하세요. 함수, `Date`, `undefined`, 클래스 인스턴스는 JSON을 왕복하면 살아남지 못해서 제외돼요.

```typescript
import type { JsonValue } from 'es-toolkit/types';

declare function parse(text: string): JsonValue;

const value = parse('{"a":[1,null]}');
if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
  const a = value.a; // JsonValue
}

const ok: JsonValue = { name: 'toss', tags: ['a', 'b'], count: null };

// const bad: JsonValue = { at: new Date() }; // 에러예요. Date는 JSON이 아니에요.

// JSON 객체만 받고 싶다면 Record를 쓰세요.
declare function send(body: Record<string, JsonValue>): void;
```

#### 타입 파라미터

- `NaN`과 `Infinity`는 `number`이지만 JSON에서는 쓸 수 없어요. 타입으로는 이 차이를 표현할 수 없어요.
