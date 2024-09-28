# toPath

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

깊은 키를 나타내는 문자열을 파싱해서, 경로를 나타내는 배열로 변환해요.

예를 들어서, `a[0].b.c`는 `['a', '0', 'b', 'c']`로 변환돼요.

## 인터페이스

```typescript
function toPath(deepKey: string): string[];
```

### 파라미터

- `deepKey` (`string`): 변환할 깊은 키 문자열.

### 반환 값

(`string[]`): 경로의 각 세그먼트를 나타내는 문자열 배열.

## 예시

```typescript
toPath('a.b.c'); // ['a', 'b', 'c'] 반환
toPath('a[b][c]'); // ['a', 'b', 'c'] 반환
toPath('.a.b.c'); // ['', 'a', 'b', 'c'] 반환
toPath('a["b.c"].d'); // ['a', 'b.c', 'd'] 반환
toPath(''); // [] 반환
toPath('.a[b].c.d[e]["f.g"].h'); // ['', 'a', 'b', 'c', 'd', 'e', 'f.g', 'h'] 반환
```
