# isSet

주어진 값이 Set 인스턴스인지 확인해요.

```typescript
const result = isSet(value);
```

## 레퍼런스

### `isSet(value)`

값이 Set 인스턴스인지 확인하고 싶을 때 `isSet`을 사용하세요. Set 컬렉션을 다른 컬렉션 타입이나 일반 객체와 구분할 때 유용해요.

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

컬렉션 타입별로 다른 처리 로직 구현에 유용해요:

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

Set 조작과 데이터 변환에서 활용:

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

캐시나 상태 관리에서 Set 확인:

```typescript
// 권한 관리 시스템
class PermissionManager {
  private userPermissions = new Map<string, unknown>();
  
  setPermissions(userId: string, permissions: unknown) {
    if (isSet(permissions)) {
      this.userPermissions.set(userId, permissions);
    } else if (Array.isArray(permissions)) {
      this.userPermissions.set(userId, new Set(permissions));
    } else {
      this.userPermissions.set(userId, new Set());
    }
  }
  
  hasPermission(userId: string, permission: string): boolean {
    const userPerms = this.userPermissions.get(userId);
    
    if (isSet(userPerms)) {
      return userPerms.has(permission);
    }
    
    return false;
  }
  
  addPermission(userId: string, permission: string) {
    const userPerms = this.userPermissions.get(userId);
    
    if (isSet(userPerms)) {
      userPerms.add(permission);
    } else {
      this.userPermissions.set(userId, new Set([permission]));
    }
  }
}

// 사용 예시
const permManager = new PermissionManager();

// Set으로 권한 설정
permManager.setPermissions('user1', new Set(['read', 'write']));

// 배열로 권한 설정 (내부적으로 Set으로 변환)
permManager.setPermissions('user2', ['read', 'delete']);

console.log(permManager.hasPermission('user1', 'read')); // true
console.log(permManager.hasPermission('user2', 'write')); // false

// 태그 관리 시스템
class TagManager {
  private itemTags = new Map<string, Set<string>>();
  
  setTags(itemId: string, tags: unknown) {
    if (isSet(tags)) {
      // Set의 모든 요소가 string인지 확인 후 저장
      const stringTags = new Set<string>();
      for (const tag of tags) {
        if (typeof tag === 'string') {
          stringTags.add(tag);
        }
      }
      this.itemTags.set(itemId, stringTags);
    } else if (Array.isArray(tags)) {
      const stringTags = tags.filter((tag): tag is string => typeof tag === 'string');
      this.itemTags.set(itemId, new Set(stringTags));
    }
  }
  
  getTags(itemId: string): Set<string> {
    return this.itemTags.get(itemId) || new Set();
  }
  
  hasTag(itemId: string, tag: string): boolean {
    const tags = this.itemTags.get(itemId);
    return isSet(tags) ? tags.has(tag) : false;
  }
}

// 사용 예시
const tagManager = new TagManager();

tagManager.setTags('article1', new Set(['javascript', 'tutorial']));
tagManager.setTags('article2', ['react', 'hooks', 'javascript']);

console.log(tagManager.hasTag('article1', 'javascript')); // true
console.log(tagManager.getTags('article2')); // Set { 'react', 'hooks', 'javascript' }
```

데이터 검증과 타입 안전성:

```typescript
// API 응답 검증
function validateUniqueItems(data: unknown): boolean {
  if (isSet(data)) {
    // Set은 이미 고유값만 저장하므로 유효
    return true;
  }
  
  if (Array.isArray(data)) {
    // 배열의 경우 중복 확인
    return data.length === new Set(data).size;
  }
  
  return false;
}

// 사용 예시
console.log(validateUniqueItems(new Set([1, 2, 3]))); // true
console.log(validateUniqueItems([1, 2, 3])); // true
console.log(validateUniqueItems([1, 2, 2])); // false

// 설정 정규화
function normalizeConfig(config: Record<string, unknown>) {
  const normalized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(config)) {
    if (isSet(value)) {
      // Set을 배열로 직렬화
      normalized[key] = Array.from(value);
    } else {
      normalized[key] = value;
    }
  }
  
  return normalized;
}

// 사용 예시
const config = {
  allowedRoles: new Set(['admin', 'user']),
  maxRetries: 3,
  features: new Set(['auth', 'logging'])
};

const normalized = normalizeConfig(config);
console.log(normalized);
// {
//   allowedRoles: ['admin', 'user'],
//   maxRetries: 3,
//   features: ['auth', 'logging']
// }
```

#### 파라미터

- `value` (`unknown`): Set 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is Set<any>`): 값이 Set 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
