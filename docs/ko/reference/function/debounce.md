# debounce

함수 호출을 지연시키는 디바운스된 함수를 만들어요.

```typescript
const debouncedFunc = debounce(func, debounceMs, options);
```

## 레퍼런스

### `debounce(func, debounceMs, options)`

연속된 호출을 하나로 합치고 싶을 때 `debounce`를 사용하세요. 디바운스된 함수는 마지막 호출 후 지정된 시간이 지나야 실행돼요. 검색창 입력이나 창 크기 조절 같은 빠른 이벤트 처리에 유용해요.

```typescript
import { debounce } from 'es-toolkit/function';

const debouncedFunction = debounce(() => {
  console.log('실행됨');
}, 1000);

// 1초 안에 다시 호출되지 않으면 '실행됨'을 로깅해요
debouncedFunction();

// 이전 호출을 취소해요
debouncedFunction.cancel();

// 대기 중인 함수를 즉시 실행해요
debouncedFunction.flush();
```

다음과 같이 사용자 인풋에 따라 검색처럼 무거운 API를 호출할 때 유용하게 사용할 수 있어요.

```typescript
const searchInput = document.getElementById('search');
const searchResults = debounce(async (query: string) => {
  const results = await fetchSearchResults(query);
  displayResults(results);
}, 300);

searchInput.addEventListener('input', e => {
  searchResults(e.target.value);
});
```

[`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)을 이용해서 디바운스된 함수 호출을 취소할 수 있어요.

```typescript
const controller = new AbortController();
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('Function executed');
  },
  1000,
  { signal: controller.signal }
);

// 1초 안에 다시 호출되지 않으면, '실행됨'을 로깅해요
debouncedWithSignalFunction();

// debounce 함수 호출을 취소해요
controller.abort();
```

#### 파라미터

- `func` (`F`): debounce된 함수를 만들 함수.
- `debounceMs`(`number`): debounce로 지연시킬 밀리초.
- `options` (`DebounceOptions`, optional): 옵션 객체.
  - `signal` (`AbortSignal`, optional): 디바운스된 함수를 취소하기 위한 선택적 `AbortSignal`.
  - `edges` (`Array<'leading' | 'trailing'>`, optional): 원래 함수를 언제 실행할지 나타내는 배열. 기본값은 `['trailing']`이에요.
    - `'leading'`이 포함되면, 디바운스된 함수를 처음으로 호출했을 때 즉시 원래 함수를 실행해요.
    - `'trailing'`이 포함되면, 마지막 디바운스된 함수 호출로부터 `debounceMs` 밀리세컨드가 지나면 원래 함수를 실행해요.
    - `'leading'`과 `'trailing'`이 모두 포함된다면, 원래 함수는 실행을 지연하기 시작할 때와 끝날 때 모두 호출돼요. 그렇지만 양쪽 시점 모두에 호출되기 위해서는, 디바운스된 함수가 `debounceMs` 밀리세컨드 사이에 최소 2번은 호출되어야 해요. 디바운스된 함수를 한 번 호출해서 원래 함수를 두 번 호출할 수는 없기 때문이에요.

#### 반환 값

(`DebouncedFunction<F>`): 디바운스된 함수로, 다음 메서드를 가지고 있어요.

- `cancel()`: 예정된 호출을 취소해요.
- `flush()`: 대기 중인 함수를 즉시 실행해요.
- `schedule()`: 함수 실행을 다시 예약해요.
