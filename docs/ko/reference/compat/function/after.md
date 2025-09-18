# after (Lodash 호환성)

::: warning `es-toolkit`의 [`after`](../../function/after.md)를 사용하세요

이 `after` 함수는 복잡한 타입 검증과 정수 변환 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [after](../../function/after.md)를 사용하세요.

:::

함수가 지정된 호출 횟수 이후에만 실행되도록 하는 함수를 만들어요.

```typescript
const restrictedFunction = after(n, func);
```

## 레퍼런스

### `after(n, func)`

함수가 특정 횟수만큼 호출된 후에야 실행되도록 제한하고 싶을 때 `after`를 사용하세요. 여러 비동기 작업이 완료된 후 콜백을 실행하거나, 초기화 단계를 거친 후 함수를 활성화할 때 유용해요.

```typescript
import { after } from 'es-toolkit/compat';

// 기본 사용법
const logAfterThree = after(3, () => {
  console.log('3번째 호출부터 실행돼요!');
});

logAfterThree(); // 실행되지 않음
logAfterThree(); // 실행되지 않음
logAfterThree(); // "3번째 호출부터 실행돼요!" 출력
logAfterThree(); // "3번째 호출부터 실행돼요!" 출력 (계속 실행됨)
```

여러 비동기 작업이 모두 완료된 후에 특정 콜백을 실행할 때도 사용할 수 있어요.

```typescript
import { after } from 'es-toolkit/compat';

const tasks = ['task1', 'task2', 'task3'];
const allTasksComplete = after(tasks.length, () => {
  console.log('모든 작업이 완료되었습니다!');
});

// 각 작업이 완료될 때마다 호출
tasks.forEach(task => {
  performAsyncTask(task, () => {
    console.log(`${task} 완료`);
    allTasksComplete(); // 3번째 호출에서 "모든 작업이 완료되었습니다!" 출력
  });
});
```

0이나 음수를 전달하면 첫 번째 호출부터 바로 실행돼요.

```typescript
import { after } from 'es-toolkit/compat';

const immediate = after(0, () => console.log('즉시 실행'));
immediate(); // "즉시 실행"

const negative = after(-1, () => console.log('즉시 실행'));
negative(); // "즉시 실행"
```

#### 파라미터

- `n` (`number`): 함수가 실행되기 전에 필요한 호출 횟수예요.
- `func` (`TFunc`): 제한할 함수예요.

### 반환 값

(`TFunc`): n번째 호출부터 원본 함수를 실행하는 새로운 제한된 함수를 반환해요.
