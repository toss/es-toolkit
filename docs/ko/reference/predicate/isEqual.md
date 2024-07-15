# isEqual

`isEqual` 함수는 두 값이 동일한지 확인하며, `Date`, `RegExp`, 깊은 객체 비교도 지원해요.

## Signature

```typescript
function isEqual(a: unknown, b: unknown): boolean;
```

## Parameters

- **`a`**: `unknown` - 비교할 첫 번째 값.
- **`b`**: `unknown` - 비교할 두 번째 값.

## Returns

- **`boolean`** - 두 값이 동일하면 `true`, 그렇지 않으면 `false`를 반환해요.

## Examples

### Example 1: 원시 타입 값 비교

```javascript
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true
isEqual(1, 2); // false
isEqual('hello', 'world'); // false
isEqual(true, false); // false
```

### Example 2: 특수 경우 비교

```javascript
isEqual(NaN, NaN); // true
isEqual(+0, -0); // false
```

### Example 3: 날짜 객체 비교

```javascript
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

const date3 = new Date('2021-01-01');
isEqual(date1, date3); // false
```

### Example 4: 정규 표현식 객체 비교

```javascript
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

const regex3 = /hello/i;
isEqual(regex1, regex3); // false
```

### Example 5: 객체 비교

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
isEqual(obj1, obj2); // true

const obj3 = { a: 1, b: { c: 3 } };
isEqual(obj1, obj3); // false

const obj4 = { a: 1, b: 2 };
const obj5 = { a: 1, c: 2 };
isEqual(obj4, obj5); // false
```

### Example 6: 배열 비교

```javascript
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
isEqual(arr1, arr2); // true

const arr3 = [1, 2, 4];
isEqual(arr1, arr3); // false

const arr4 = [1, 2];
isEqual(arr1, arr4); // false
```
