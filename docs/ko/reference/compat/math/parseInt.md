# parseInt (Lodash 호환성)

::: warning `parseInt`를 사용하세요

이 `parseInt` 함수는 추가적인 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 네이티브 `parseInt`를 사용하세요.

:::

문자열을 정수로 변환해요.

```typescript
const result = parseInt(string, radix);
```

## 레퍼런스

### `parseInt(string, radix?)`

문자열을 정수로 변환하고 싶을 때 `parseInt`를 사용하세요. 기수를 지정해서 다른 진법으로 해석할 수 있어요.

```typescript
import { parseInt } from 'es-toolkit/compat';

// 기본 10진수 파싱
parseInt('123');
// Returns: 123

parseInt('08');
// Returns: 8

// 16진수 자동 인식
parseInt('0x20');
// Returns: 32

// 명시적 기수 지정
parseInt('08', 10);
// Returns: 8

parseInt('0x20', 16);
// Returns: 32

parseInt('1010', 2);
// Returns: 10

// 배열에서 사용
['6', '08', '10'].map(parseInt);
// Returns: [6, 8, 10]
```

잘못된 형식의 문자열은 NaN을 반환해요.

```typescript
import { parseInt } from 'es-toolkit/compat';

parseInt('abc');
// Returns: NaN

parseInt('');
// Returns: NaN

parseInt('123abc');
// Returns: 123 (앞부분만 파싱)
```

#### 파라미터

- `string` (`string`): 정수로 변환할 문자열이에요.
- `radix` (`number`, 선택): 변환할 때 사용할 기수예요. 기본값은 `0`이고, 이 경우 문자열 형식에 따라 자동으로 결정돼요.

### 반환 값

(`number`): 변환된 정수를 반환해요. 변환할 수 없으면 NaN을 반환해요.