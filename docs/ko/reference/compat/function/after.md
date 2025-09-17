# after (Lodash 호환성)

::: warning 클로저를 사용하세요

이 `after` 함수는 복잡한 타입 검증과 정수 변환 처리로 인해 느리게 동작해요.

대신 더 간단하고 명확한 클로저를 사용하세요.

:::

함수가 지정된 횟수 이후에만 실행되도록 제한하는 함수를 만들어요.

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

여러 비동기 작업 완료 후 콜백 실행:

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

클로저를 사용한 대안:

```typescript
// after 사용
const afterThree = after(3, () => console.log('실행!'));

// 클로저 사용 (더 간단하고 빠름)
function createAfter(count, callback) {
  let callCount = 0;
  return function(...args) {
    callCount++;
    if (callCount >= count) {
      return callback.apply(this, args);
    }
  };
}

const afterThreeAlternative = createAfter(3, () => console.log('실행!'));
```

파라미터와 반환값도 전달돼요:

```typescript
import { after } from 'es-toolkit/compat';

const processAfterTwo = after(2, (data) => {
  console.log('데이터 처리:', data);
  return data * 2;
});

console.log(processAfterTwo(5)); // undefined (실행되지 않음)
console.log(processAfterTwo(5)); // "데이터 처리: 5", 반환값: 10
console.log(processAfterTwo(3)); // "데이터 처리: 3", 반환값: 6
```

초기화 후 활성화하기:

```typescript
import { after } from 'es-toolkit/compat';

class DataLoader {
  constructor() {
    this.isReady = false;
    this.data = null;
    
    // 2가지 초기화 작업 후 활성화
    this.activate = after(2, () => {
      this.isReady = true;
      console.log('DataLoader가 준비되었습니다!');
    });
  }
  
  loadConfig() {
    // 설정 로드
    console.log('설정 로드 완료');
    this.activate();
  }
  
  loadData() {
    // 데이터 로드
    console.log('데이터 로드 완료');
    this.activate();
  }
}

const loader = new DataLoader();
loader.loadConfig(); // "설정 로드 완료"
loader.loadData(); // "데이터 로드 완료", "DataLoader가 준비되었습니다!"
```

0 또는 음수를 전달하면 즉시 실행돼요:

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
