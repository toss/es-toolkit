# isTypedArray

주어진 값이 TypedArray 인스턴스인지 확인해요.

```typescript
const result = isTypedArray(value);
```

## 레퍼런스

### `isTypedArray(value)`

값이 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 인스턴스인지 확인하고 싶을 때 `isTypedArray`를 사용하세요. TypedArray는 바이너리 데이터를 효율적으로 처리할 때 유용해요.

```typescript
import { isTypedArray } from 'es-toolkit/predicate';

// TypedArray 인스턴스들
const uint8 = new Uint8Array([1, 2, 3]);
const int16 = new Int16Array([1000, 2000]);
const float32 = new Float32Array([1.5, 2.5]);
const bigUint64 = new BigUint64Array([1n, 2n]);

console.log(isTypedArray(uint8)); // true
console.log(isTypedArray(int16)); // true
console.log(isTypedArray(float32)); // true
console.log(isTypedArray(bigUint64)); // true

// TypedArray가 아닌 값들
console.log(isTypedArray([1, 2, 3])); // false (일반 배열)
console.log(isTypedArray(new ArrayBuffer(8))); // false (ArrayBuffer)
console.log(isTypedArray(new DataView(new ArrayBuffer(8)))); // false (DataView)
console.log(isTypedArray({})); // false
console.log(isTypedArray(null)); // false
console.log(isTypedArray(undefined)); // false
```

바이너리 데이터 처리와 성능 최적화에 유용해요:

```typescript
// 안전한 바이너리 데이터 처리
function processBinaryData(data: unknown): number {
  if (isTypedArray(data)) {
    // TypeScript가 data를 TypedArray로 추론
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += Number(data[i]);
    }
    return sum;
  }
  
  if (Array.isArray(data)) {
    return data.reduce((sum, val) => sum + Number(val), 0);
  }
  
  return 0;
}

// 사용 예시
const typedData = new Uint8Array([10, 20, 30]);
const normalData = [10, 20, 30];

console.log(processBinaryData(typedData)); // 60 (최적화된 처리)
console.log(processBinaryData(normalData)); // 60 (일반 배열 처리)

// 데이터 타입별 메모리 사용량 계산
function getMemoryUsage(data: unknown): { bytes: number; type: string } {
  if (isTypedArray(data)) {
    const bytesPerElement = data.BYTES_PER_ELEMENT;
    return {
      bytes: data.length * bytesPerElement,
      type: data.constructor.name
    };
  }
  
  if (Array.isArray(data)) {
    // 일반 배열은 대략적인 메모리 사용량 추정
    return {
      bytes: data.length * 8, // JavaScript 숫자는 보통 8바이트
      type: 'Array'
    };
  }
  
  return { bytes: 0, type: 'unknown' };
}

// 사용 예시
const int8Array = new Int8Array(100);    // 1 byte per element
const float64Array = new Float64Array(100); // 8 bytes per element
const regularArray = new Array(100);

console.log(getMemoryUsage(int8Array));    // { bytes: 100, type: 'Int8Array' }
console.log(getMemoryUsage(float64Array)); // { bytes: 800, type: 'Float64Array' }
console.log(getMemoryUsage(regularArray)); // { bytes: 800, type: 'Array' }
```

파일 I/O와 네트워크 통신에서 활용:

```typescript
// 데이터 인코딩/디코딩 유틸리티
function encodeToUint8Array(data: unknown): Uint8Array {
  if (isTypedArray(data)) {
    if (data instanceof Uint8Array) {
      return data;
    }
    // 다른 TypedArray를 Uint8Array로 변환
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
  
  if (typeof data === 'string') {
    return new TextEncoder().encode(data);
  }
  
  if (Array.isArray(data)) {
    return new Uint8Array(data);
  }
  
  throw new Error('지원하지 않는 데이터 타입입니다');
}

// 사용 예시
const stringData = 'Hello World';
const arrayData = [72, 101, 108, 108, 111];
const int16Data = new Int16Array([72, 101, 108, 108, 111]);

console.log(encodeToUint8Array(stringData)); // Uint8Array(11) [72, 101, 108, ...]
console.log(encodeToUint8Array(arrayData));  // Uint8Array(5) [72, 101, 108, 108, 111]
console.log(encodeToUint8Array(int16Data));  // Uint8Array(10) [72, 0, 101, 0, ...]

// 파일 처리 시뮬레이션
class FileProcessor {
  processData(data: unknown): { success: boolean; info: any } {
    if (isTypedArray(data)) {
      return {
        success: true,
        info: {
          type: 'TypedArray',
          constructor: data.constructor.name,
          length: data.length,
          byteLength: data.byteLength,
          bytesPerElement: data.BYTES_PER_ELEMENT
        }
      };
    }
    
    return {
      success: false,
      info: { type: typeof data, message: 'TypedArray가 필요합니다' }
    };
  }
  
  convertToOptimalType(values: number[], dataType: 'int' | 'float' = 'int'): any {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    
    if (dataType === 'int') {
      if (minValue >= 0 && maxValue <= 255) {
        return new Uint8Array(values);
      } else if (minValue >= -128 && maxValue <= 127) {
        return new Int8Array(values);
      } else if (minValue >= -32768 && maxValue <= 32767) {
        return new Int16Array(values);
      } else {
        return new Int32Array(values);
      }
    } else {
      return new Float32Array(values);
    }
  }
}

// 사용 예시
const processor = new FileProcessor();
const imageData = new Uint8ClampedArray([255, 0, 128, 255]);

console.log(processor.processData(imageData));
// {
//   success: true,
//   info: {
//     type: 'TypedArray',
//     constructor: 'Uint8ClampedArray',
//     length: 4,
//     byteLength: 4,
//     bytesPerElement: 1
//   }
// }

const optimizedData = processor.convertToOptimalType([10, 20, 30]);
console.log(isTypedArray(optimizedData)); // true
console.log(optimizedData.constructor.name); // 'Uint8Array'
```

WebGL과 그래픽 처리 응용:

```typescript
// 버텍스 데이터 처리
function processVertexData(vertices: unknown): Float32Array | null {
  if (isTypedArray(vertices)) {
    if (vertices instanceof Float32Array) {
      return vertices;
    }
    // 다른 TypedArray를 Float32Array로 변환
    return new Float32Array(vertices);
  }
  
  if (Array.isArray(vertices)) {
    return new Float32Array(vertices);
  }
  
  return null;
}

// 색상 데이터 정규화
function normalizeColorData(colors: unknown): Uint8Array | null {
  if (isTypedArray(colors)) {
    if (colors instanceof Uint8Array) {
      return colors;
    }
    
    // 다른 TypedArray에서 변환
    const normalized = new Uint8Array(colors.length);
    for (let i = 0; i < colors.length; i++) {
      normalized[i] = Math.max(0, Math.min(255, Number(colors[i])));
    }
    return normalized;
  }
  
  if (Array.isArray(colors)) {
    return new Uint8Array(colors.map(c => Math.max(0, Math.min(255, c))));
  }
  
  return null;
}

// 사용 예시
const vertexData = [1.0, 0.5, 0.0, 0.5, 1.0, 0.5];
const colorData = new Int16Array([255, 128, 64, 255]);

const processedVertices = processVertexData(vertexData);
const processedColors = normalizeColorData(colorData);

console.log(isTypedArray(processedVertices)); // true
console.log(processedVertices?.constructor.name); // 'Float32Array'
console.log(isTypedArray(processedColors)); // true
console.log(processedColors?.constructor.name); // 'Uint8Array'
```

성능 벤치마킹과 메모리 최적화:

```typescript
// TypedArray 성능 비교
function benchmarkArrayOperations(size: number) {
  const regularArray = new Array(size).fill(0).map((_, i) => i);
  const typedArray = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    typedArray[i] = i;
  }
  
  return {
    regular: {
      isTypedArray: isTypedArray(regularArray),
      memoryEstimate: size * 8, // 대략적인 추정
      type: 'Array'
    },
    typed: {
      isTypedArray: isTypedArray(typedArray),
      memoryActual: typedArray.byteLength,
      type: typedArray.constructor.name,
      bytesPerElement: typedArray.BYTES_PER_ELEMENT
    }
  };
}

// 사용 예시
const benchmark = benchmarkArrayOperations(10000);
console.log(benchmark);
// {
//   regular: { isTypedArray: false, memoryEstimate: 80000, type: 'Array' },
//   typed: { isTypedArray: true, memoryActual: 40000, type: 'Float32Array', bytesPerElement: 4 }
// }

// 메모리 효율적인 데이터 저장소
class EfficientDataStore {
  private data: Map<string, any> = new Map();
  
  store(key: string, values: unknown) {
    if (isTypedArray(values)) {
      this.data.set(key, values);
      return `${key} 저장됨 (${values.constructor.name})`;
    }
    
    if (Array.isArray(values)) {
      // 최적화된 TypedArray로 변환
      const typedArray = this.optimizeArray(values);
      this.data.set(key, typedArray);
      return `${key} 저장됨 (${typedArray.constructor.name}로 최적화)`;
    }
    
    return `${key} 저장 실패: 지원하지 않는 타입`;
  }
  
  private optimizeArray(arr: number[]): any {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    if (Number.isInteger(max) && Number.isInteger(min)) {
      if (min >= 0 && max <= 255) return new Uint8Array(arr);
      if (min >= -128 && max <= 127) return new Int8Array(arr);
      if (min >= 0 && max <= 65535) return new Uint16Array(arr);
      if (min >= -32768 && max <= 32767) return new Int16Array(arr);
      return new Int32Array(arr);
    }
    
    return new Float32Array(arr);
  }
  
  getInfo(key: string) {
    const data = this.data.get(key);
    if (isTypedArray(data)) {
      return {
        type: data.constructor.name,
        length: data.length,
        byteLength: data.byteLength,
        bytesPerElement: data.BYTES_PER_ELEMENT
      };
    }
    return null;
  }
}

// 사용 예시
const store = new EfficientDataStore();

console.log(store.store('colors', [255, 128, 64, 32])); // 저장됨 (Uint8Array로 최적화)
console.log(store.store('positions', [1.5, 2.7, 3.14])); // 저장됨 (Float32Array로 최적화)
console.log(store.store('existing', new Int16Array([1000, 2000]))); // 저장됨 (Int16Array)

console.log(store.getInfo('colors'));
// { type: 'Uint8Array', length: 4, byteLength: 4, bytesPerElement: 1 }
```

#### 파라미터

- `value` (`unknown`): TypedArray 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array`): 값이 TypedArray 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
