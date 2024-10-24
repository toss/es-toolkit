# template

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

템플릿 문자열을 렌더링하는 함수를 만들어요.

반환된 함수는 값을 쓰기 안전한 형태로 이스케이핑하거나, 값을 평가하거나, 값을 연결해서 문자열을 만드는 데에 사용할 수 있어요. 변수 이름이나 함수 호출과 같이 JavaScript 식을 평가할 수 있어요.

## 인터페이스

```typescript
function template(string: string, options?: TemplateOptions): ((data?: object) => string) & { source: string };
```

### 파라미터

- `string` (`string`): 템플릿 문자열.
- `options.escape` (`RegExp`): "escape" 구분 기호에 대한 정규 표현식.
- `options.evaluate` (`RegExp`): "evaluate" 구분 기호에 대한 정규 표현식.
- `options.interpolate` (`RegExp`): "interpolate" 구분 기호에 대한 정규 표현식.
- `options.variable` (`string`): 데이터 객체 변수 이름.
- `options.imports` (`Record<string, unknown>`): 가져온 함수의 객체.
- `options.sourceURL` (`string`): 템플릿의 소스 URL.
- `guard` (`unknown`): `options`와 함께 함수가 호출되면 이를 감지하는 보호 장치.

### 반환 값

(`(data?: object) => string`): 컴파일된 템플릿 함수를 반환합니다.

## 예시

```typescript
// "escape" 구분 기호를 사용해서 값을 안전하게 쓸 수 있도록 이스케이핑하세요.
const compiled = template('<%- value %>');
compiled({ value: '<div>' }); // '&lt;div&gt;'을 반환

// "interpolate" 구분 기호를 사용해서 값을 연결한 문자열을 만드세요.
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' }); // 'Hello, World!'을 반환

// "evaluate" 구분 기호를 사용해서 JavaScript 식을 평가하세요.
const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
compiled({ value: true }); // 'Yes'를 반환

// "variable" 구분 기호를 사용해서 변수나 프로퍼티 값에 접근하세요.
const compiled = template('<%= data.value %>', { variable: 'data' });
compiled({ value: 'Hello, World!' }); // 'Hello, World!'을 반환

// "imports" 옵션을 사용하여 함수를 임포트하세요.
const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
compiled({ value: 'hello, world!' }); // 'HELLO, WORLD!'을 반환

// 커스텀 "escape" 구분 기호를 사용하는 방법
const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// 커스텀 "evaluate" 구분 기호를 사용하는 방법
const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
compiled({ value: true }); // returns 'Yes'

// 커스텀 "interpolate" 구분 기호를 사용하는 방법
const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// "sourceURL" 옵션으로 템플릿의 소스 URL을 지정하세요.
const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
```
