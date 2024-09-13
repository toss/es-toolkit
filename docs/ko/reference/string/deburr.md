# deburr

`Æ`, `ß`, `ü`와 같은 특수문자나 다이어크리틱을 ASCII 문자로 바꿔요. 예를 들어서, `"Crème brûlée"`를 `"Creme brulee"`로 바꿔요.

## 인터페이스

```typescript
function deburr(str: string): string;
```

### 파라미터

- `str` (`string`): 특수문자나 다이어크리틱을 포함하는 문자열.

### 반환 값

(`string`): 특수문자나 다이어크리틱이 ASCII 문자로 바뀐 문자열.

## 예시

```typescript
import { deburr } from 'es-toolkit/string';

deburr('déjà vu'); // 반환 값: 'deja vu'
deburr('Æthelred'); // 반환 값: 'Aethelred'
deburr('München'); // 반환 값: 'Munchen'
deburr('Crème brûlée'); // 반환 값: 'Creme brulee'
```
