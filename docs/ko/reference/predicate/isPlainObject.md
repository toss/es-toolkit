# isPlainObject

값이 순수 객체(plain object)인지 확인해요.

```typescript
const result = isPlainObject(value);
```

## 사용법

### `isPlainObject(value)`

값이 순수 객체인지 확인하고 싶을 때 `isPlainObject`를 사용하세요. 순수 객체는 객체 리터럴(`{}`) 또는 `Object` 생성자로 만들어진 객체를 말해요. 클래스 인스턴스, 배열, 또는 다른 특수 객체는 순수 객체가 아니에요.

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

// 순수 객체들
console.log(isPlainObject({})); // true
console.log(isPlainObject({ name: 'John', age: 30 })); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject(new Object())); // true

// 순수 객체가 아닌 것들
console.log(isPlainObject([])); // false (배열)
console.log(isPlainObject(new Date())); // false (Date 객체)
console.log(isPlainObject(new Set())); // false (Set 객체)
console.log(isPlainObject(new Map())); // false (Map 객체)
console.log(isPlainObject(null)); // false (null)
console.log(isPlainObject(42)); // false (숫자)
console.log(isPlainObject('hello')); // false (문자열)

// 클래스 인스턴스
class MyClass {}
console.log(isPlainObject(new MyClass())); // false
```

데이터를 직렬화하거나 설정 객체를 검증할 때 유용해요.

```typescript
function processConfig(config: unknown) {
  if (isPlainObject(config)) {
    // 이제 config는 Record<PropertyKey, any> 타입으로 좁혀져요
    console.log('Valid configuration object');
    Object.keys(config).forEach(key => {
      console.log(`${key}: ${config[key]}`);
    });
  } else {
    throw new Error('Configuration must be a plain object');
  }
}
```

#### 파라미터

- `value` (`unknown`): 순수 객체인지 확인할 값이에요.

#### 반환 값

(`value is Record<PropertyKey, any>`): 값이 순수 객체면 `true`, 그렇지 않으면 `false`를 반환해요.

## 성능 비교

|                   | [번들 사이즈](../../bundle-size.md) | [런타임 성능](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 279 바이트 (82.4% 작음)             | 1,505,684 회 (1.70× 빠름)           |
| es-toolkit/compat | 435 바이트 (72.5% 작음)             | 2,013,760 회 (2.28× 빠름)           |
| lodash-es         | 1,586 바이트                        | 882,669 회                          |
