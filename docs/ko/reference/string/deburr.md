# deburr

특수문자와 발음 기호를 ASCII 문자로 바꿔요.

```typescript
const result = deburr(str);
```

## 레퍼런스

### `deburr(str)`

문자열에 있는 특수문자나 발음 기호(다이어크리틱)를 ASCII 문자로 바꾸고 싶을 때 `deburr`를 사용하세요. URL이나 파일명, 검색 기능에서 문자를 정규화할 때 유용해요.

```typescript
import { deburr } from 'es-toolkit/string';

// 기본 사용법
deburr('café'); // returns 'cafe'
deburr('résumé'); // returns 'resume'
deburr('naïve'); // returns 'naive'
deburr('Zürich'); // returns 'Zurich'
```

다양한 언어의 특수문자를 처리할 수 있어요.

```typescript
import { deburr } from 'es-toolkit/string';

// 독일어
deburr('München'); // returns 'Munchen'
deburr('Björk'); // returns 'Bjork'

// 프랑스어
deburr('Crème brûlée'); // returns 'Creme brulee'
deburr('naïveté'); // returns 'naivete'

// 스페인어
deburr('niño'); // returns 'nino'
deburr('mañana'); // returns 'manana'
```

URL 생성이나 파일명 정리에 활용할 수 있어요.

```typescript
import { deburr } from 'es-toolkit/string';

// URL 슬러그 생성
const title = 'Café의 특별한 메뉴';
const slug = deburr(title).toLowerCase().replace(/\s+/g, '-');
// returns 'cafe의-특별한-메뉴'

// 파일명 정리
const fileName = 'résumé-김철수.pdf';
const cleanName = deburr(fileName); // returns 'resume-김철수.pdf'
```

검색 기능에서 문자열 비교를 쉽게 만들어줘요.

```typescript
import { deburr } from 'es-toolkit/string';

function searchMatch(query: string, target: string): boolean {
  const normalizedQuery = deburr(query.toLowerCase());
  const normalizedTarget = deburr(target.toLowerCase());
  return normalizedTarget.includes(normalizedQuery);
}

searchMatch('cafe', 'Café Mocha'); // returns true
searchMatch('resume', 'résumé.pdf'); // returns true
```

#### 파라미터

- `str` (`string`): 특수문자나 발음 기호가 포함된 문자열이에요.

#### 반환 값

(`string`): 특수문자와 발음 기호가 ASCII 문자로 바뀐 새로운 문자열을 반환해요.
