## isEmpty

주어진 값이 비어있는지 확인합니다.
이 함수는 특정 기준에 따라 값이 비어있는지 여부를 결정합니다. 문자열, 배열, 객체, 맵, 셋 등 다양한 타입을 처리하며, 빈 값을 정확하게 식별합니다.

## 서명

```typescript
function isEmpty<T>(value: T): boolean;
```

### 매개변수

- value (T): 비어있는지 확인할 값.

### 반환값

- (boolean): 값이 비어있다면 true, 그렇지 않다면 false.

### 비어있는 값의 기준

다음 값들은 비어있는 것으로 간주됩니다:

- null
- undefined
- false
- 0
- NaN
- "" (빈 문자열)
- 빈 배열
- 빈 객체 (순회 가능한 자신의 속성이 없는 객체)
- 빈 Map 및 Set
- 0 또는 음수인 유효한 length 속성을 가진 객체

## 예시

```typescript
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(false); // true
isEmpty(0); // true
isEmpty(NaN); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true

isEmpty('a'); // false
isEmpty([0]); // false
isEmpty(1); // false
```
