# isBuffer

주어진 값이 `Buffer` 인스턴스인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Buffer`으로 좁혀요.

## 인터페이스

```typescript
function isBuffer(value: unknown): boolean;
```

### 파라미터

- `value` (`unknown`): `Buffer`인지 확인할 값이에요.

### 반환 값

(`boolean`): 값이 `Buffer`이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// Buffer 인스턴스 확인
const buffer = Buffer.from('hello world', 'utf8');
console.log(isBuffer(buffer)); // true

// 다른 타입들과 구분
console.log(isBuffer('hello world')); // false
console.log(isBuffer(new Uint8Array([1, 2, 3]))); // false
console.log(isBuffer(new ArrayBuffer(8))); // false
console.log(isBuffer({})); // false
console.log(isBuffer(null)); // false
console.log(isBuffer(undefined)); // false

// TypeScript에서 타입 가드로 사용
function processData(data: unknown) {
  if (isBuffer(data)) {
    // data는 Buffer로 타입이 좁혀져요
    console.log(`Buffer 크기: ${data.length} 바이트`);
    console.log(`Buffer 내용: ${data.toString('utf8')}`);
    
    // Buffer 메서드를 안전하게 사용할 수 있어요
    const slice = data.slice(0, 10);
    console.log('처음 10바이트:', slice);
  } else {
    console.log('Buffer가 아니에요');
  }
}

// 파일 처리에서 활용
function readFileData(data: unknown) {
  if (isBuffer(data)) {
    // 텍스트로 변환
    const text = data.toString('utf8');
    console.log('파일 내용:', text);
    
    // 바이너리 데이터 처리
    const header = data.readUInt32BE(0);
    console.log('파일 헤더:', header.toString(16));
  }
}

// 네트워크 데이터 처리
function handleNetworkData(chunk: unknown) {
  if (isBuffer(chunk)) {
    console.log(`받은 데이터 크기: ${chunk.length} 바이트`);
    
    // 버퍼 조작
    const processed = Buffer.concat([chunk, Buffer.from('\n')]);
    return processed;
  }
  return null;
}

// Buffer 환경 확인
function checkBufferSupport() {
  const testValue = typeof Buffer !== 'undefined' ? Buffer.alloc(0) : null;
  
  if (isBuffer(testValue)) {
    console.log('Buffer를 사용할 수 있어요');
  } else {
    console.log('Buffer를 사용할 수 없어요 (브라우저 환경일 가능성)');
  }
}
```
