# isFile

주어진 값이 File 객체인지 확인해요.

```typescript
const result = isFile(value);
```

## 사용법

### `isFile(value)`

값이 File 인스턴스인지 확인하고 싶을 때 `isFile`을 사용하세요. File 객체는 사용자가 업로드한 파일이나 파일 시스템에서 가져온 파일을 나타내는 웹 API의 일부예요. Blob 객체와는 달리 파일 이름과 마지막 수정 시간 등의 추가 정보를 포함해요.

```typescript
import { isFile } from 'es-toolkit/predicate';

// File 객체 확인
const file = new File(['hello'], 'example.txt', { type: 'text/plain' });
console.log(isFile(file)); // true

// Blob 객체는 File이 아니에요
const blob = new Blob(['hello'], { type: 'text/plain' });
console.log(isFile(blob)); // false

// 일반 객체들
console.log(isFile({})); // false
console.log(isFile([])); // false
console.log(isFile('text')); // false
console.log(isFile(null)); // false
console.log(isFile(undefined)); // false
```

주어진 인자가 유효한 파일인지 검증할 때 사용할 수 있어요.

```typescript
// 파일 업로드 핸들러
function handleFileUpload(input: unknown) {
  if (isFile(input)) {
    console.log(`파일명: ${input.name}`);
    console.log(`파일 크기: ${input.size} bytes`);
    console.log(`파일 타입: ${input.type}`);
    console.log(`마지막 수정: ${input.lastModified}`);

    // File이 확실하므로 안전하게 파일 관련 속성에 접근 가능
    return input;
  }

  throw new Error('유효한 파일이 아닙니다');
}
```

JavaScript 실행 환경에서 `File`이 지원되지 않는 경우도 안전하게 처리해요.

```typescript
// Node.js 환경이나 File을 지원하지 않는 환경에서도 안전
console.log(isFile(new Date())); // false

// File이 정의되지 않은 환경에서도 에러가 발생하지 않음
if (typeof File === 'undefined') {
  console.log(isFile({})); // false
}
```

#### 파라미터

- `value` (`unknown`): File 객체인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 File 객체이면 `true`, 그렇지 않으면 `false`를 반환해요.
