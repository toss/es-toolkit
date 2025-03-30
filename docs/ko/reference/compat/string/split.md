# split

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

인수로 전달받은 문자열을 구분자(`separator`)를 기준으로 분할하여, 그 분할값을 요소로 갖는 새로운 배열을 반환해요.

## 인터페이스

```typescript
function split(string: string): string[];
function split(string: string, separator: RegExp | string): string[];
function split(string: string, separator: RegExp | string, limit: number): string[];
```

## 파라미터

- `string` (`string`): 분할할 문자열이에요.
- `separator` (`RegExp|string`): 분할 기준으로 사용할 구분자 패턴이에요.
- `limit` (`number`): 결과 배열의 최대 길이예요.

## 반환 값

- (`Array`): 분할된 문자열 세그먼트들의 배열이에요.

## 예시

```js
// 문자를 기준으로 문자열 분할하기
split('a-b-c', '-');
// => ['a', 'b', 'c']

// 최대 길이 제한을 사용하여 분할하기
split('a-b-c', '-', 2);
// => ['a', 'b']

// 정규표현식 패턴으로 분할하기
split('abcde', /[bd]/);
// => ['a', 'c', 'e']

// 문자열을 개별 문자로 분할하기
split('abc', '');
// => ['a', 'b', 'c']
```
