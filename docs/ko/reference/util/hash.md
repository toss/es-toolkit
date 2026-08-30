# hash

어떤 값이든 안정적인 43자 문자열로 해싱해요.

```typescript
const hashed = hash(value);
```

## 사용법

### `hash(value)`

캐시 키나 변경 감지 토큰처럼 값의 짧고 안정적인 식별자가 필요할 때 `hash`를 사용하세요. 값을 먼저 [`serialize`](./serialize.md)로 직렬화하기 때문에 구조가 같은 두 값은 키 삽입 순서와 상관없이 항상 같은 해시가 나오고, 그 결과를 SHA-256으로 다이제스트한 뒤 Base64URL 형식으로 인코딩해요.

`hash`는 전용 엔트리포인트인 `es-toolkit/util/hash`를 통해서만 사용할 수 있어요. 메인 엔트리포인트에서는 절대 접근할 수 없어서, 명시적으로 import하지 않는 한 번들 크기에 아무 영향도 주지 않아요.

```typescript
import { hash } from 'es-toolkit/util/hash';

hash({ b: 2, a: 1 }) === hash({ a: 1, b: 2 });
// true를 반환해요

hash([1, 2, 3]);
// 'phXuruId5Red4IDejDBSyNqQEThAa6ccOMAyhF99VPQ'를 반환해요

hash(new Set([3, 1, 2])) === hash(new Set([1, 2, 3]));
// true를 반환해요

hash({ a: 1 }) === hash({ a: 2 });
// false를 반환해요
```

Node.js에서는 네이티브 `node:crypto` 구현을 사용하고 Node.js 20.12 이상이 필요해요. 브라우저와 엣지 런타임에서는 바이트 단위로 동일한 출력을 내는 순수 JavaScript SHA-256 구현을 사용하기 때문에, 해시가 플랫폼에 상관없이 안정적이에요.

`Promise`, `WeakMap`, `Blob`처럼 직렬화할 수 없는 값은 `TypeError`를 던져요.

```typescript
hash(new WeakMap());
// TypeError: Cannot serialize WeakMap
```

::: warning 보안 용도로 설계되지 않았어요

`hash`는 캐시 키와 변경 감지를 위해 만들어졌어요. 직렬화 형식이 문자열이나 키를 이스케이프하지 않기 때문에, 의도적으로 충돌하는 입력을 만들 수 있어요. 비밀번호, 서명 등 보안이 중요한 용도로는 사용하지 마세요.

:::

#### 파라미터

- `value` (`unknown`): 해싱할 값.

#### 반환 값

(`string`): 직렬화된 값의 SHA-256 해시를 Base64URL로 인코딩한 43자 문자열.

#### 에러

(`TypeError`): 직렬화할 수 없는 객체가 포함되어 있으면 던져요.
