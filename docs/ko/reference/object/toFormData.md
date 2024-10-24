# toFormData

객체를 `FormData` 인스턴스로 변환합니다. 이 함수는 객체 내의 각 키-값 쌍을 재귀적으로 처리하여 `FormData` 인스턴스에 추가합니다. 중첩된 객체와 배열, 파일 및 다양한 JavaScript 데이터 유형을 지원하여 복잡한 데이터 구조를 처리하는 데 적합합니다.

- **깊은 변환**: 중첩된 객체와 배열을 재귀적으로 `FormData` 형식으로 변환합니다.
- **파일 지원**: `File` 및 `Blob` 객체를 자동으로 처리합니다.
- **유형 변환**: `boolean`, `BigInt`, `Date` 등의 일반적인 JavaScript 데이터 유형을 `FormData`의 문자열 표현으로 변환합니다.

## 시그니처

```typescript
function toFormData(data: any, formData?: FormData, parentKey?: string): FormData;
```

### 매개변수

- `data` (`any`): `FormData`로 변환할 객체입니다. 기본 유형, 배열, 객체, `File`, `Blob` 등 다양한 유형을 지원합니다.
- `formData` (`FormData`): 데이터를 추가할 기존 `FormData` 인스턴스입니다. 제공되지 않으면 새로운 `FormData` 인스턴스가 생성됩니다.
- `parentKey` (`string`): 중첩된 객체 및 배열을 처리하는 데 사용되는 선택적 키입니다. 재귀 처리 중에 내부적으로 사용됩니다.

### 반환값

(`FormData`): 객체의 키-값 쌍이 포함된 `FormData` 인스턴스입니다.

## 데이터 유형 지원

이 함수는 다양한 JavaScript 데이터 유형을 처리합니다:

- `undefined`: 건너뛰며, `FormData`에 항목이 생성되지 않습니다.
- `null`: 빈 문자열 (`''`)을 추가합니다.
- `boolean`: `'true'` 또는 `'false'`로 변환됩니다.
- `BigInt:` 문자열로 변환됩니다.
- `Date`: ISO 문자열로 변환됩니다.
- `File` / `Blob`: 그대로 추가됩니다.
- `Array`: 인덱스 기반 키로 재귀적으로 처리됩니다.
- `Object`: 중첩된 키로 재귀적으로 처리됩니다.

## 기본 사용 예

```typescript
const obj = { name: 'John', age: 30, preferences: { color: 'blue', food: 'pizza' } };
const formData = toFormData(obj);
// formData에는 다음이 포함됩니다:
// "name" -> "John"
// "age" -> "30"
// "preferences[color]" -> "blue"
// "preferences[food]" -> "pizza"
```

### 파일과 Blob 처리

```typescript
const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
const obj = { name: 'John', profilePicture: file };
const formData = toFormData(obj);
// formData에는 다음이 포함됩니다:
// "name" -> "John"
// "profilePicture" -> file
```

### BigInt 및 복잡한 데이터 유형 처리

```typescript
const obj = { bigNumber: BigInt(12345678901234567890), createdAt: new Date() };
const formData = toFormData(obj);
// formData에는 다음이 포함됩니다:
// "bigNumber" -> "12345678901234567890"
// "createdAt" -> "2024-10-17T12:00:00.000Z"
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
const formData = toFormData(obj);
// formData에는 다음이 포함됩니다:
// "name" -> "Alice"
// "hobbies[0]" -> "reading"
// "hobbies[1]" -> "gaming"
// "address[street]" -> "123 Main St"
// "address[city]" -> "Wonderland"
```
