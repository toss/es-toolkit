# isTypedArray (Lodash 호환성)

::: warning `ArrayBuffer.isView()` 또는 `instanceof` 연산자를 사용하세요

이 `isTypedArray` 함수는 Lodash 호환성을 위한 함수이지만, 단순한 타입 확인이에요.

대신 더 간단하고 현대적인 `ArrayBuffer.isView(value)` 또는 `value instanceof Int8Array` 등을 사용하세요.

:::

값이 타입 배열(TypedArray)인지 확인해요.

```typescript
const result = isTypedArray(x);
```

## 레퍼런스

### `isTypedArray(x)`

값이 타입 배열인지 확인하고 싶을 때 `isTypedArray`를 사용하세요. 타입 배열은 이진 데이터를 다루는 특수한 배열 타입이에요.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// 타입 배열들
isTypedArray(new Uint8Array([1, 2, 3])); // true
isTypedArray(new Int16Array([1, 2, 3])); // true
isTypedArray(new Float32Array([1.1, 2.2])); // true
isTypedArray(new BigInt64Array([1n, 2n])); // true

// 다른 타입들은 false
isTypedArray([1, 2, 3]); // false (일반 배열)
isTypedArray(new ArrayBuffer(16)); // false (ArrayBuffer)
isTypedArray(new DataView(new ArrayBuffer(16))); // false (DataView)
isTypedArray('array'); // false (문자열)
isTypedArray({}); // false (객체)
isTypedArray(null); // false
isTypedArray(undefined); // false
```

다양한 종류의 타입 배열들을 모두 인식해요.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

// 정수 타입 배열들
isTypedArray(new Int8Array()); // true
isTypedArray(new Int16Array()); // true
isTypedArray(new Int32Array()); // true
isTypedArray(new Uint8Array()); // true
isTypedArray(new Uint16Array()); // true
isTypedArray(new Uint32Array()); // true
isTypedArray(new Uint8ClampedArray()); // true

// 부동소수점 타입 배열들
isTypedArray(new Float32Array()); // true
isTypedArray(new Float64Array()); // true

// BigInt 타입 배열들
isTypedArray(new BigInt64Array()); // true
isTypedArray(new BigUint64Array()); // true
```

타입 배열과 비슷한 다른 객체들과 구분해요.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
const typedArray = new Uint8Array(buffer);
const regularArray = [1, 2, 3, 4];

isTypedArray(buffer); // false (ArrayBuffer)
isTypedArray(view); // false (DataView)
isTypedArray(typedArray); // true (TypedArray)
isTypedArray(regularArray); // false (일반 배열)
```

이진 데이터 처리에서 타입을 구분할 때 유용해요.

```typescript
import { isTypedArray } from 'es-toolkit/compat';

function processData(data: unknown) {
  if (isTypedArray(data)) {
    console.log(`타입 배열 길이: ${data.length}`);
    console.log(`바이트 길이: ${data.byteLength}`);
    console.log(`바이트 오프셋: ${data.byteOffset}`);
    console.log(`생성자: ${data.constructor.name}`);

    // 첫 번째 값 출력
    if (data.length > 0) {
      console.log(`첫 번째 값: ${data[0]}`);
    }
  } else if (Array.isArray(data)) {
    console.log('일반 배열이에요');
  } else {
    console.log('배열이 아니에요');
  }
}

processData(new Uint8Array([1, 2, 3])); // 타입 배열 정보 출력
processData([1, 2, 3]); // "일반 배열이에요"
processData('not an array'); // "배열이 아니에요"
```

#### 파라미터

- `x` (`any`): 타입 배열인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 타입 배열이면 `true`, 아니면 `false`를 반환해요.
