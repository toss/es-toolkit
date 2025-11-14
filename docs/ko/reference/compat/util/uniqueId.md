# uniqueId (Lodash 호환성)

::: warning crypto.randomUUID 사용 권장

고유한 식별자를 생성할 때는 crypto.randomUUID()를 사용하는 것이 더 안전하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 crypto.randomUUID()를 사용하세요.

:::

고유한 문자열 식별자를 생성해요.

```typescript
const result = uniqueId('contact_');
```

## 사용법

### `uniqueId(prefix?: string): string`

고유한 문자열 식별자를 생성해요. 내부 카운터를 증가시켜서 고유성을 보장해요.

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 접두사와 함께 고유 ID 생성
uniqueId('contact_'); // => 'contact_1'
uniqueId('user_'); // => 'user_2'

// 접두사 없이 고유 ID 생성
uniqueId(); // => '3'
uniqueId(); // => '4'
```

연속적인 호출마다 내부 카운터가 증가해요.

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 각 호출마다 다른 ID 생성
const ids = Array.from({ length: 5 }, () => uniqueId('item_'));
console.log(ids);
// => ['item_1', 'item_2', 'item_3', 'item_4', 'item_5']
```

DOM 요소의 고유 ID 생성에 유용해요.

```typescript
import { uniqueId } from 'es-toolkit/compat';

// 폼 요소의 고유 ID 생성
const inputId = uniqueId('input_');
const labelId = uniqueId('label_');

console.log(inputId); // => 'input_6'
console.log(labelId); // => 'label_7'
```

#### 파라미터

- `prefix` (`string`, 선택): ID 앞에 붙는 접두사 문자열. 제공하지 않으면 숫자만 반환해요.

#### 반환 값

(`string`): 고유 식별자 문자열. 접두사가 있으면 `접두사 + 번호` 형태, 없으면 번호만 반환해요.
