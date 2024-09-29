# compact

거짓으로 평가될 수 있는 값인 `false`, `null`, `0`, `0n`, `''`, `undefined`, `NaN`을 제거한 새로운 배열을 반환해요.

## 인터페이스

```typescript
function compact<T>(arr: T[]): Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>;
```

### 파라미터

- `arr` (`T[]`): 거짓으로 평가될 수 있는 값을 제거할 배열.

### 반환 값

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`): 거짓으로 평가될 수 있는 값을 모두 제거한 새로운 배열.

## 예시

```typescript
compact([0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// 반환 값: [1, 2, 3, 4, 5]
```
