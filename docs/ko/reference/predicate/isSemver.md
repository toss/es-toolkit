# isSemver

주어진 문자열이 [시맨틱 버전 2.0.0](https://semver.org/) 규격에 맞는 유효한 시맨틱 버전인지 확인합니다.

## 인터페이스

```typescript
function isSemver(value: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): 유효한 시맨틱 버전인지 테스트할 값.

### 반환 값

(`boolean`): 값이 유효한 시맨틱 버전이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = '1.0.0';
const value2 = '1.0.0-alpha+001';
const value3 = '1.0';

console.log(isSemver(value1)); // true
console.log(isSemver(value2)); // true
console.log(isSemver(value3)); // false
```
