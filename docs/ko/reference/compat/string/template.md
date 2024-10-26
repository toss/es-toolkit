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
// Use the "escape" delimiter to escape data properties.
const compiled = template('<%- value %>');
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// Use the "interpolate" delimiter to interpolate data properties.
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "evaluate" delimiter to evaluate JavaScript code.
const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
compiled({ value: true }); // returns 'Yes'

// Use the "variable" option to specify the data object variable name.
const compiled = template('<%= data.value %>', { variable: 'data' });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "imports" option to import functions.
const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
compiled({ value: 'hello, world!' }); // returns 'HELLO, WORLD!'

// Use the custom "escape" delimiter.
const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
compiled({ value: '<div>' }); // returns '&lt;div&gt;'

// Use the custom "evaluate" delimiter.
const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
compiled({ value: true }); // returns 'Yes'

// Use the custom "interpolate" delimiter.
const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'

// Use the "sourceURL" option to specify the source URL of the template.
const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
```
