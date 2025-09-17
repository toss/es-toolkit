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
delay((name, age) => {
  console.log(`안녕하세요, ${age}세 ${name}님!`);
}, 2000, '김철수', 30);
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

메시지 시스템 예제:

```typescript
import { delay } from 'es-toolkit/compat';

class NotificationSystem {
  showMessage(message, type = 'info', duration = 3000) {
    const notification = this.createNotification(message, type);
    document.body.appendChild(notification);
    
    // 지정된 시간 후 알림 제거
    const timerId = delay(() => {
      this.removeNotification(notification);
    }, duration);
    
    // 사용자가 클릭하면 즉시 제거
    notification.onclick = () => {
      clearTimeout(timerId);
      this.removeNotification(notification);
    };
  }
  
  createNotification(message, type) {
    const div = document.createElement('div');
    div.className = `notification notification-${type}`;
    div.textContent = message;
    return div;
  }
  
  removeNotification(notification) {
    notification.remove();
  }
}

const notifications = new NotificationSystem();
notifications.showMessage('저장되었습니다', 'success', 2000);
notifications.showMessage('오류가 발생했습니다', 'error', 5000);
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

게임 로직에서 활용:

```typescript
import { delay } from 'es-toolkit/compat';

class GameEngine {
  constructor() {
    this.score = 0;
    this.combo = 0;
  }
  
  playerAction(action) {
    console.log(`플레이어 액션: ${action}`);
    this.score += 10;
    this.combo++;
    
    // 콤보 리셋 타이머 (3초 후)
    this.scheduleComboReset();
    
    // 점수 표시 애니메이션 지연
    delay(() => {
      this.showScoreEffect();
    }, 100);
  }
  
  scheduleComboReset() {
    // 이전 타이머 취소
    if (this.comboResetTimer) {
      clearTimeout(this.comboResetTimer);
    }
    
    // 새 타이머 설정
    this.comboResetTimer = delay(() => {
      this.combo = 0;
      console.log('콤보 리셋');
    }, 3000);
  }
  
  showScoreEffect() {
    console.log(`점수: ${this.score} (x${this.combo} 콤보)`);
  }
}
```

API 재시도 로직:

```typescript
import { delay } from 'es-toolkit/compat';

class ApiClient {
  async fetchWithRetry(url, maxRetries = 3, retryDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return await response.json();
        }
        throw new Error(`HTTP ${response.status}`);
      } catch (error) {
        console.log(`시도 ${attempt} 실패:`, error.message);
        
        if (attempt === maxRetries) {
          throw new Error(`${maxRetries}번 시도 후 실패: ${error.message}`);
        }
        
        // 다음 시도까지 지연 (Promise 기반으로 변환)
        await new Promise(resolve => {
          delay(resolve, retryDelay * attempt); // 지수 백오프
        });
      }
    }
  }
}

const client = new ApiClient();
client.fetchWithRetry('/api/data')
  .then(data => console.log('데이터:', data))
  .catch(error => console.error('최종 실패:', error));
```

배치 작업 스케줄링:

```typescript
import { delay } from 'es-toolkit/compat';

class BatchProcessor {
  constructor() {
    this.queue = [];
    this.processing = false;
  }
  
  add(task) {
    this.queue.push(task);
    
    if (!this.processing) {
      this.startProcessing();
    }
  }
  
  startProcessing() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    
    this.processing = true;
    const task = this.queue.shift();
    
    console.log('작업 처리 중:', task.name);
    task.execute();
    
    // 100ms 후 다음 작업 처리
    delay(() => {
      this.startProcessing();
    }, 100);
  }
}

const processor = new BatchProcessor();
processor.add({ name: 'Task 1', execute: () => console.log('작업 1 완료') });
processor.add({ name: 'Task 2', execute: () => console.log('작업 2 완료') });
processor.add({ name: 'Task 3', execute: () => console.log('작업 3 완료') });
```

사용자 피드백 시스템:

```typescript
import { delay } from 'es-toolkit/compat';

class FeedbackSystem {
  showLoadingState(element, message = '로딩 중...') {
    const originalText = element.textContent;
    const originalDisabled = element.disabled;
    
    element.textContent = message;
    element.disabled = true;
    
    // 최소 500ms는 로딩 상태 유지 (사용자 경험)
    return new Promise(resolve => {
      delay(() => {
        element.textContent = originalText;
        element.disabled = originalDisabled;
        resolve();
      }, 500);
    });
  }
  
  showSuccessMessage(element, successMessage, duration = 2000) {
    const originalText = element.textContent;
    const originalClass = element.className;
    
    element.textContent = successMessage;
    element.className += ' success';
    
    delay(() => {
      element.textContent = originalText;
      element.className = originalClass;
    }, duration);
  }
}

const feedback = new FeedbackSystem();

document.getElementById('save-btn').onclick = async () => {
  const btn = document.getElementById('save-btn');
  
  const loadingPromise = feedback.showLoadingState(btn, '저장 중...');
  
  try {
    await saveData(); // 실제 저장 작업
    await loadingPromise; // 최소 로딩 시간 보장
    
    feedback.showSuccessMessage(btn, '저장 완료!');
  } catch (error) {
    await loadingPromise;
    feedback.showSuccessMessage(btn, '저장 실패', 3000);
  }
};
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
timerManager.setDelayedTask('save', () => {
  console.log('자동 저장됨');
}, 5000);

timerManager.setDelayedTask('cleanup', () => {
  console.log('정리 작업 완료');
}, 10000);

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
