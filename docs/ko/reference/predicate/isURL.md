# isURL

주어진 값이 유효한 URL 문자열인지 확인해요.

JavaScript의 내장된 URL 생성자를 사용하여 URL을 검증해요.
유효한 URL 형식은 프로토콜(http, https 등)을 포함해야 해요.

상대 URL을 검사할 때는 두 번째 매개변수로 기준이 되는 base URL을 제공할 수 있어요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `string`으로 좁혀요.

## 인터페이스

```typescript
function isURL(value: unknown, base?: string): value is string;
```

### 파라미터

- `value`(`unknown`): URL 유효성을 확인할 값.
- `base`(`string`, 선택적): `value`가 상대 URL인 경우 기준이 되는 base URL.

### 반환 값

(`value is string`): 값이 유효한 URL이면 `true`, 아니면 `false`.

## 예시

```typescript
isURL('https://example.com'); // true
isURL('http://localhost:3000'); // true
isURL('https://example.com/path?query=123#hash'); // true
isURL('ftp://ftp.example.com'); // true
isURL('ws://websocket.example.com'); // true
isURL('file:///path/to/file'); // true

// base URL 매개변수 사용
isURL('/products', 'https://example.com'); // true
isURL('about', 'https://example.com/'); // true
isURL('category/shoes', 'https://shop.example.com'); // true
isURL('#section', 'https://example.com/page'); // true
isURL('?query=value', 'https://example.com/page'); // true

isURL('example.com'); // false (프로토콜 없음)
isURL('not a url'); // false
isURL(''); // false
isURL('http://'); // false

// base URL이 있어도 유효하지 않은 상대 URL
isURL('', 'https://example.com'); // false
isURL('not a url', 'https://example.com'); // false
isURL('!#$%@#!#@', 'https://example.com'); // false

isURL(123); // false
isURL(null); // false
isURL(undefined); // false
```
