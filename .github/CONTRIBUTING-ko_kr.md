# es-toolkit에 기여하기

어떤 분들의 기여도 환영해요! 이 저장소에서 모든 소통은 영어로 진행돼요. 한국어는 보조 언어로 사용돼요.

> es-toolkit에 기여할 때, [행동 강령(Code of conduct)](./CODE_OF_CONDUCT.md)을 준수해 주세요. 허용되는 행동과 허용되지 않는 행동을 준수해 주세요.

## AI 사용 정책

기여할 내용을 조사하고, 작성하고, 검토할 때 AI를 활용하는 걸 권장해요. 잘 쓰면 좋은 도구고, 저희도 쓰고 있어요.

다만 제출하는 내용은 본인이 직접 검토하고 깊이 이해해야 해요. 그래서 **외부 기여자가 작성하는 이슈와 Pull Request의 설명은 사람이 직접 써야 해요**. 재현 코드를 만들거나 코드베이스를 파악할 때는 AI의 도움을 받아도 괜찮아요. 설명에만 이 규칙을 두는 이유는, 메인테이너가 제보가 말이 되는지 판단할 때 가장 먼저 읽는 게 설명이기 때문이에요.

AI가 대신 써준 코드까지 포함해서, 본인 이름으로 보낸 모든 내용의 책임은 기여자에게 있어요. 보낸 사람이 읽어보지 않은 게 분명한 기여는 자세히 리뷰하지 않고 닫아요. 설명이 실제 변경 내용과 맞지 않거나, 한 번도 실행해 보지 않은 재현 코드거나, 존재하지 않는 문제를 고치는 경우가 그래요.

## 패키지 매니저

이 프로젝트는 **Yarn 4**를 패키지 매니저로 사용해요. `yarn install`을 실행하면 Corepack을 통해 올바른 버전이 자동으로 설치돼요.

시작하는 방법:

1. Node.js가 설치되어 있는지 확인하세요 (필요한 버전은 `.nvmrc` 파일을 참고하세요)
2. Corepack을 활성화하세요: `corepack enable`
3. 의존성을 설치하세요: `yarn install`

## 1. 설계 원칙

es-toolkit 프로젝트는 성능, 구현의 단순함, 그리고 꼼꼼한 문서화가 중요해요. 다양한 기능과 옵션을 지원하기보다, 성능이 뛰어나고 안정적으로 작동하는 핵심 유틸리티들만 제공하려고 해요.

### 1.1 개발 범위

#### `es-toolkit`

메인 라이브러리인 `es-toolkit`은 현대적인 JavaScript 프로젝트에서 일반적으로 사용되는 고품질 유틸리티 함수들을 담아요.

JavaScript의 내장 함수로는 만들기 어렵지만 자주 필요하고 유용한 함수들을 포함해요.

[`delay`](https://es-toolkit.dev/reference/promise/delay.html), [`windowed`](https://es-toolkit.dev/reference/array/windowed.html), [`keyBy`](https://es-toolkit.dev/reference/array/keyBy.html), [`mapValues`](https://es-toolkit.dev/reference/object/mapValues.html), [`camelCase`](https://es-toolkit.dev/reference/string/camelCase.html), [`toSnakeCaseKeys`](https://es-toolkit.dev/reference/object/toSnakeCaseKeys.html) 같은 함수를 참고해 주세요.

최신 JavaScript 내장 함수로 쉽게 대체할 수 있는 함수들은 구현하지 않아요. 예를 들어, 다음과 같은 함수들은 `es-toolkit`의 개발 범위가 아니에요.

- `isArray` (`Array.isArray`를 대신 사용)
- `isNaN` (`Number.isNaN`를 대신 사용)
- `isNumber` (`typeof value === 'number'`를 대신 사용)
- `min` (`Math.min()`를 대신 사용)

TC39 제안에 포함된 함수의 경우, Stage 3에 도달하면 구현하지 않아요. Stage 2.7 이하의 초기 제안에 대해서는 명확한 필요가 있다면 추가를 고려할 수 있지만, 제안이 Stage 3 이상으로 진행되면 해당 함수를 지원 중단할 예정이에요. 그 시점에서는 네이티브 구현을 사용하는 것이 더 나은 선택이기 때문이에요.

#### `es-toolkit/compat`

[`Lodash`](https://lodash.com/docs/4.17.15)를 사용하는 프로젝트가 es-toolkit로 쉽게 마이그레이션할 수 있도록, `es-toolkit/compat`은 `Lodash`에서 제공하는 함수를 그대로 구현해요.

`es-toolkit/compat`은 필요한 함수를 이미 모두 갖췄어요. 새로운 함수는 더 이상 추가하지 않고, Lodash와 동작이 다른 부분만 고쳐요.

### 1.2 성능

es-toolkit에서 제공하는 모든 함수는 다른 유틸리티 라이브러리보다 성능이 더 좋거나 최소한 비슷한 수준이어야 해요.

함수가 수정될 때마다 [Vitest의 벤치마크 기능](https://vitest.dev/api/#bench)으로 성능을 측정해 주세요. 벤치마크 코드는 [`benchmark` 디렉토리](https://github.com/toss/es-toolkit/tree/main/benchmarks)에 모여 있으니, 참고해 주세요.

새로운 기능이 추가될 때는 벤치마크 코드도 추가해 주세요. 풀 리퀘스트를 열 때는 벤치마크 코드를 실행한 스크린샷도 함께 첨부해 주세요.

### 1.3 구현의 단순함

`es-toolkit`은 다양한 기능을 지원하기보다는, 구현과 인터페이스의 단순함을 중요하게 생각해요. 성능과 코드 가독성을 지키고, 쉽게 유지보수하기 위해서예요.

모든 요구사항이나 엣지 케이스를 만족하기 위한 복잡한 옵션을 제공하기보다, 85%에 해당하는 일반적인 사용 사례를 위한 가장 간단한 인터페이스와 구현을 제공하려고 해요.

같은 기능을 구현하기 위해서 여러 가지 코딩 스타일이 있어요. 성능 차이가 10% 미만이라면 다음 코딩 스타일 가이드라인을 따라 주세요.

<details>
<summary>
1. <code>reduce</code> 함수보다 <code>for</code> 문을 사용하세요.
</summary>

대부분의 경우 `reduce`보다 `for` 루프를 사용하세요. [immer](https://github.com/immerjs/immer)와 같은 도구 없이는 `reduce`로 불변성을 유지하는 것이 어렵고, 함수형 프로그래밍에서도 일반적으로 지역 변수 범위에서는 가변성을 허용하기 때문이에요.

예를 들어, `keyBy` 함수는 `reduce` 대신 `for ... of` 루프를 사용해서 구현되었어요.

```typescript
export function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T> {
  const result = {} as Record<K, T>;

  for (const item of arr) {
    const key = getKeyFromItem(item);
    result[key] = item;
  }

  return result;
}
```

</details>

<details>
<summary>
2. 내장 JavaScript 함수와 연산자를 사용하세요.
</summary>

`Array.isArray()`, `typeof value === 'string'`, `Number.isNaN()`과 같은 내장 JavaScript 함수, 메서드, 연산자를 사용하세요. `es-toolkit/compat`이나 다른 라이브러리의 `isArray()`, `isString()`, `isNaN()`과 같은 커스텀 함수는 사용하지 마세요.

이렇게 하면 코드를 더 간결하게 유지하고, 불필요한 함수 호출을 제거하며, 함수 간의 결합도를 줄일 수 있어요.

</details>

### 1.4 타입

정확한 타입을 제공하는 것은 es-toolkit의 핵심적인 목표예요.
동시에 TypeScript 자체의 타입 동작과 일관성을 유지하는 것도 중요해요.

es-toolkit은 가장 널리 사용되는 설정인 TypeScript [`strict` 모드](https://www.typescriptlang.org/tsconfig/#strict)와 동일한 타입을 반환하는 것을 목표로 해요.

예를 들어, 아래의 `result1`과 `result2`는 같은 타입을 가져야 해요. `result2`는 본질적으로 `result1`이 직접 수행하는 동작을 감싼 래퍼에 불과하기 때문이에요.

```typescript
import { sample } from 'es-toolkit';

const arr = [1, 2, 3];

const result1 = arr[Math.floor(Math.random() * arr.length)]; // TypeScript strict 모드에서 `number`로 추론
const result2 = sample(arr); // 마찬가지로 `number`로 추론되어야 함
```

[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)처럼 strict 모드 내에서도 기본값이 `false`인 옵션은 es-toolkit의 타입 호환성을 결정할 때 고려하지 않아요.

### 1.5 문서화

모든 함수들은 라이브러리 사용자가 쉽게 참고할 수 있도록 자세한 문서가 필요해요. 각 함수마다 JSDoc과 함께 레퍼런스 문서가 존재해야 해요. 레퍼런스 문서는 [문서 디렉토리](https://github.com/toss/es-toolkit/tree/main/docs)에 포함해 주세요.

영어 문서를 가장 높은 우선순위로 제공하고 있지만, 한국어, 일본어, 중국어 간체 문서도 지원하고 있어요. 낯선 외국어로 문서를 작성하는 데 어려움이 있다면 라이브러리 운영진에게 풀 리퀘스트로 알려주세요. 필요한 번역을 도와드릴게요.

## 2. 코딩 스타일

다음은 `es-toolkit` 저장소에서 따르는 코딩 규칙이에요:

### 2.1 타입 매개변수에는 짧은 이름을 사용하세요

- [difference](https://es-toolkit.dev/reference/array/difference.html)처럼 elements에는 `T`를 사용해요.
- [attempt](https://es-toolkit.dev/reference/util/attempt.html)처럼 errors에는 `E`를 사용해요.
- [groupBy](https://es-toolkit.dev/reference/array/groupBy.html)처럼 keys에는 `K`를 사용해요.

## 3. 이슈 관리

es-toolkit에는 코드 말고도 다양한 방법으로 기여할 수 있어요.

- [문서](https://es-toolkit.dev)를 개선해 주세요.
- [Issues 탭에서 버그를 신고](https://github.com/toss/es-toolkit/issues/new/choose)해 주세요.
- [새로운 함수를 Discussions에 제안](https://github.com/toss/es-toolkit/discussions/new?category=ideas)해 주세요.
- [Issues 목록](https://github.com/toss/es-toolkit/issues)을 보고 수정할 것들을 확인해 보세요.

## 4. Pull Requests

> [Pull Requests 만들기](https://github.com/toss/es-toolkit/compare) <br/>

es-toolkit에서 수정할 점을 발견했다면 Pull Request를 올릴 수 있어요.

Pull Request의 제목은 다음 형식을 따라 주세요.

```
<타입>([함수 이름]): <설명>
```

> 모든 Pull Request는 스쿼시 머지돼요. 그래서 커밋의 숫자나 스타일은 자유롭게 해주세요. <br />
> 본인이 편한 스타일대로 커밋하시면 돼요.

### 4.1 어떤 기여를 받나요

머지된 코드는 라이브러리가 있는 동안 계속 관리해야 하고, 리뷰를 기다리는 Pull Request도 이미 많이 쌓여 있어요. 그래서 어떤 변경을 받을지 좁게 정해 두었어요. 작업을 다 끝낸 다음에 알게 되는 것보다 미리 알려드리는 게 낫다고 생각해요.

코드를 쓰기 전에, 하려는 변경에 해당하는 항목을 읽어 주세요.

#### 새로운 함수 추가하기

**먼저 [Discussions](https://github.com/toss/es-toolkit/discussions/new?category=ideas)에 제안하고, 받아들여질 때까지 기다려 주세요.** 제안 없이 함수를 추가하는 Pull Request는 구현이 좋더라도 닫아요.

새로운 함수를 반기지 않아서가 아니에요. 함수를 하나 추가하는 건 오래가는 약속이기 때문이에요. 네 개 언어로 문서를 써야 하고, 다른 라이브러리만큼은 빨라야 하고, 한번 쓰이기 시작하면 되돌릴 수 없어요. 그리고 그 함수가 아직 없는 데에는 이유가 있을 수도 있어요. 내장 기능으로 대체할 수 있거나, TC39 제안을 통해 JavaScript 자체에 들어오는 중일 수도 있어요([1.1 개발 범위](#11-개발-범위) 참고). Discussions에서 이런 점들을 먼저 정리하면, 구현에 저녁 시간을 쓰기 전에 방향을 맞출 수 있어요.

제안이 받아들여진 다음에는 구현, 테스트, 벤치마크, 그리고 네 개 언어 문서를 함께 올려 주세요.

`es-toolkit/compat`은 조금 달라요. 마이그레이션을 돕기 위해 Lodash를 그대로 따라가는 게 목적이고, Lodash가 제공하는 함수는 이미 다 갖췄어요. 그래서 새로운 함수는 아예 받지 않아요.

#### 성능 개선하기

**환영해요. 대신 벤치마크 결과를 꼭 첨부해 주세요.** `main`과 작업 브랜치에서 각각 벤치마크를 돌리고, 두 결과를 Pull Request에 붙여 주세요.

코드만 읽어서는 실제로 빨라진 건지, 빨라 보이기만 하는 건지 알 수 없기 때문이에요. 요즘 JavaScript 엔진은 예측하기 어려운 방식으로 최적화를 해서, 더 간결해 보이는 코드가 오히려 같거나 더 느리게 측정되는 일이 흔해요. 숫자 없이 빨라졌다고만 하면 확인할 방법이 없어서 닫게 돼요.

벤치마크는 [Vitest의 벤치마크 기능](https://vitest.dev/api/#bench)을 쓰고, [`benchmark` 디렉토리](https://github.com/toss/es-toolkit/tree/main/benchmarks)에 모여 있어요.

#### Lodash와 다른 동작 고치기

**환영해요.** `es-toolkit/compat`에 해당하는 이야기예요. compat은 Lodash와 똑같이 동작하는 게 존재 이유라서, 다른 값을 돌려주면 마이그레이션하는 프로젝트가 원인을 찾기 어려운 방식으로 깨져요.

차이를 말로 설명하지 말고 코드로 보여 주세요. 어떤 입력에 대해 Lodash는 무엇을 돌려주고, 지금 `es-toolkit/compat`은 무엇을 돌려주는지 적어 주세요. 그리고 변경 전에는 실패하고 변경 후에는 통과하는 테스트를 함께 추가해 주세요. 나중에 다시 어긋나지 않게 하기 위해서예요. 고치려는 함수가 자주 호출되는 코드라면 벤치마크 결과도 붙여 주세요. compat 수정은 많이 실행되는 코드에 분기를 더하는 경우가 많거든요.

#### 문서 고치기

**언제든 환영하고, 위의 조건은 하나도 필요하지 않아요.** 네 개 언어 문서만 서로 어긋나지 않게 맞춰 주시면 돼요. 문서 양식은 [5. 문서 작성 가이드](#5-문서-작성-가이드)를 참고해 주세요.

한 가지만 부탁드릴게요. 오타 하나, 빠진 설명 하나처럼 자잘한 수정이 여러 개 보인다면 각각 Pull Request를 열지 말고 하나로 모아서 올려 주세요. 한 줄짜리 Pull Request가 계속 올라오면 같은 수정을 한 번에 볼 때보다 리뷰 시간이 훨씬 많이 들고, 다른 기여자들의 작업도 뒤로 밀려요.

#### 리팩토링만 하는 변경

**받지 않아요.** 변수 이름을 바꾸거나, 함수를 잘게 나누거나, 이미 잘 동작하는 구현을 다시 쓰는 것처럼 동작이 전혀 바뀌지 않는 변경을 말해요.

왜 하고 싶은지는 알아요. 저희 코드도 늘 원하는 만큼 깔끔하지는 않아요. 하지만 리팩토링 Pull Request는 다른 변경과 똑같은 리뷰 시간을 쓰면서 사용자에게 돌아가는 건 없어요. 그리고 다시 쓴 코드가 엣지 케이스를 조용히 깨뜨리는 일이 생각보다 자주 있어요. 특히 `es-toolkit/compat`에서는 이상해 보이는 코드가 대개 Lodash의 이상한 동작을 맞추려고 그렇게 쓰여 있어요.

정리할 값어치가 있는 걸 발견했다면, 버그 수정이나 측정 가능한 성능 개선에 함께 담아 주세요. 그러면 그 정리를 리뷰할 이유도 같이 생겨요.

### 4.2 타입

**타입은 다음 중 하나를 선택해 주세요.**

배포된 코드를 변경한 경우:

- feat - 새로운 기능 추가
- fix - 새로운 기능을 추가하지 않는 수정사항

배포된 코드를 변경하지 않은 경우:

- docs - 문서만 변경한 경우
- test - 테스트만 변경한 경우

기타:

- chore - 그 외 모든 것

### 4.3 함수 이름

변경한 함수의 이름을 포함해 주세요. (예: debounce, throttle)
<br/>
여러 함수들을 동시에 수정했다면, 수정된 함수 이름을 꼭 모두 포함할 필요는 없어요.

### 4.4 설명

Pull Request이 무엇에 관한 것인지 명확하고 간결한 설명을 담아 주세요.

## 5. 문서 작성 가이드

모든 함수 문서는 4개 언어로 같이 관리해요. 항상 함께 업데이트해 주세요.

- `docs/reference/{category}/{fn}.md` (영어)
- `docs/ko/reference/{category}/{fn}.md` (한국어, ~해요체)
- `docs/ja/reference/{category}/{fn}.md` (일본어)
- `docs/zh_hans/reference/{category}/{fn}.md` (중국어 간체)

대표적인 예시는 [`sum`](../docs/ko/reference/math/sum.md), [`toCamelCaseKeys`](../docs/ko/reference/object/toCamelCaseKeys.md) 문서를 참고해 주세요.

### 5.1 템플릿

````markdown
# {함수 이름}

{한 문장 설명}

```typescript
{짧은 예시 코드}
```

## 사용법

### `{시그니처}`

{언제 쓰는지 → 어떻게 동작하는지 자연스러운 문장으로 풀어 써요. 필요하면 짧은 예시 코드 블록을 중간중간 넣어요.}

```typescript
import { {함수 이름} } from 'es-toolkit/{category}';

// 이 예시가 무엇을 보여주는지 짧게 적어요.
{예시 호출}
// Returns: {결과}
```

#### 파라미터

- `{이름}` (`{타입}`): {설명}.
- `{이름}` (`{타입}`, 선택): {설명}. 기본값은 `{기본값}`이에요.

#### 반환 값

(`{타입}`): {반환 값에 대한 설명}.
````

### 5.2 자리표시자 채우는 법

- **제목**: 함수 이름 그대로 써요. 추가 접미사는 붙이지 않아요. (예: `# sum`, `# toCamelCaseKeys`)
- **한 문장 설명**: 함수의 동작을 한 문장으로 적어요. 카멜 표기법처럼 익숙하지 않은 용어가 등장하면 짧은 보충 단락을 한 단락 추가해도 좋아요.
- **짧은 예시 코드**: 구체적인 값 대신 `arr`, `numbers`, `obj`처럼 의미가 드러나는 변수 이름을 써서 인터페이스를 한눈에 보여줘요.
- **`### \`시그니처\``**: 오버로드별로 적어요. 가능하면 하나로 합치고, 동작이 정말 다를 때만(예: 배열용과 객체용) 두 개로 쪼개요.
- **본문 설명**: "언제 쓰는지 → 어떻게 동작하는지" 흐름으로 자연스러운 문장으로 풀어 써요. "설명: ~"처럼 콜론을 쓰는 형식은 쓰지 말아요. 예시 블록은 `import { ... } from 'es-toolkit/{category}'`로 시작하고, 각 호출 위에 한 줄 주석을 덧붙여요.
- **파라미터**: ``- `이름` (`타입`): 설명.`` 형식으로 적어요. 선택 값이면 타입 뒤에 `선택`을 붙이고 기본값도 함께 써요.
- **반환 값**: 맨 앞에 괄호로 타입을 적고, 그 뒤에 반환 값 설명을 이어 써요.

### 5.3 글쓰기 가이드

- 쉬운 단어를 써요. (예: "균등한 배열" → "같은 길이의 배열")
- JavaScript에서 익숙한 단어를 써요. (예: "컬렉션" → "배열이나 객체")
- 영어 용어는 한국어로 풀어 써요. (예: "truthy" → "참으로 평가되는")
