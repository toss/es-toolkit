# invert

객체의 키와 값을 뒤집는 새로운 객체를 생성해요.

이 함수는 객체를 받아서 그 객체의 키를 값으로, 값을 키로 하는 새로운 객체를 생성해요. 만약 입력된 객체에 중복된 값이 있을 경우, 마지막에 등장한 키가 새로운 키로 사용돼요.

## 인터페이스

```typescript
function invert<K extends string | number | symbol, V extends string | number | symbol>(
  obj: Record<K, V>
): { [key in V]: K };
```

### 파라미터

- `obj` (`Record<K, V>`): 키와 값을 뒤집을 객체예요.

### 반환 값

(`{ [key in V]: K }`): 키와 값이 뒤집힌 새로운 객체예요.

## 예시

```typescript
const obj = { a: 1, b: 1, c: 2 };
const result = invert(obj);
// 결과는 다음과 같아요 { 1: 'b', 2: 'c' }
```
