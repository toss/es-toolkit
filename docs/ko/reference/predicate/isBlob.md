# isBlob

주어진 값이 `Blob` 인스턴스인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Blob`으로 좁혀요.

## 인터페이스

```typescript
function isBlob(value: unknown): value is Blob;
```

### 파라미터

- `value` (`unknown`): `Blob`인지 확인할 값이에요.

### 반환 값

(`value is Blob`): 값이 `Blob`이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isBlob } from 'es-toolkit/predicate';

// 기본 Blob 확인
const blob = new Blob(['hello'], { type: 'text/plain' });
console.log(isBlob(blob)); // true

// File도 Blob을 상속하므로 true를 반환해요
const file = new File(['content'], 'example.txt', { type: 'text/plain' });
console.log(isBlob(file)); // true

// 다른 타입들과 구분
console.log(isBlob(new ArrayBuffer(8))); // false
console.log(isBlob('text data')); // false
console.log(isBlob({})); // false
console.log(isBlob(null)); // false
console.log(isBlob(undefined)); // false

// TypeScript에서 타입 가드로 사용
function processFile(input: unknown) {
  if (isBlob(input)) {
    // input은 Blob으로 타입이 좁혀져요
    console.log(`파일 크기: ${input.size} 바이트`);
    console.log(`MIME 타입: ${input.type}`);
    
    // Blob 메서드를 안전하게 사용할 수 있어요
    input.text().then(text => console.log('내용:', text));
  } else {
    console.log('Blob이 아니에요');
  }
}

// 파일 업로드 처리 예시
function handleFileUpload(files: FileList) {
  for (const file of files) {
    if (isBlob(file)) {
      console.log(`업로드 파일: ${file.name} (${file.size} bytes)`);
    }
  }
}

// API에서 받은 데이터 처리
async function downloadFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  
  if (isBlob(data)) {
    const downloadUrl = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'downloaded-file';
    link.click();
    URL.revokeObjectURL(downloadUrl);
  }
}
```
