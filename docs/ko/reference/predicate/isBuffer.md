# isBuffer

주어진 값이 Buffer 인스턴스인지 확인해요.

```typescript
const result = isBuffer(value);
```

## 레퍼런스

### `isBuffer(value)`

Node.js 환경에서 Buffer 객체인지 확인하고 싶을 때 `isBuffer`를 사용하세요. 파일 처리, 네트워크 통신, 바이너리 데이터 조작 시 유용해요. TypeScript에서 타입 가드로 동작해서 값의 타입을 `Buffer`로 좁혀줘요.

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// Buffer 인스턴스 확인
const buffer = Buffer.from('hello world', 'utf8');
isBuffer(buffer); // true

// 다른 타입들과 구분
isBuffer('hello world'); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer(new ArrayBuffer(8)); // false
```

TypeScript에서 타입 가드로 사용할 때 특히 유용해요.

```typescript
import { isBuffer } from 'es-toolkit/predicate';

function processData(data: unknown) {
  if (isBuffer(data)) {
    // data는 Buffer로 타입이 좁혀져요
    console.log(`Buffer 크기: ${data.length} 바이트`);
    console.log(`Buffer 내용: ${data.toString('utf8')}`);
    
    // Buffer 메서드를 안전하게 사용할 수 있어요
    const slice = data.slice(0, 10);
  }
}
```

파일 처리나 네트워크 통신에서 자주 사용돼요.

```typescript
import { isBuffer } from 'es-toolkit/predicate';

// 파일 데이터 처리
function readFileData(data: unknown) {
  if (isBuffer(data)) {
    const text = data.toString('utf8');
    const header = data.readUInt32BE(0);
    console.log('파일 내용:', text);
  }
}

// 네트워크 데이터 처리
function handleNetworkData(chunk: unknown) {
  if (isBuffer(chunk)) {
    console.log(`받은 데이터 크기: ${chunk.length} 바이트`);
    const processed = Buffer.concat([chunk, Buffer.from('\n')]);
    return processed;
  }
  return null;
}
```

#### 파라미터

- `value` (`unknown`): Buffer 인스턴스인지 확인할 값이에요.

#### 반환 값

(`boolean`): 값이 Buffer 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.

