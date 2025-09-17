# memoize (Lodash 호환성)

::: warning `es-toolkit`의 `memoize`를 사용하세요

이 `memoize` 함수는 Lodash 호환성을 위해 구현되었지만, `es-toolkit`의 메인 라이브러리에도 동일한 기능의 `memoize` 함수가 있어요.

대신 더 빠르고 현대적인 `es-toolkit`의 [memoize](../../function/memoize.md)를 사용하세요.

:::

함수의 결과를 캐시하여 동일한 인수로 호출할 때 성능을 향상시켜요.

```typescript
const memoizedFunc = memoize(func, resolver);
```

## 레퍼런스

### `memoize(func, resolver)`

함수의 결과를 메모이제이션하여 동일한 인수로 호출할 때 이전 결과를 재사용하고 싶을 때 `memoize`를 사용하세요. 비용이 많이 드는 계산이나 API 호출에 유용해요.

```typescript
import { memoize } from 'es-toolkit/compat';

// 기본 사용법
function expensiveCalculation(n) {
  console.log('계산 중...', n);
  return n * n;
}

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(5)); // '계산 중... 5', 25
console.log(memoizedCalc(5)); // 25 (캐시된 결과, 계산하지 않음)
console.log(memoizedCalc(10)); // '계산 중... 10', 100

// 커스텀 리졸버 사용
function fetchUserData(userId, includeProfile) {
  console.log('사용자 데이터 가져오는 중...', userId, includeProfile);
  return { id: userId, profile: includeProfile ? '프로필 데이터' : null };
}

// 모든 인수를 고려한 캐시 키 생성
const memoizedFetch = memoize(fetchUserData, (userId, includeProfile) => {
  return `${userId}_${includeProfile}`;
});

memoizedFetch(1, true);  // '사용자 데이터 가져오는 중... 1 true'
memoizedFetch(1, true);  // 캐시된 결과 사용
memoizedFetch(1, false); // '사용자 데이터 가져오는 중... 1 false' (다른 캐시 키)

// 캐시 접근 및 수정
console.log(memoizedCalc.cache.get(5)); // 25
memoizedCalc.cache.set(7, 49); // 수동으로 캐시 설정
console.log(memoizedCalc(7)); // 49 (계산하지 않고 캐시된 값 사용)
```

대부분의 경우 기본 해시 맵을 사용하지만, 필요에 따라 커스텀 캐시 구현체를 사용할 수도 있어요.

#### 파라미터

- `func` (`Function`): 메모이제이션할 함수예요.
- `resolver` (`Function`, 선택): 캐시 키를 결정하는 함수예요. 제공되지 않으면 첫 번째 인수를 키로 사용해요.

### 반환 값

(`Function & { cache: MapCache }`): 메모이제이션된 함수를 반환해요. 반환된 함수에는 `cache` 프로퍼티가 있어서 캐시에 직접 접근할 수 있어요.
