# findKey

인자로 받은 함수를 만족하는 첫 번째 요소의 키를 반환해요.

## 인터페이스

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### 파라미터

- `obj` (`T extends Record<any, any>`): 탐색할 객체예요.
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): 객체의 각 값에 대해 실행할 함수에요.

### 반환 값

(`keyof T | undefined`): 인자로 받은 함수를 만족하는 첫 번째 요소의 키에요. 함수를 만족하는 요소가 없으면 undefined를 반환해요.

## 예시

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```
