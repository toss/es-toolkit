# deburr (Lodash 호환성)

::: warning `es-toolkit`의 `deburr`를 사용하세요

이 `deburr` 함수는 문자열이 아닌 입력값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [deburr](../../string/deburr.md)를 사용하세요.

:::

문자열에서 특수 문자와 발음 구별 기호를 ASCII 문자로 변환해요.

```typescript
const result = deburr(str);
```

## 사용법

### `deburr(str)`

문자열에서 특수 문자와 발음 구별 기호를 ASCII 문자로 변환해요. 다국어 텍스트를 검색이나 정렬에 사용하기 쉽게 만들 때 유용해요.

```typescript
import { deburr } from 'es-toolkit/compat';

deburr('Æthelred'); // 'Aethelred'
deburr('München'); // 'Munchen'
deburr('Crème brûlée'); // 'Creme brulee'
```

문자열이 아닌 값도 문자열로 변환해서 처리해요.

```typescript
import { deburr } from 'es-toolkit/compat';

deburr(123); // '123'
deburr(null); // ''
deburr(undefined); // ''
```

#### 파라미터

- `str` (`string`, 선택): 특수 문자를 제거할 문자열이에요.

#### 반환 값

(`string`): 특수 문자와 발음 구별 기호가 ASCII 문자로 변환된 문자열을 반환해요.
