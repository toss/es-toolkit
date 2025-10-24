# flow

여러 함수를 순서대로 실행하는 새로운 함수를 만들어요.

```typescript
const combinedFunc = flow(func1, func2, func3);
```

## 레퍼런스

### `flow(...funcs)`

함수들을 연결해서 파이프라인을 만들고 싶을 때 `flow`를 사용하세요. 이전 함수의 결과가 다음 함수의 입력이 돼요. 데이터를 여러 단계로 변환할 때 유용해요.

```typescript
import { flow } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flow(add, square, double);

// 먼저 add(1, 2) = 3
// 그 다음 square(3) = 9
// 마지막으로 double(9) = 18
combined(1, 2);
// Returns: 18
```

데이터 변환 파이프라인을 만들 때 특히 유용해요.

```typescript
const processData = flow(
  (text: string) => text.trim(),
  (text: string) => text.toLowerCase(),
  (text: string) => text.split(' '),
  (words: string[]) => words.filter(word => word.length > 3)
);

processData('  Hello World JavaScript  ');
// Returns: ['hello', 'world', 'javascript']
```

#### 파라미터

- `funcs` (`Array<(...args: any[]) => any>`): 순서대로 실행할 함수들이에요.

#### 반환 값

(`(...args: any[]) => any`): 주어진 함수들을 순서대로 실행하는 새로운 함수예요. 첫 번째 함수는 여러 인자를 받을 수 있고, 나머지 함수들은 이전 함수의 결과를 받아요.
