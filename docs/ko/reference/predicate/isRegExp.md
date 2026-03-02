# isRegExp

주어진 값이 `RegExp` 인스턴스인지 확인해요.

```typescript
const result = isRegExp(value);
```

## 사용법

### `isRegExp(value)`

값이 `RegExp` 인스턴스인지 확인하고 싶을 때 `isRegExp`를 사용하세요. 정규식 객체를 일반 문자열이나 다른 객체와 구분할 때 유용해요.

```typescript
import { isRegExp } from 'es-toolkit/predicate';

// RegExp 인스턴스들
const regex1 = /abc/;
const regex2 = new RegExp('abc');
const regex3 = new RegExp('\\d+', 'g');

console.log(isRegExp(regex1)); // true
console.log(isRegExp(regex2)); // true
console.log(isRegExp(regex3)); // true

// RegExp가 아닌 값들
console.log(isRegExp('/abc/')); // false (문자열)
console.log(isRegExp('abc')); // false
console.log(isRegExp({})); // false
console.log(isRegExp(null)); // false
console.log(isRegExp(undefined)); // false
```

정규식 패턴 검증이나 문자열 처리에 유용해요:

```typescript
// 동적 패턴 검증
function validatePattern(pattern: unknown, text: string) {
  if (isRegExp(pattern)) {
    // TypeScript가 pattern을 RegExp로 추론
    return pattern.test(text);
  }

  // 문자열 패턴은 정규식으로 변환
  if (typeof pattern === 'string') {
    const regex = new RegExp(pattern);
    return regex.test(text);
  }

  return false;
}

// 사용 예시
console.log(validatePattern(/hello/, 'hello world')); // true
console.log(validatePattern('\\d+', '123')); // true
console.log(validatePattern('invalid', 'text')); // false

// 폼 검증에서 활용
function createValidator(rule: unknown) {
  if (isRegExp(rule)) {
    return (value: string) => rule.test(value);
  }

  // 다른 타입의 규칙들...
  return () => false;
}

// 이메일 검증기 생성
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator = createValidator(emailRegex);

console.log(emailValidator('test@example.com')); // true
console.log(emailValidator('invalid-email')); // false
```

조건부 문자열 처리에서 사용:

```typescript
// 텍스트 처리 유틸리티
function processText(input: string, processor: unknown) {
  if (isRegExp(processor)) {
    // 정규식으로 매칭되는 부분 추출
    const matches = input.match(processor);
    return matches ? matches : [];
  }

  // 다른 처리기 타입들...
  return [input];
}

// 숫자 추출
const numberRegex = /\d+/g;
const numbers = processText('가격: 1000원, 할인: 200원', numberRegex);
console.log(numbers); // ['1000', '200']

// URL 추출
const urlRegex = /https?:\/\/[^\s]+/g;
const urls = processText('사이트: https://example.com 참고', urlRegex);
console.log(urls); // ['https://example.com']

// 설정 기반 텍스트 검증
class TextValidator {
  private rules: Array<{ name: string; rule: unknown }> = [];

  addRule(name: string, rule: unknown) {
    this.rules.push({ name, rule });
  }

  validate(text: string) {
    const results: Array<{ rule: string; passed: boolean }> = [];

    for (const { name, rule } of this.rules) {
      if (isRegExp(rule)) {
        results.push({
          rule: name,
          passed: rule.test(text),
        });
      } else {
        results.push({
          rule: name,
          passed: false,
        });
      }
    }

    return results;
  }
}

// 사용 예시
const validator = new TextValidator();
validator.addRule('영문자만', /^[a-zA-Z]+$/);
validator.addRule('숫자 포함', /\d/);
validator.addRule('특수문자 금지', /^[^!@#$%^&*()]+$/);

console.log(validator.validate('Hello123'));
// [
//   { rule: '영문자만', passed: false },
//   { rule: '숫자 포함', passed: true },
//   { rule: '특수문자 금지', passed: true }
// ]
```

문자열과 정규식 구분하기:

```typescript
// 검색 기능에서 활용
function searchText(content: string, query: unknown) {
  if (isRegExp(query)) {
    // 정규식 검색 - 고급 패턴 매칭
    const matches = content.match(query);
    return matches ? matches.length : 0;
  }

  if (typeof query === 'string') {
    // 일반 문자열 검색
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    return matches ? matches.length : 0;
  }

  return 0;
}

// 사용 예시
const text = 'Hello world! Hello everyone!';

console.log(searchText(text, /hello/gi)); // 2 (정규식)
console.log(searchText(text, 'Hello')); // 2 (문자열, 이스케이프됨)
console.log(searchText(text, /h.llo/i)); // 2 (패턴 매칭)

// 동적 필터링
function createFilter(patterns: unknown[]) {
  const regexPatterns = patterns.filter(isRegExp);

  return (text: string) => {
    return regexPatterns.some(pattern => pattern.test(text));
  };
}

// 스팸 필터 예시
const spamPatterns = [
  /\b(광고|홍보)\b/,
  /\d{3}-\d{4}-\d{4}/, // 전화번호 패턴
  'invalid', // RegExp가 아님, 필터에서 제외
  /\$\d+/, // 가격 패턴
];

const spamFilter = createFilter(spamPatterns);
console.log(spamFilter('긴급 광고입니다!')); // true
console.log(spamFilter('안녕하세요')); // false
```

정규식 플래그와 속성 활용:

```typescript
// RegExp 속성 확인
function analyzeRegex(value: unknown) {
  if (isRegExp(value)) {
    return {
      source: value.source,
      flags: value.flags,
      global: value.global,
      ignoreCase: value.ignoreCase,
      multiline: value.multiline,
      unicode: value.unicode,
      sticky: value.sticky,
    };
  }

  return null;
}

// 사용 예시
const regex = /hello/gim;
const analysis = analyzeRegex(regex);
console.log(analysis);
// {
//   source: 'hello',
//   flags: 'gim',
//   global: true,
//   ignoreCase: true,
//   multiline: true,
//   unicode: false,
//   sticky: false
// }

// 정규식 복제
function cloneRegex(value: unknown) {
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags);
  }

  return null;
}

const originalRegex = /test/gi;
const clonedRegex = cloneRegex(originalRegex);
console.log(clonedRegex?.test('TEST')); // true
```

#### 파라미터

- `value` (`unknown`): RegExp 인스턴스인지 확인할 값이에요.

#### 반환 값

(`value is RegExp`): 값이 RegExp 인스턴스이면 `true`, 그렇지 않으면 `false`를 반환해요.
