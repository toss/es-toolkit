# bind (Lodash 호환성)

::: warning `Function.prototype.bind()`를 사용하세요

이 `bind` 함수는 복잡한 placeholder 처리, 생성자 함수 검사, 인수 병합 로직으로 인해 느리게 동작해요. placeholder가 필요하지 않다면 네이티브 `Function.prototype.bind()`가 더 빠르고 간단해요.

대신 더 빠르고 표준인 `Function.prototype.bind()`를 사용하세요.

:::

함수의 `this` 컨텍스트를 고정하고 일부 인수를 미리 제공하는 함수를 만들어요.

```typescript
const boundFunction = bind(func, thisObj, ...partialArgs);
```

## 사용법

### `bind(func, thisObj, ...partialArgs)`

함수의 `this` 컨텍스트를 고정하거나 일부 인수를 미리 제공하고 싶을 때 `bind`를 사용하세요. 특히 placeholder를 사용해서 특정 위치의 인수를 나중에 제공하고 싶을 때 유용해요.

```typescript
import { bind } from 'es-toolkit/compat';

// 기본 사용법
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: '김철수' };
const boundGreet = bind(greet, object, '안녕하세요');

console.log(boundGreet('!')); // "안녕하세요 김철수!"
console.log(boundGreet('~')); // "안녕하세요 김철수~"
```

네이티브 bind와 비교:

```typescript
// bind 사용
import { bind } from 'es-toolkit/compat';

const boundFn1 = bind(func, thisObj, 'arg1');

// 네이티브 bind 사용 (더 빠름)
const boundFn2 = func.bind(thisObj, 'arg1');

// 결과는 동일하지만 네이티브가 더 빠름
```

placeholder 기능 사용:

```typescript
import { bind } from 'es-toolkit/compat';

function calculate(operation, a, b, suffix) {
  return `${a} ${operation} ${b} = ${operation === '+' ? a + b : a - b}${suffix}`;
}

// placeholder로 특정 위치의 인수를 나중에 제공
const calcWithSuffix = bind(
  calculate,
  null,
  bind.placeholder, // operation은 나중에 제공
  bind.placeholder, // a는 나중에 제공
  bind.placeholder, // b는 나중에 제공
  '점' // suffix는 미리 제공
);

console.log(calcWithSuffix('+', 5, 3)); // "5 + 3 = 8점"
console.log(calcWithSuffix('-', 10, 4)); // "10 - 4 = 6점"
```

더 실용적인 placeholder 예제:

```typescript
import { bind } from 'es-toolkit/compat';

function apiRequest(method, url, options, callback) {
  // API 요청 로직
  console.log(`${method} ${url}`, options);
  callback(`${method} 요청 완료`);
}

// POST 요청을 위한 부분 적용 함수 생성
const postRequest = bind(
  apiRequest,
  null,
  'POST', // method 고정
  bind.placeholder, // url은 나중에 제공
  { 'Content-Type': 'application/json' }, // options 고정
  bind.placeholder // callback은 나중에 제공
);

postRequest('/api/users', result => {
  console.log(result); // "POST 요청 완료"
});

postRequest('/api/products', result => {
  console.log(result); // "POST 요청 완료"
});
```

메서드 바인딩:

```typescript
import { bind } from 'es-toolkit/compat';

class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(level, message) {
    console.log(`[${this.prefix}] ${level}: ${message}`);
  }
}

const logger = new Logger('MyApp');

// 메서드를 다른 컨텍스트에서 사용하기 위해 바인딩
const logError = bind(logger.log, logger, 'ERROR');
const logInfo = bind(logger.log, logger, 'INFO');

// 이제 독립적으로 사용 가능
setTimeout(() => logError('서버 연결 실패'), 1000);
setTimeout(() => logInfo('애플리케이션 시작됨'), 2000);
```

이벤트 핸들러에서 활용:

```typescript
import { bind } from 'es-toolkit/compat';

class ButtonHandler {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  handleClick(event, customData) {
    this.clickCount++;
    console.log(`${this.name} 버튼 클릭 #${this.clickCount}`);
    console.log('커스텀 데이터:', customData);
    console.log('이벤트 타입:', event.type);
  }
}

const handler = new ButtonHandler('메뉴');

// 커스텀 데이터는 미리 제공하고, 이벤트는 나중에 전달
const boundHandler = bind(
  handler.handleClick,
  handler,
  bind.placeholder, // event는 나중에
  '메뉴 선택됨' // customData는 미리 제공
);

// DOM 이벤트에 연결 (event가 자동으로 첫 번째 인수로 전달됨)
document.getElementById('menu-btn')?.addEventListener('click', boundHandler);
```

생성자 함수도 지원:

```typescript
import { bind } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city || '서울';
}

// 서울 거주자를 만드는 생성자
const SeoulPerson = bind(Person, null, bind.placeholder, bind.placeholder, '서울');

const person1 = new SeoulPerson('김철수', 30);
const person2 = new SeoulPerson('이영희', 25);

console.log(person1); // Person { name: '김철수', age: 30, city: '서울' }
console.log(person2); // Person { name: '이영희', age: 25, city: '서울' }
```

함수형 프로그래밍에서 활용:

```typescript
import { bind } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// parseInt의 기수를 10으로 고정
const parseDecimal = bind(parseInt, null, bind.placeholder, 10);

// map에서 안전하게 사용
const parsed = ['1', '2', '3'].map(parseDecimal);
console.log(parsed); // [1, 2, 3]

// 일반 parseInt 사용 시 문제
const problematic = ['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
```

#### 파라미터

- `func` (`Function`): 바인딩할 함수예요.
- `thisObj` (`any`, 선택): 함수에 바인딩할 `this` 값이에요.
- `partialArgs` (`...any[]`): 미리 제공할 인수들이에요. `bind.placeholder`를 사용해서 나중에 제공할 위치를 지정할 수 있어요.

#### 반환 값

(`Function`): `this`가 고정되고 일부 인수가 미리 적용된 새로운 함수를 반환해요.
