# template (Lodash 호환성)

::: warning JavaScript 템플릿 리터럴을 사용하세요

이 `template` 함수는 복잡한 문자열 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 JavaScript 템플릿 리터럴을 사용하세요.

:::

문자열 템플릿에 값을 넣어서 새로운 문자열을 만드는 함수를 만들어요.

```typescript
const compiled = template(templateString);
```

## 레퍼런스

### `template(string, options?)`

문자열 템플릿에 데이터를 넣어서 완성된 문자열을 만들고 싶을 때 `template`을 사용하세요. 값을 안전하게 이스케이프하거나, 그대로 넣거나, JavaScript 코드를 실행할 수 있어요.

기본 사용법으로 값을 넣거나 이스케이프할 수 있어요.

```typescript
import { template } from 'es-toolkit/compat';

// 값을 그대로 넣어요
const compiled = template('<%= value %>');
compiled({ value: 'Hello, World!' });
// Returns: 'Hello, World!'

// HTML을 안전하게 이스케이프해요
const safeCompiled = template('<%- value %>');
safeCompiled({ value: '<script>alert("xss")</script>' });
// Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

JavaScript 코드를 실행할 수도 있어요.

```typescript
import { template } from 'es-toolkit/compat';

// 조건문 사용
const compiled = template('<% if (user) { %>안녕하세요 <%= user %>님!<% } %>');
compiled({ user: 'es-toolkit' });
// Returns: '안녕하세요 es-toolkit님!'

// 반복문 사용
const listTemplate = template('<% users.forEach(function(user) { %><li><%= user %></li><% }); %>');
listTemplate({ users: ['철수', '영희', '민수'] });
// Returns: '<li>철수</li><li>영희</li><li>민수</li>'
```

변수 이름을 지정해서 안전하게 사용할 수 있어요.

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= data.name %>님의 나이는 <%= data.age %>세예요', { 
  variable: 'data' 
});
compiled({ name: '철수', age: 25 });
// Returns: '철수님의 나이는 25세예요'
```

외부 함수를 가져와서 사용할 수 있어요.

```typescript
import { template } from 'es-toolkit/compat';

const compiled = template('<%= _.toUpper(message) %>', {
  imports: { _: { toUpper: (str) => str.toUpperCase() } }
});
compiled({ message: 'hello world' });
// Returns: 'HELLO WORLD'
```

사용자 정의 구분자도 만들 수 있어요.

```typescript
import { template } from 'es-toolkit/compat';

// 사용자 정의 구분자로 값 넣기
const compiled = template('{{ message }}', {
  interpolate: /\{\{([\s\S]+?)\}\}/g
});
compiled({ message: '안녕하세요!' });
// Returns: '안녕하세요!'

// 사용자 정의 구분자로 이스케이프
const safeCompiled = template('[- html -]', {
  escape: /\[-([\s\S]+?)-\]/g
});
safeCompiled({ html: '<div>내용</div>' });
// Returns: '&lt;div&gt;내용&lt;/div&gt;'
```

#### 파라미터

- `string` (`string`): 템플릿 문자열이에요.
- `options` (`object`, 선택): 설정 객체예요.
  - `options.escape` (`RegExp`, 선택): HTML을 이스케이프할 구분자 정규식이에요. 기본값은 `<%-([\s\S]+?)%>`이에요.
  - `options.evaluate` (`RegExp`, 선택): JavaScript 코드를 실행할 구분자 정규식이에요. 기본값은 `<%([\s\S]+?)%>`이에요.
  - `options.interpolate` (`RegExp`, 선택): 값을 넣을 구분자 정규식이에요. 기본값은 `<%=([\s\S]+?)%>`이에요.
  - `options.variable` (`string`, 선택): 데이터 객체의 변수 이름이에요.
  - `options.imports` (`object`, 선택): 템플릿에서 사용할 함수들이에요.
  - `options.sourceURL` (`string`, 선택): 디버깅용 소스 URL이에요.

### 반환 값

(`TemplateExecutor`): 데이터 객체를 받아서 완성된 문자열을 반환하는 함수예요. `source` 속성으로 생성된 함수 코드도 확인할 수 있어요.