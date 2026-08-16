# rest

특정 인덱스부터의 파라미터들을 배열로 묶어서 함수에 전달하는 새로운 함수를 만들어요.

```typescript
const restFunc = rest(func, startIndex);
```

## 사용법

### `rest(func, startIndex?)`

함수의 나머지 파라미터들을 배열로 묶어서 전달하고 싶을 때 `rest`를 사용하세요. 특정 인덱스 이전의 파라미터들은 개별로 전달되고, 이후의 파라미터들은 배열로 묶여서 전달돼요.

가변 파라미터를 받는 함수를 만들거나, 기존 함수의 파라미터 처리 방식을 변경할 때 유용해요.

```typescript
import { rest } from 'es-toolkit/function';

// 기본 사용법 (마지막 파라미터부터 배열로 묶기)
function sum(a: number, b: number, numbers: number[]) {
  return a + b + numbers.reduce((sum, n) => sum + n, 0);
}

const restSum = rest(sum); // startIndex는 기본적으로 func.length - 1 (2)
console.log(restSum(1, 2, 3, 4, 5)); // 1 + 2 + (3 + 4 + 5) = 15
// sum 함수는 [1, 2, [3, 4, 5]]로 호출됨

// 다른 인덱스부터 배열로 묶기
function logMessage(level: string, messages: string[]) {
  console.log(`[${level}] ${messages.join(' ')}`);
}

const restLog = rest(logMessage, 1); // 1번째 인덱스부터 배열로 묶기
restLog('INFO', 'Application', 'started', 'successfully');
// logMessage('INFO', ['Application', 'started', 'successfully']) 형태로 호출

// 실용적인 예시: 첫 번째 파라미터는 개별로, 나머지는 배열로
function format(template: string, values: any[]) {
  return values.reduce((result, value, index) => {
    return result.replace(`{${index}}`, value);
  }, template);
}

const restFormat = rest(format, 1);
console.log(restFormat('Hello {0}, welcome to {1}!', 'John', 'our site'));
// 'Hello John, welcome to our site!'
```

파라미터가 부족한 경우의 처리도 자동으로 해줘요.

```typescript
import { rest } from 'es-toolkit/function';

function greet(greeting: string, name: string, extras: string[]) {
  const extraText = extras.length > 0 ? ` ${extras.join(' ')}` : '';
  return `${greeting} ${name}!${extraText}`;
}

const restGreet = rest(greet);

console.log(restGreet('Hello', 'Alice', 'Have a great day!'));
// 'Hello Alice! Have a great day!'

console.log(restGreet('Hi', 'Bob'));
// 'Hi Bob!' (extras는 빈 배열이 됨)

console.log(restGreet('Hey'));
// 'Hey undefined!' (name은 undefined, extras는 빈 배열)
```

#### 파라미터

- `func` (`F`): 파라미터 처리 방식을 변경할 함수예요.
- `startIndex` (`number`, 선택): 배열로 묶기 시작할 인덱스예요. 기본값은 `func.length - 1`으로, 마지막 파라미터부터 배열로 묶어요.

#### 반환 값

(`(...args: any[]) => ReturnType<F>`): 특정 인덱스부터의 파라미터들을 배열로 묶어서 원래 함수에 전달하는 새로운 함수를 반환해요.
