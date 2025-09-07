# isWeakSet (Lodash 호환성)

::: warning `instanceof` 연산자를 사용하세요

이 `isWeakSet` 함수는 Lodash 호환성을 위한 함수이지만, 단순한 타입 확인이에요.

대신 더 간단하고 현대적인 `value instanceof WeakSet`를 사용하세요.

:::

값이 WeakSet인지 확인해요.

```typescript
const result = isWeakSet(value);
```

## 레퍼런스

### `isWeakSet(value)`

값이 WeakSet인지 타입 안전하게 확인하고 싶을 때 `isWeakSet`를 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet 확인
const weakSet = new WeakSet();
isWeakSet(weakSet); // true

// 다른 타입들은 false
isWeakSet(new Set()); // false
isWeakSet(new Map()); // false
isWeakSet(new WeakMap()); // false
isWeakSet([]); // false
isWeakSet({}); // false
isWeakSet('weakset'); // false
isWeakSet(123); // false
isWeakSet(null); // false
isWeakSet(undefined); // false
```

WeakSet과 비슷한 다른 컬렉션들과도 구분해요.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// WeakSet vs Set
const obj = {};
const weakSet = new WeakSet([obj]);
const set = new Set([obj]);

isWeakSet(weakSet); // true
isWeakSet(set); // false

// WeakSet vs WeakMap
isWeakSet(new WeakSet()); // true
isWeakSet(new WeakMap()); // false

// WeakSet vs 배열
isWeakSet(new WeakSet()); // true
isWeakSet([]); // false
```

WeakSet의 특별한 속성들을 활용할 때 유용해요.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

function addWeakReference(collection: unknown, item: object) {
  if (isWeakSet(collection)) {
    // WeakSet은 객체만 저장할 수 있고, 약한 참조를 유지해요
    collection.add(item);
    console.log('WeakSet에 약한 참조로 저장했어요');
    
    // WeakSet은 크기를 알 수 없고 순회할 수 없어요
    console.log('WeakSet은 크기 정보가 없고 순회할 수 없어요');
  } else {
    console.log('WeakSet이 아니에요');
  }
}

const weakSet = new WeakSet();
const regularSet = new Set();
const obj = { id: 1 };

addWeakReference(weakSet, obj); // "WeakSet에 약한 참조로 저장했어요"
addWeakReference(regularSet, obj); // "WeakSet이 아니에요"
```

메모리 누수 방지를 위한 객체 추적에 유용해요.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

// DOM 요소 추적 예시
function trackDOMElement(tracker: unknown, element: Element) {
  if (isWeakSet(tracker)) {
    // DOM 요소가 제거되면 WeakSet에서도 자동으로 제거돼요
    tracker.add(element);
    console.log('DOM 요소를 추적하기 시작했어요');
    
    // 나중에 추적 여부 확인
    if (tracker.has(element)) {
      console.log('이 요소는 추적 중이에요');
    }
  }
}
```

TypeScript에서 타입 가드로 사용할 수 있어요.

```typescript
import { isWeakSet } from 'es-toolkit/compat';

function processValue(value: unknown) {
  if (isWeakSet(value)) {
    // 이 블록에서 value는 WeakSet<object> 타입이에요
    const obj = { id: 1 };
    value.add(obj);
    
    if (value.has(obj)) {
      console.log('객체가 WeakSet에 있어요');
    }
    
    value.delete(obj);
  }
}
```

#### 파라미터

- `value` (`unknown`): WeakSet인지 확인할 값이에요.

### 반환 값

(`value is WeakSet<object>`): 값이 WeakSet이면 `true`, 아니면 `false`를 반환해요.