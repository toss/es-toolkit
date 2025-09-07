# isPlainObject (Lodash 호환성)

::: warning `es-toolkit`의 `isPlainObject`를 사용하세요

이 `isPlainObject` 함수는 Lodash 호환성을 위한 함수이지만, 메인 라이브러리와 같은 구현이에요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isPlainObject](../../predicate/isPlainObject.md)를 사용하세요.

:::

값이 순수 객체인지 확인해요.

```typescript
const result = isPlainObject(object);
```

## 레퍼런스

### `isPlainObject(object)`

값이 순수 객체인지 확인하고 싶을 때 `isPlainObject`를 사용하세요. 순수 객체는 `{}` 리터럴, `new Object()`, 또는 `Object.create(null)`로 생성된 객체예요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// 순수 객체들
isPlainObject({}); // true
isPlainObject(new Object()); // true
isPlainObject(Object.create(null)); // true
isPlainObject({ name: 'John', age: 30 }); // true

// 순수 객체가 아닌 값들
isPlainObject([]); // false (배열)
isPlainObject(new Date()); // false (Date 인스턴스)
isPlainObject(new Map()); // false (Map 인스턴스) 
isPlainObject(new Set()); // false (Set 인스턴스)
isPlainObject(/regex/); // false (정규식)
isPlainObject(function() {}); // false (함수)
isPlainObject(null); // false
isPlainObject(undefined); // false
isPlainObject('object'); // false (문자열)
isPlainObject(42); // false (숫자)
```

클래스 인스턴스와 순수 객체를 구분해요.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person('John');
const plainObj = { name: 'John' };

isPlainObject(person); // false (클래스 인스턴스)
isPlainObject(plainObj); // true (순수 객체)
```

커스텀 `Symbol.toStringTag` 속성도 올바르게 처리해요.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// 쓰기 가능한 Symbol.toStringTag
const obj1 = {};
obj1[Symbol.toStringTag] = 'CustomObject';
isPlainObject(obj1); // true

// 읽기 전용 Symbol.toStringTag (내장 객체들)
const date = new Date();
isPlainObject(date); // false
```

TypeScript에서 타입 가드로 사용할 수 있어요.

```typescript
import { isPlainObject } from 'es-toolkit/compat';

function processValue(value: unknown) {
  if (isPlainObject(value)) {
    // 이 블록에서 value는 Record<string | number | symbol, any> 타입이에요
    console.log(Object.keys(value));
    console.log(Object.values(value));
    
    // 객체의 속성들을 안전하게 접근할 수 있어요
    for (const key in value) {
      console.log(`${key}: ${value[key]}`);
    }
  }
}
```

#### 파라미터

- `object` (`any`): 순수 객체인지 확인할 값이에요.

### 반환 값

(`boolean`): 값이 순수 객체이면 `true`, 아니면 `false`를 반환해요.