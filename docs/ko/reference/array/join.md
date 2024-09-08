# join

배열의 요소를 문자열로 결합해요.

## 인터페이스

```typescript
function join<T>(array: T[], separator: string): string;
```

### 파라미터

- `array` (`T[]`) - 결합할 배열이에요.
- `separator` (`string`) - 요소를 결합하는 데 사용하는 구분자. 기본값은 쉼표(,)에요.

### 반환 값

(`string`): 지정된 구분자로 배열의 모든 요소가 결합된 문자열을 반환해요.

## 예시

```typescript
const arr = ['a', 'b', 'c'];
const result = join(arr, '~');
console.log(result); // Output: "a~b~c"
```
