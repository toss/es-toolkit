# isEqual

두 값이 깊게 동일한지 확인해요.

```typescript
const result = isEqual(a, b);
```

## 레퍼런스

### `isEqual(a, b)`

객체, 배열, Date, RegExp 등을 포함해서 두 값이 깊게 동일한지 확인하고 싶을 때 `isEqual`을 사용하세요. 참조가 다르더라도 내용이 같으면 `true`를 반환해요. 단위 테스트나 데이터 비교에 유용해요.

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 원시 타입 비교
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// 특수 값 처리
isEqual(NaN, NaN); // true
isEqual(+0, -0); // true
```

객체와 배열의 깊은 비교를 지원해요.

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 깊은 객체 비교
const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
isEqual(obj1, obj2); // true

// 배열 비교
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
isEqual(arr1, arr2); // true
```

Date, RegExp, Map, Set 같은 객체들도 비교할 수 있어요.

```typescript
import { isEqual } from 'es-toolkit/predicate';

// 날짜 비교
const date1 = new Date('2020-01-01');
const date2 = new Date('2020-01-01');
isEqual(date1, date2); // true

// 정규식 비교
const regex1 = /hello/g;
const regex2 = /hello/g;
isEqual(regex1, regex2); // true

// Map과 Set 비교
const map1 = new Map([['key', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqual(map1, map2); // true

const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
isEqual(set1, set2); // true
```

단위 테스트에서 자주 사용돼요.

```typescript
import { isEqual } from 'es-toolkit/predicate';

function testApiResponse() {
  const expected = { status: 200, data: { message: 'success' } };
  const actual = { status: 200, data: { message: 'success' } };
  
  if (isEqual(expected, actual)) {
    console.log('테스트 통과!');
  } else {
    console.log('테스트 실패!');
  }
}
```

#### 파라미터

- `a` (`unknown`): 비교할 첫 번째 값이에요.
- `b` (`unknown`): 비교할 두 번째 값이에요.

#### 반환 값

(`boolean`): 두 값이 깊게 동일하면 `true`, 그렇지 않으면 `false`를 반환해요.

