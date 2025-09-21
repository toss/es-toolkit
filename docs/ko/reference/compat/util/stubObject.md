# stubObject (Lodash 호환성)

::: warning `{}`를 직접 사용하세요

이 `stubObject` 함수는 단순히 빈 객체를 반환하는 래퍼 함수로 불필요한 추상화예요.

대신 더 빠르고 직접적인 `{}`를 사용하세요.

:::

항상 새로운 빈 객체를 반환해요.

```typescript
const emptyObject = stubObject();
```

## 레퍼런스

### `stubObject()`

항상 새로운 빈 객체를 반환하는 함수예요. 기본값으로 빈 객체가 필요하거나 함수형 프로그래밍에서 일관된 반환값이 필요할 때 사용해요.

```typescript
import { stubObject } from 'es-toolkit/compat';

// 빈 객체를 반환해요
const emptyObject = stubObject();
console.log(emptyObject); // => {}

// 기본값으로 사용해요
function processData(data = stubObject()) {
  return { ...data, processed: true };
}

console.log(processData()); // => { processed: true }
console.log(processData({ name: 'John' })); // => { name: 'John', processed: true }

// 함수형 프로그래밍에서 사용해요
const createEmpty = () => stubObject();
const obj = createEmpty();
obj.newProperty = 'value'; // 새로운 객체이므로 안전해요
```

매번 새로운 객체 인스턴스를 반환해요.

```typescript
import { stubObject } from 'es-toolkit/compat';

const obj1 = stubObject();
const obj2 = stubObject();

console.log(obj1 === obj2); // => false (다른 인스턴스)
console.log(typeof obj1); // => 'object'
console.log(Object.keys(obj1).length); // => 0
```

#### 파라미터

파라미터는 없어요.

### 반환 값

(`any`): 새로운 빈 객체를 반환해요.
