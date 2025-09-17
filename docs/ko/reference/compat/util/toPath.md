# toPath (Lodash 호환성)

::: warning split과 정규식 사용 권장

문자열 경로를 배열로 변환할 때는 String.split()과 정규식을 사용하는 것이 더 명확하고 표준적인 방식이에요.

대신 더 빠르고 현대적인 String.split()을 사용하세요.

:::

깊은 키를 나타내는 문자열을 파싱해서, 경로를 나타내는 배열로 변환해요.

```typescript
toPath('a.b.c'); // ['a', 'b', 'c']
toPath('a[0].b.c'); // ['a', '0', 'b', 'c']
toPath('a["b.c"].d'); // ['a', 'b.c', 'd']
```

## 레퍼런스

### `toPath(deepKey: string): string[]`

깊은 키 문자열을 경로 배열로 변환해요.

#### 파라미터

- `deepKey` (`string`): 변환할 깊은 키 문자열

### 반환 값

(`string[]`): 경로의 각 세그먼트를 나타내는 문자열 배열
