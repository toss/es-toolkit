# isSet

주어진 값이 `Set` 인스턴스인지 확인해요.

```typescript
const result = isSet(value);
```

## 사용법

### `isSet(value)`

값이 `Set` 인스턴스인지 확인하고 싶을 때 `isSet`을 사용하세요. `Set` 객체를 다른 객체와 구분할 때 유용해요.

```typescript
import { isSet } from 'es-toolkit/predicate';

// Set 인스턴스들
const set1 = new Set();
const set2 = new Set([1, 2, 3]);
const set3 = new Set(['a', 'b', 'c']);

console.log(isSet(set1)); // true
console.log(isSet(set2)); // true
console.log(isSet(set3)); // true

// Set가 아닌 값들
console.log(isSet(new Map())); // false
console.log(isSet(new WeakSet())); // false
console.log(isSet([])); // false
console.log(isSet({})); // false
console.log(isSet(null)); // false
console.log(isSet(undefined)); // false
```

`Set`, `Array`, `Map` 처럼 JavaScript 내장 객체별로 다른 로직을 실행할 때 유용해요.

```typescript
// 컬렉션 크기 계산
function getCollectionSize(collection: unknown): number {
  if (isSet(collection)) {
    // TypeScript가 collection을 Set<any>로 추론
    return collection.size;
  }

  if (Array.isArray(collection)) {
    return collection.length;
  }

  if (collection && typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}

// 사용 예시
console.log(getCollectionSize(new Set([1, 2, 3]))); // 3
console.log(getCollectionSize([1, 2, 3])); // 3
console.log(getCollectionSize({ a: 1, b: 2 })); // 2

// 중복 제거 유틸리티
function removeDuplicates(data: unknown) {
  if (isSet(data)) {
    // 이미 Set이면 그대로 반환
    return data;
  }

  if (Array.isArray(data)) {
    return new Set(data);
  }

  // 다른 타입은 변환하지 않음
  return data;
}

const duplicatedArray = [1, 2, 2, 3, 3, 3];
const uniqueSet = removeDuplicates(duplicatedArray);
console.log(uniqueSet); // Set { 1, 2, 3 }

const existingSet = new Set(['a', 'b']);
console.log(removeDuplicates(existingSet)); // Set { 'a', 'b' } (동일한 Set 반환)
```

Set 조작과 데이터 변환에서도 다양하게 활용할 수 있어요.

```typescript
// 유니버셜 컬렉션 합치기
function mergeCollections(...collections: unknown[]): Set<any> {
  const result = new Set();

  for (const collection of collections) {
    if (isSet(collection)) {
      // Set의 모든 값을 결과에 추가
      for (const item of collection) {
        result.add(item);
      }
    } else if (Array.isArray(collection)) {
      // 배열의 모든 값을 추가
      for (const item of collection) {
        result.add(item);
      }
    }
  }

  return result;
}

// 사용 예시
const set1 = new Set([1, 2, 3]);
const array1 = [3, 4, 5];
const set2 = new Set(['a', 'b']);

const merged = mergeCollections(set1, array1, set2);
console.log(merged); // Set { 1, 2, 3, 4, 5, 'a', 'b' }

// 컬렉션 교집합 계산
function getIntersection(coll1: unknown, coll2: unknown): Set<any> {
  const set1 = isSet(coll1) ? coll1 : new Set(Array.isArray(coll1) ? coll1 : []);
  const set2 = isSet(coll2) ? coll2 : new Set(Array.isArray(coll2) ? coll2 : []);

  const intersection = new Set();

  for (const item of set1) {
    if (set2.has(item)) {
      intersection.add(item);
    }
  }

  return intersection;
}

// 사용 예시
const setA = new Set([1, 2, 3, 4]);
const arrayB = [3, 4, 5, 6];

const intersection = getIntersection(setA, arrayB);
console.log(intersection); // Set { 3, 4 }
```

#### 파라미터

- `value` (`unknown`): Set 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is Set<any>`): 값이 Set 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
