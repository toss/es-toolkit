# curryRight (Lodash 호환성)

::: warning `es-toolkit`의 [`curryRight`](../../function/curryRight.md)나 수동 클로저를 사용하세요

이 `curryRight` 함수는 복잡한 placeholder 처리, arity 검증, 인수 합성 로직으로 인해 느리게 동작해요.

placeholder가 필요하지 않다면 대신 더 빠른 `es-toolkit`의 [`curryRight`](../../function/curryRight.md)나 간단한 클로저를 사용하세요.

:::

함수를 오른쪽부터 커링해서 마지막 인수부터 하나씩 받거나 여러 개씩 받을 수 있는 함수를 만들어요.

```typescript
const curriedFunction = curryRight(func, arity);
```

## 사용법

### `curryRight(func, arity)`

함수를 오른쪽부터 커링해서 마지막 인수부터 부분 적용하고 싶을 때 `curryRight`를 사용하세요. 일반적인 `curry`와 달리 마지막 인수부터 먼저 받아서 처리해요.

```typescript
import { curryRight } from 'es-toolkit/compat';

// 기본 사용법
function subtract(a, b, c) {
  return a - b - c;
}

const curriedSubtract = curryRight(subtract);

// 오른쪽부터(마지막 인수부터) 커링
console.log(curriedSubtract(1)(2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1, 2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1)(2, 5)); // 2 - 5 - 1 = -4
console.log(curriedSubtract(1, 2, 5)); // 1 - 2 - 5 = -6
```

`curry`와 `curryRight` 차이점:

```typescript
import { curry, curryRight } from 'es-toolkit/compat';

function divide(a, b, c) {
  return a / b / c;
}

// 일반 curry (왼쪽부터)
const leftCurried = curry(divide);
console.log(leftCurried(12)(3)(2)); // ((12 / 3) / 2) = 2

// curryRight (오른쪽부터)
const rightCurried = curryRight(divide);
console.log(rightCurried(2)(3)(12)); // ((12 / 3) / 2) = 2
// 마지막에 전달한 12가 첫 번째 인수(a)가 됨
```

메인 라이브러리와 비교:

```typescript
// compat 버전 (유연함, 하지만 느림)
import { curryRight } from 'es-toolkit/compat';
const curriedCompat = curryRight(subtract);
curriedCompat(1, 2)(3); // 지원됨
curriedCompat(1)(curryRight.placeholder, 3)(2); // placeholder 지원

// 메인 라이브러리 버전 (더 빠름, 하지만 한 번에 하나씩만)
import { curryRight } from 'es-toolkit';
const curriedMain = curryRight(subtract);
curriedMain(1)(2)(3); // 지원됨
curriedMain(1, 2)(3); // 지원되지 않음
```

placeholder 기능 사용:

```typescript
import { curryRight } from 'es-toolkit/compat';

function formatMessage(name, action, time) {
  return `${name}님이 ${action}을 ${time}에 했습니다`;
}

const curriedFormat = curryRight(formatMessage);

// placeholder로 특정 위치 건너뛰기
const todayAction = curriedFormat('오늘');
const todayLoginAction = todayAction(curryRight.placeholder, '로그인');

console.log(todayLoginAction('김철수'));
// "김철수님이 로그인을 오늘에 했습니다"

// 시간을 먼저 고정
const morningFormat = curriedFormat('아침 9시');
console.log(morningFormat('댓글 작성', '이영희'));
// "이영희님이 댓글 작성을 아침 9시에 했습니다"
```

배열 처리에서 활용:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 배열에서 특정 개수만큼 뒤에서 자르기
function takeFromEnd(array, count, separator = ', ') {
  return array.slice(-count).join(separator);
}

const curriedTake = curryRight(takeFromEnd);

// 쉼표로 구분하는 함수 생성
const takeWithComma = curriedTake(', ');

// 마지막 3개 가져오기
const takeLast3 = takeWithComma(3);

const fruits = ['사과', '바나나', '오렌지', '포도', '키위'];
console.log(takeLast3(fruits)); // "오렌지, 포도, 키위"

// 다른 구분자 사용
const takeWithDash = curriedTake(' - ');
console.log(takeWithDash(2, fruits)); // "포도 - 키위"
```

함수 합성에서 활용:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 로그 출력 함수
function logWithPrefix(message, level, timestamp) {
  return `[${timestamp}] ${level}: ${message}`;
}

const curriedLog = curryRight(logWithPrefix);

// 현재 시간으로 고정
const currentTimeLog = curriedLog(new Date().toISOString());

// 레벨별 로거 생성
const errorLog = currentTimeLog('ERROR');
const infoLog = currentTimeLog('INFO');
const debugLog = currentTimeLog('DEBUG');

// 사용
console.log(errorLog('데이터베이스 연결 실패'));
console.log(infoLog('서버 시작됨'));
console.log(debugLog('사용자 요청 처리 중'));
```

함수형 프로그래밍 파이프라인:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 데이터 변환 함수들
const mapWith = curryRight((array, fn) => array.map(fn));
const filterWith = curryRight((array, predicate) => array.filter(predicate));
const reduceWith = curryRight((array, reducer, initial) => array.reduce(reducer, initial));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 변환 함수들 정의
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (acc, val) => acc + val;

// 파이프라인 구성 (오른쪽 먼저)
const processNumbers = nums => {
  return reduceWith(filterWith(mapWith(nums, double), isEven), sum, 0);
};

console.log(processNumbers(numbers)); // 모든 수를 2배 후 짝수만 필터링해서 합계
```

API 요청 빌더:

```typescript
import { curryRight } from 'es-toolkit/compat';

function makeRequest(url, method, headers, body) {
  return fetch(url, { method, headers, body });
}

const curriedRequest = curryRight(makeRequest);

// body부터 설정
const withJsonBody = curriedRequest(JSON.stringify({ data: 'test' }));

// headers 추가
const withHeaders = withJsonBody({
  'Content-Type': 'application/json',
  Authorization: 'Bearer token123',
});

// POST 메서드 설정
const postRequest = withHeaders('POST');

// 최종 사용
postRequest('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

수동 커링 대안:

```typescript
// curryRight 사용
const curriedSubtract = curryRight((a, b, c) => a - b - c);

// 수동 클로저 (더 빠름, 오른쪽부터)
const manualCurryRight = c => b => a => a - b - c;

// 둘 다 같은 결과
console.log(curriedSubtract(1)(2)(5)); // 2
console.log(manualCurryRight(1)(2)(5)); // 2
```

Arity 지정:

```typescript
import { curryRight } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return { a, b, c, rest };
}

// arity를 3으로 제한 (뒤의 rest는 무시)
const curriedFixed = curryRight(variableArgsFunction, 3);

// 오른쪽부터 c, b, a 순서로 받음
console.log(curriedFixed(3)(2)(1)); // { a: 1, b: 2, c: 3, rest: [] }
```

#### 파라미터

- `func` (`Function`): 오른쪽부터 커링할 함수예요.
- `arity` (`number`, 선택): 함수의 arity(인수 개수)예요. 생략하면 `func.length`를 사용해요.

#### 반환 값

(`Function & { placeholder: symbol }`): 오른쪽부터 커링된 함수를 반환해요. `placeholder` 속성으로 인수 위치를 제어할 수 있어요.
