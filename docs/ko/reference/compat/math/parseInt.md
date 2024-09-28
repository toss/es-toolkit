# parseInt

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

문자열을 정수로 바꿔요. 기수를 `radix` 파라미터로 정의할 수 있어요.

기수 `radix`가 정의되지 않았거나 0인 경우에는, 주어진 문자열의 형식에 따라서 다른 기수가 사용돼요. 문자열이 `0x20`처럼 16진수인 경우에는, 기수를 16으로 사용해요. 그렇지 않으면 기수를 10으로 사용해요.

## 인터페이스

```typescript
function parseInt(string: string, radix?: number): number;
```

### 파라미터

- `string` (`string`): 정수로 변환할 문자열.
- `radix` (`number`): 문자열을 정수로 변환할 때 사용할 기수. 기본값은 `0`이에요.

### 반환 값

(`number`): 변환된 정수.

## 예시

```typescript
parseInt('08'); // => 8
parseInt('0x20'); // => 32

parseInt('08', 10); // => 8
parseInt('0x20', 16); // => 32

['6', '08', '10'].map(parseInt); // => [6, 8, 10]
```
