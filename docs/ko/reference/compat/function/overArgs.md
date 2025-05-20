# overArgs

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`overArgs`는 대상 함수(`func`)를 호출할 때 전달되는 인자들을 미리 지정된 변환 스펙(`transformsArgs`)에 따라 처리하여 새로운 함수를 생성해요. 이 변환 스펙들은 원래 `func`에 인자가 전달되기 전에 각 인자에 개별적으로 적용됩니다.

`transformsArgs`는 개별 인자로 제공되거나 네스티드 배열 형태로 제공될 수 있으며, 함수 내부에서 평탄화된 후 각 요소가 변환 스펙으로 사용됩니다.

각 변환 스펙(`value`)은 다음과 같이 해석되어 해당 인수에 적용될 변환 함수로 변환됩니다:

- `function`: 해당 인수에 직접 적용될 함수로 사용됩니다.
- `null` 또는 `undefined`: 해당 인수는 변경되지 않고 그대로 전달됩니다 (`identity`).
- 길이가 2인 `Array`, `[path, value]`: 해당 인수가 객체라고 가정하고, `property(path)`로 얻은 값이 `value`와 같은지 확인하는 술어 함수로 변환됩니다 (`matchesProperty(path, value)` 사용).
- `object` (배열 제외): 해당 인수가 객체라고 가정하고, 객체의 속성과 일치하는지 확인하는 술어 함수로 변환됩니다 (`matches(object)` 사용).
- `string`, `number`, `boolean`, `symbol`: 해당 인수가 객체라고 가정하고, 해당 값을 속성 경로/키로 사용하여 값에 접근하는 함수로 변환됩니다 (`property(path/key)` 사용). `boolean` 값은 문자열 `'true'` 또는 `'false'`로 변환되어 사용됩니다.
- 그 외 다른 유형: 해당 인수는 변경되지 않고 그대로 전달됩니다 (`identity`).

변환은 새로운 함수의 첫 `n`개 인수에 적용됩니다. 여기서 `n`은 평탄화된 변환 스펙의 수입니다. 변환 수보다 많은 인수는 변경되지 않고 원본 함수에 전달됩니다.

## 인터페이스

```typescript
function overArgs<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  ...transformsArgs: Array<OverArgsTransformArg>
): (...args: any[]) => ReturnType<TFunc>; // 반환된 함수의 인자 타입은 any[]로 단순화
```

### 파라미터

- func (TFunc extends (...args: any[]) => any): 변환된 인자로 호출될 대상 함수예요.
- transformsArgs (Array<OverArgsTransformArg>): 인수에 적용될 변환 스펙들이에요. 개별 인자 또는 네스티드 배열로 제공될 수 있어요. 각 스펙의 유형은 위 설명과 같아요.

### 반환 값

- (...args: any[]) => ReturnType<TFunc>: 인수에 변환을 적용한 새로운 함수를 반환해요.

## 예시

```typescript
import { overArgs } from 'es-toolkit/compat';

function fn(...args) {
  return args;
}

const squareAndCube = (a, b) => `Square: ${a}, Cube: ${b}`;
const processNumbers = overArgs(
  squareAndCube,
  n => n * n,
  n => n * n * n
);

console.log(processNumbers(2, 3));
// => Square: 4, Cube: 27 (2는 2*2=4로, 3은 3*3*3=27로 변환되어 squareAndCube에 전달됨)

const formatUserInfo = (name, age) => `Name: ${name}, Age: ${age}`;
const processUserObject = overArgs(formatUserInfo, 'name', 'age');

console.log(processUserObject({ name: 'Alice', age: 30, city: 'Seoul' }, { name: 'Bob', age: 25, city: 'Busan' }));
// => Name: Alice, Age: 25 (첫 번째 객체의 'name'과 두 번째 객체의 'age'가 추출되어 formatUserInfo에 전달됨)

const checkAndGet = (isMatch, value) => `Match: ${isMatch}, Value: ${value}`;
const processObjectMatch = overArgs(checkAndGet, { id: 1 }, 'name');

console.log(processObjectMatch({ id: 1, name: 'Item A' }, { id: 2, name: 'Item B' }));
// => Match: true, Value: Item B ({ id: 1, name: 'Item A' }는 { id: 1 }과 일치하므로 true, { id: 2, name: 'Item B' }에서 'name' 추출)

const checkPropertyValue = isMatch => `Property matches: ${isMatch}`;
const processArrayMatch = overArgs(checkPropertyValue, ['status', 'active']);

console.log(processArrayMatch({ status: 'active', type: 'user' }));
// => Property matches: true ({ status: 'active', type: 'user' }의 'status' 속성이 'active'와 같으므로 true)
console.log(processArrayMatch({ status: 'inactive', type: 'admin' }));
// => Property matches: false ({ status: 'inactive', type: 'admin' }의 'status' 속성이 'active'와 다르므로 false)

const processBooleanKeys = overArgs(fn, true, false);
const objWithBooleanKeys = { true: 'Enabled', false: 'Disabled' };

console.log(processBooleanKeys(objWithBooleanKeys, objWithBooleanKeys));
// => [Enabled, Disabled] (각 인자에서 'true' 및 'false' 속성 값 추출)

const processNested = overArgs(fn, [s => s.toUpperCase()], ['length', o => o.value]);

console.log(processNested('hello', 'world', { value: 123 }));
// overArgs는 transformsArgs를 평탄화: [s=>s.toUpperCase(), 'length', o => o.value]
// 첫 인자 'hello'에 s=>s.toUpperCase() 적용 -> 'HELLO'
// 두 인자 'world'에 'length' (property('length')) 적용 -> 5
// 세 인자 { value: 123 }에 o=>o.value 적용 -> 123
// fn('HELLO', 5, 123) 호출
// => [HELLO, 5, 123]
```
