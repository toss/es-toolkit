# isBlob

주어진 값이 Blob 인스턴스인지 확인해요.

```typescript
const result = isBlob(value);
```

## 레퍼런스

### `isBlob(value)`

값이 Blob 인스턴스인지 확인하고 싶을 때 `isBlob`을 사용하세요. 브라우저 환경에서 파일이나 바이너리 데이터를 다룰 때 유용해요.

```typescript
import { isBlob } from 'es-toolkit/predicate';

// 기본 Blob 인스턴스들
const blob = new Blob(['hello'], { type: 'text/plain' });
const file = new File(['content'], 'example.txt', { type: 'text/plain' });

console.log(isBlob(blob)); // true
console.log(isBlob(file)); // true (File은 Blob을 상속함)

// Blob이 아닌 값들
console.log(isBlob(new ArrayBuffer(8))); // false
console.log(isBlob('text data')); // false
console.log(isBlob({})); // false
console.log(isBlob(null)); // false
```

파일 처리나 API 응답 검증에 유용해요.

```typescript
import { isBlob } from 'es-toolkit/predicate';

// 파일 업로드 처리
function processUploadedFile(file: unknown) {
  if (isBlob(file)) {
    // TypeScript가 file을 Blob으로 추론
    console.log(`파일 크기: ${file.size} 바이트`);
    console.log(`MIME 타입: ${file.type}`);
    
    // Blob 메서드 안전하게 사용
    file.text().then(text => console.log('내용:', text));
  } else {
    console.log('유효하지 않은 파일입니다');
  }
}

// 다운로드 기능 구현
async function handleDownload(data: unknown, filename: string) {
  if (isBlob(data)) {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
```

#### 파라미터

- `value` (`unknown`): Blob 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is Blob`): 값이 Blob 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
