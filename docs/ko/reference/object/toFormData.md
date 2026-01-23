# toFormData

객체를 `FormData` 인스턴스로 변환합니다. 이 함수는 객체 내의 각 키-값 쌍을 재귀적으로 처리하여 `FormData` 인스턴스에 추가합니다. 중첩된 객체와 배열, 파일 및 다양한 JavaScript 데이터 유형을 지원하며, 구성 옵션을 통해 복잡한 데이터 구조에 대해 사용자 정의 처리가 가능합니다.

- **깊은 변환**: 중첩된 객체와 배열을 재귀적으로 `FormData` 형식으로 변환합니다.
- **파일 지원**: `File` 및 `Blob` 객체를 자동으로 처리합니다.
- **유형 변환**: `boolean`, `BigInt`, `Date` 등의 일반적인 JavaScript 데이터 유형을 `FormData`의 문자열 표현으로 변환합니다.
- **구성 가능**: 배열, boolean, null 값, 중첩 객체 처리 방법을 사용자 지정할 수 있는 옵션을 제공합니다.

## 시그니처

```typescript
function toFormData({
  data: Record<string, any>,
  formData = new FormData(),
  parentKey?: string,
  config = formDataOptions
}): FormData;
```

### 매개변수

- `data` (`Record<string, any>`): `FormData`로 변환할 객체입니다. 기본 유형, 배열, 객체, `File`, `Blob` 등 다양한 유형을 지원합니다.
- `formData` (`FormData`): 데이터를 추가할 기존 `FormData` 인스턴스입니다. 제공되지 않으면 새로운 `FormData` 인스턴스가 생성됩니다.
- `parentKey` (`string`): 중첩된 객체 및 배열을 처리하는 데 사용되는 선택적 키입니다. 재귀 처리 중에 내부적으로 사용됩니다.
- `config` (`object`): `FormData` 변환을 사용자 지정할 수 있는 구성 객체입니다.

### 구성 옵션

- `allowEmptyArrays` (`boolean`): `true`인 경우, 빈 배열이 빈 문자열로 `FormData`에 추가됩니다. 기본값은 `false`입니다.
- `convertBooleansToIntegers` (`boolean`): `true`인 경우, boolean 값(`true`/`false`)이 `'1'` 및 `'0'`으로 변환됩니다. 기본값은 `false`입니다.
- `ignoreNullValues` (`boolean`): `true`인 경우, `null` 값이 `FormData`에 추가되지 않습니다. 기본값은 `false`입니다.
- `noArrayNotationForFiles` (`boolean`): `true`인 경우, 파일 배열이 `[]` 표기 없이 `FormData`에 추가됩니다. 기본값은 `false`입니다.
- `noArrayNotationForNonFiles` (`boolean`): `true`인 경우, 파일이 아닌 배열이 `[]` 표기 없이 `FormData`에 추가됩니다. 기본값은 `false`입니다.
- `useDotNotationForObjects` (`boolean`): `true`인 경우, 중첩된 객체 속성이 괄호 표기(`parent[child]`) 대신 점 표기(`parent.child`)를 사용합니다. 기본값은 `false`입니다.

### 반환값

(`FormData`): 객체의 키-값 쌍이 포함된 `FormData` 인스턴스입니다.

### 데이터 유형 지원

이 함수는 다양한 JavaScript 데이터 유형을 처리합니다:

- `undefined`: 무시되며, `FormData`에 항목이 생성되지 않습니다.
- `null`: 빈 문자열 (`''`)을 추가하거나 `ignoreNullValues` 설정에 따라 무시됩니다.
- `boolean`: `'true'` 또는 `'false'`로 변환되며, `convertBooleansToIntegers`가 `true`일 경우 `'1'` 또는 `'0'`으로 변환됩니다.
- `BigInt`: 문자열로 변환됩니다.
- `Date`: ISO 문자열로 변환됩니다.
- `File` / `Blob`: 그대로 추가됩니다.
- `Array`: 구성에 따라 인덱스 표기 또는 생략된 `[]` 표기로 재귀 처리됩니다.
- `Object`: 구성에 따라 점 표기 또는 괄호 표기의 중첩 키로 재귀 처리됩니다.

## 사용 예시

### 기본 사용 예시와 구성

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData({ data: obj, config: { useDotNotationForObjects: true } });
// formData에는 다음이 포함됩니다:
// "name" -> "John"
// "age" -> "30"
// "preferences.color" -> "blue"
// "preferences.food" -> "pizza"
```

### 파일과 빈 배열 처리

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file, tags: [] };
const formData = toFormData({ data: obj, config: { allowEmptyArrays: true } });
// formData에는 다음이 포함됩니다:
// "name" -> "John"
// "profilePicture" -> file
// "tags" -> ""
```

### boolean 변환 및 null 값 무시

```typescript
const obj = { isActive: true, age: null };
const formData = toFormData({ data: obj, config: { convertBooleansToIntegers: true, ignoreNullValues: true } });
// formData에는 다음이 포함됩니다:
// "isActive" -> "1"
// ("age" 항목 없음, null 값 무시됨)
```

### 중첩 객체와 배열 처리

```typescript
const obj = {
  name: 'Alice',
  hobbies: ['reading', 'gaming'],
  address: {
    street: '123 Main St',
    city: 'Wonderland',
  },
};
const formData = toFormData({ data: obj, config: { noArrayNotationForNonFiles: true } });
// formData에는 다음이 포함됩니다:
// "name" -> "Alice"
// "hobbies" -> ["reading", "gaming"] // 비파일 배열의 경우 인덱스 생략
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
