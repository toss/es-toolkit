# debounce (Lodash 호환성)

::: warning `es-toolkit`의 [`debounce`](../../function/debounce.md)를 사용하세요

이 `debounce` 함수는 복잡한 `maxWait` 처리와 Lodash 호환 옵션 구조로 인해 오버헤드가 있어요.

대신 더 빠르고 현대적인 `es-toolkit`의 [`debounce`](../../function/debounce.md)를 사용하세요.

:::

함수 호출을 지연시키고, 마지막 호출 후 지정된 시간이 경과한 후에만 실행되도록 하는 디바운스 함수를 만들어요.

```typescript
const debouncedFunction = debounce(func, wait, options);
```

## 레퍼런스

### `debounce(func, wait, options)`

함수 호출을 지연시키고 싶을 때 `debounce`를 사용하세요. 검색 입력, 스크롤 이벤트, 버튼 클릭 등에서 과도한 호출을 방지할 때 유용해요.

```typescript
import { debounce } from 'es-toolkit/compat';

// 기본 사용법
const searchFunction = debounce(query => {
  console.log('검색:', query);
}, 300);

// 300ms 내에 다시 호출되지 않으면 실행
searchFunction('리액트'); // 실행 안됨
searchFunction('뷰'); // 실행 안됨
searchFunction('앵귤러'); // 300ms 후에 "검색: 앵귤러" 출력
```

메인 라이브러리 debounce와 비교:

```typescript
// compat 버전 (Lodash 호환, maxWait 등 추가 옵션)
import { debounce } from 'es-toolkit/compat';
const debouncedCompat = debounce(func, 300, {
  leading: true,
  trailing: false,
  maxWait: 1000
});

// 메인 라이브러리 버전 (더 빠름, 간단함)
import { debounce } from 'es-toolkit';
const debouncedMain = debounce(func, 300, {
  edges: ['leading'] // leading/trailing 대신 edges 사용
});
```

leading과 trailing 옵션:

```typescript
import { debounce } from 'es-toolkit/compat';

const func = () => console.log('실행됨');

// leading: true - 첫 호출 시 즉시 실행
const leadingDebounce = debounce(func, 1000, { leading: true });
leadingDebounce(); // 즉시 "실행됨" 출력
leadingDebounce(); // 1초 대기
// 1초 후 추가 실행 없음

// trailing: true (기본값) - 마지막 호출 후 지연 시간 뒤 실행
const trailingDebounce = debounce(func, 1000, { trailing: true });
trailingDebounce(); // 1초 대기
trailingDebounce(); // 1초 대기 (이전 타이머 취소)
// 1초 후 "실행됨" 출력

// 둘 다 true - 시작과 끝에서 실행
const bothDebounce = debounce(func, 1000, {
  leading: true,
  trailing: true,
});
bothDebounce(); // 즉시 "실행됨" 출력
bothDebounce(); // 1초 대기
// 1초 후 "실행됨" 출력 (trailing)
```

maxWait 옵션:

```typescript
import { debounce } from 'es-toolkit/compat';

// 최대 2초마다는 반드시 실행
const debouncedWithMaxWait = debounce(() => console.log('저장됨'), 500, { maxWait: 2000 });

// 빠르게 연속 호출해도 최대 2초마다는 실행됨
setInterval(() => {
  debouncedWithMaxWait();
}, 100); // 100ms마다 호출하지만 2초마다 "저장됨" 출력
```

실제 검색 예제:

```typescript
import { debounce } from 'es-toolkit/compat';

class SearchComponent {
  constructor() {
    this.searchInput = document.getElementById('search');

    // 사용자 입력을 300ms 디바운스
    this.debouncedSearch = debounce(this.performSearch.bind(this), 300, {
      leading: false, // 입력 시작시 즉시 검색하지 않음
      trailing: true, // 입력 멈춘 후 검색
    });

    this.searchInput.addEventListener('input', e => {
      this.debouncedSearch(e.target.value);
    });
  }

  performSearch(query) {
    if (query.length < 2) return;

    console.log('API 호출:', query);
    // fetch(`/api/search?q=${query}`)...
  }
}
```

스크롤 이벤트 최적화:

```typescript
import { debounce } from 'es-toolkit/compat';

// 스크롤 이벤트를 100ms 디바운스하되, 최대 500ms마다는 실행
const optimizedScrollHandler = debounce(
  () => {
    const scrollTop = window.pageYOffset;
    console.log('스크롤 위치:', scrollTop);

    // 헤더 숨김/표시 로직
    if (scrollTop > 100) {
      document.header.classList.add('hidden');
    } else {
      document.header.classList.remove('hidden');
    }
  },
  100,
  { maxWait: 500 }
);

window.addEventListener('scroll', optimizedScrollHandler);
```

API 호출 제한:

```typescript
import { debounce } from 'es-toolkit/compat';

class AutoSave {
  constructor() {
    // 500ms 디바운스, 최대 5초마다는 저장
    this.debouncedSave = debounce(this.saveToServer.bind(this), 500, { maxWait: 5000 });
  }

  onTextChange(content) {
    this.pendingContent = content;
    this.debouncedSave();
  }

  saveToServer() {
    if (!this.pendingContent) return;

    console.log('서버에 저장:', this.pendingContent);
    // fetch('/api/save', { ... })

    this.pendingContent = null;
  }
}
```

cancel과 flush 메서드:

```typescript
import { debounce } from 'es-toolkit/compat';

const debouncedFunc = debounce(() => {
  console.log('실행됨');
}, 1000);

debouncedFunc(); // 1초 대기 중

// 대기 중인 실행을 취소
debouncedFunc.cancel();

// 또는 즉시 실행
debouncedFunc(); // 1초 대기 시작
debouncedFunc.flush(); // 즉시 "실행됨" 출력하고 타이머 취소
```

버튼 클릭 중복 방지:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleSubmit = debounce(
  async formData => {
    console.log('폼 제출 중...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
      console.log('제출 완료');
    } catch (error) {
      console.error('제출 실패:', error);
    }
  },
  1000,
  { leading: true, trailing: false } // 첫 클릭만 처리
);

document.getElementById('submit-btn').addEventListener('click', e => {
  const formData = new FormData(e.target.form);
  handleSubmit(formData);
});
```

리사이즈 이벤트 처리:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleResize = debounce(
  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('창 크기 변경:', { width, height });

    // 레이아웃 재계산
    recalculateLayout();
  },
  250,
  { leading: false, trailing: true }
);

window.addEventListener('resize', handleResize);

// 페이지 종료 시 정리
window.addEventListener('beforeunload', () => {
  handleResize.cancel();
});
```

#### 파라미터

- `func` (`Function`): 디바운스할 함수예요.
- `wait` (`number`, 선택): 지연할 밀리초 수예요. 기본값은 `0`이에요.
- `options` (`DebounceSettings`, 선택): 옵션 객체예요.
  - `leading` (`boolean`): `true`이면 지연 시작 시점에 함수를 실행해요. 기본값은 `false`예요.
  - `trailing` (`boolean`): `true`이면 지연 종료 시점에 함수를 실행해요. 기본값은 `true`예요.
  - `maxWait` (`number`): 함수 실행이 지연될 수 있는 최대 시간이에요. 기본값은 `Infinity`예요.

### 반환 값

(`DebouncedFunc`): 디바운스된 함수를 반환해요. `cancel()`과 `flush()` 메서드가 포함되어 있어요.
