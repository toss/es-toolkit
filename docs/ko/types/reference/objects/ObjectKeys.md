# ObjectKeys

`Object.keys`가 반환하는 형태 그대로 객체의 키를 유니온으로 만들어요. `keyof`와 달리 숫자 키는 문자열로 변환되고 심볼 키는 제외돼요. 객체의 키가 항상 문자열인 JavaScript의 런타임 동작과 일치해요.

```typescript
type Keys = ObjectKeys<T>;
```

## 사용법

### `ObjectKeys<T>`

`Object.keys`, `Object.entries`, `for...in` 루프가 런타임에 실제로 만들어내는 값과 일치하는 키 타입이 필요할 때 사용하세요. TypeScript가 기본적으로 `string[]`으로 넓혀버리는 `Object.keys`의 결과에 타입을 붙일 때 특히 유용해요.

```typescript
import type { ObjectKeys } from 'es-toolkit/types';

// keyof는 숫자 키를 숫자로 유지하지만, ObjectKeys는 문자열로 변환해요.
type Keys = ObjectKeys<{ a: number; 1: string }>; // 'a' | '1'
type KeyofKeys = keyof { a: number; 1: string }; // 'a' | 1

// Object.keys의 결과에 타입을 붙여요.
const obj = { a: 1, b: 2 };
const keys = Object.keys(obj) as Array<ObjectKeys<typeof obj>>; // Array<'a' | 'b'>

// 인덱스 시그니처는 문자열 형태로 결정돼요.
type StringKeys = ObjectKeys<Record<string, number>>; // string
type NumberKeys = ObjectKeys<Record<number, string>>; // `${number}`

// Object.keys의 런타임 동작처럼 심볼 키는 제외돼요.
declare const sym: unique symbol;
type NoSymbols = ObjectKeys<{ a: number; [sym]: string }>; // 'a'
```

#### 타입 파라미터

- `T`: 키를 읽어올 객체 타입이에요.
