# isNative (Lodash 호환성)

값이 JavaScript 엔진의 네이티브 함수인지 확인해요.

```typescript
const result = isNative(value);
```

## 레퍼런스

### `isNative(value)`

주어진 값이 JavaScript 엔진에서 구현된 네이티브 함수인지 확인할 때 `isNative`를 사용하세요. 브라우저나 Node.js에서 제공하는 내장 함수들을 구분할 수 있어요.

```typescript
import { isNative } from 'es-toolkit/compat';

// 네이티브 함수들
isNative(Array.prototype.push); // true
isNative(Object.keys); // true
isNative(Math.max); // true
isNative(JSON.parse); // true
isNative(console.log); // true (브라우저/Node.js 환경에서)

// 사용자 정의 함수들
isNative(function () {}); // false
isNative(() => {}); // false
isNative(function customFunction() {}); // false

// 라이브러리 함수들
isNative(require('lodash').map); // false
isNative(require('es-toolkit').chunk); // false

// 함수가 아닌 값들
isNative({}); // false
isNative([]); // false
isNative('function'); // false
isNative(123); // false
isNative(null); // false

// 바인딩된 함수들
const boundFunction = Array.prototype.push.bind([]);
isNative(boundFunction); // false (바인딩된 함수는 네이티브가 아님)

// 메서드들
const obj = { method: Array.prototype.push };
isNative(obj.method); // true (여전히 네이티브 함수)
```

#### 파라미터

- `value` (`any`): 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 네이티브 함수로 보이면 `true`, 아니면 `false`를 반환해요.
