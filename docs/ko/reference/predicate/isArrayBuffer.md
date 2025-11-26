# isArrayBuffer

주어진 값이 `ArrayBuffer` 인스턴스인지 확인해요.

```typescript
const result = isArrayBuffer(value);
```

## 사용법

### `isArrayBuffer(value)`

값이 `ArrayBuffer`인지 확인하고 싶을 때 `isArrayBuffer`를 사용하세요. TypeScript에서 타입 가드로도 활용할 수 있어요.

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// ArrayBuffer 인스턴스 확인
const buffer = new ArrayBuffer(16);
const notBuffer = new Array(16);

console.log(isArrayBuffer(buffer)); // true
console.log(isArrayBuffer(notBuffer)); // false

// 바이너리 데이터 처리 시 유용해요
const data: unknown = getDataFromAPI();
if (isArrayBuffer(data)) {
  // TypeScript에서 data는 ArrayBuffer로 타입이 좁혀져요
  const uint8View = new Uint8Array(data);
  console.log(`Buffer size: ${data.byteLength} bytes`);
}

// 다양한 타입과 비교
console.log(isArrayBuffer(new ArrayBuffer(8))); // true
console.log(isArrayBuffer(new Uint8Array(8))); // false
console.log(isArrayBuffer(new DataView(new ArrayBuffer(8)))); // false
console.log(isArrayBuffer([])); // false
console.log(isArrayBuffer({})); // false
console.log(isArrayBuffer(null)); // false
console.log(isArrayBuffer(undefined)); // false
```

파일 처리나 네트워크 통신에서 자주 사용해요.

```typescript
import { isArrayBuffer } from 'es-toolkit/predicate';

// 파일 읽기 결과 처리
async function processFileData(file: File) {
  const result = await file.arrayBuffer();

  if (isArrayBuffer(result)) {
    console.log(`파일 크기: ${result.byteLength} 바이트`);

    // 바이너리 데이터 처리
    const view = new DataView(result);
    const header = view.getUint32(0, true);
    console.log(`파일 헤더: ${header.toString(16)}`);
  }
}

// WebSocket에서 받은 데이터 확인
function handleWebSocketMessage(data: unknown) {
  if (isArrayBuffer(data)) {
    console.log('바이너리 메시지를 받았어요');
    const bytes = new Uint8Array(data);
    // 바이트 데이터 처리
  } else if (typeof data === 'string') {
    console.log('텍스트 메시지를 받았어요');
    // 문자열 데이터 처리
  }
}
```

#### 파라미터

- `value` (`unknown`): `ArrayBuffer`인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 `ArrayBuffer`이면 `true`, 아니면 `false`를 반환해요.
