# delay (Lodash 호환성)

::: warning `setTimeout`을 사용하세요

이 `delay` 함수는 `setTimeout`의 단순한 래퍼이지만 추가적인 타입 검증과 숫자 변환으로 인해 약간의 오버헤드가 있어요.

대신 더 빠르고 표준인 `setTimeout`을 직접 사용하세요.

:::

지정된 시간 후에 함수를 실행하는 타이머를 설정해요.

```typescript
const timerId = delay(func, wait, ...args);
```

## 레퍼런스

### `delay(func, wait, ...args)`

함수 실행을 특정 시간만큼 지연시키고 싶을 때 `delay`를 사용하세요. 애니메이션 타이밍, 사용자 피드백 지연, 비동기 작업 스케줄링에서 유용해요.

```typescript
import { delay } from 'es-toolkit/compat';

// 기본 사용법
const timerId = delay(() => {
  console.log('1초 후 실행됨');
}, 1000);

// 인수와 함께 사용
delay(
  (name, age) => {
    console.log(`안녕하세요, ${age}세 ${name}님!`);
  },
  2000,
  '김철수',
  30
);
// 2초 후: "안녕하세요, 30세 김철수님!" 출력
```

`setTimeout`과 비교:

```typescript
// delay 사용
import { delay } from 'es-toolkit/compat';

const timerId1 = delay(myFunction, 1000, 'arg1', 'arg2');

// setTimeout 사용 (더 빠름, 표준)
const timerId2 = setTimeout(myFunction, 1000, 'arg1', 'arg2');

// 또는 화살표 함수로
const timerId3 = setTimeout(() => myFunction('arg1', 'arg2'), 1000);
```

애니메이션 시퀀스:

```typescript
import { delay } from 'es-toolkit/compat';

class AnimationSequence {
  constructor(element) {
    this.element = element;
  }

  fadeInSequence() {
    // 즉시 시작
    this.element.style.opacity = '0';
    this.element.style.display = 'block';

    // 100ms 후 페이드인 시작
    delay(() => {
      this.element.style.transition = 'opacity 500ms ease-in';
      this.element.style.opacity = '1';
    }, 100);

    // 1초 후 스케일 애니메이션
    delay(() => {
      this.element.style.transform = 'scale(1.1)';
    }, 1000);

    // 1.5초 후 원래 크기로
    delay(() => {
      this.element.style.transform = 'scale(1)';
    }, 1500);
  }
}
```

타이머 취소:

```typescript
import { delay } from 'es-toolkit/compat';

class TimerManager {
  constructor() {
    this.timers = new Map();
  }

  setDelayedTask(id, task, delayMs) {
    // 기존 타이머가 있으면 취소
    this.cancelTask(id);

    const timerId = delay(task, delayMs);
    this.timers.set(id, timerId);

    return timerId;
  }

  cancelTask(id) {
    const timerId = this.timers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(id);
      return true;
    }
    return false;
  }

  cancelAllTasks() {
    this.timers.forEach(timerId => clearTimeout(timerId));
    this.timers.clear();
  }
}

const timerManager = new TimerManager();

// 작업 스케줄링
timerManager.setDelayedTask(
  'save',
  () => {
    console.log('자동 저장됨');
  },
  5000
);

timerManager.setDelayedTask(
  'cleanup',
  () => {
    console.log('정리 작업 완료');
  },
  10000
);

// 필요시 특정 작업 취소
// timerManager.cancelTask('save');

// 페이지 종료시 모든 타이머 정리
window.addEventListener('beforeunload', () => {
  timerManager.cancelAllTasks();
});
```

#### 파라미터

- `func` (`Function`): 지연 후 실행할 함수예요.
- `wait` (`number`): 지연할 밀리초 수예요.
- `args` (`...any[]`): 함수 실행 시 전달할 인수들이에요.

### 반환 값

(`number`): 타이머 ID를 반환해요. `clearTimeout()`으로 취소할 수 있어요.
