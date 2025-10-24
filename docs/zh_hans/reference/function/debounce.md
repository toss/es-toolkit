# debounce

创建一个延迟函数调用的防抖函数。

```typescript
const debouncedFunc = debounce(func, debounceMs, options);
```

## 参考

### `debounce(func, debounceMs, options)`

当您想要将连续调用合并为一次时,请使用 `debounce`。防抖函数会在最后一次调用后等待指定时间才执行。这对于处理快速事件(如搜索框输入或窗口调整大小)很有用。

```typescript
import { debounce } from 'es-toolkit/function';

const debouncedFunction = debounce(() => {
  console.log('执行了');
}, 1000);

// 如果在 1 秒内没有再次调用,则打印 '执行了'
debouncedFunction();

// 取消之前的调用
debouncedFunction.cancel();

// 立即执行等待中的函数
debouncedFunction.flush();
```

可以在根据用户输入调用繁重 API(如搜索)时有效使用。

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

可以使用 [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 取消防抖函数调用。

```typescript
const controller = new AbortController();
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('Function executed');
  },
  1000,
  { signal: controller.signal }
);

// 如果在 1 秒内没有再次调用,则打印 '执行了'
debouncedWithSignalFunction();

// 取消防抖函数调用
controller.abort();
```

#### 参数

- `func` (`F`): 要创建防抖函数的函数。
- `debounceMs`(`number`): 防抖延迟的毫秒数。
- `options` (`DebounceOptions`, optional): 选项对象。
  - `signal` (`AbortSignal`, optional): 用于取消防抖函数的可选 `AbortSignal`。
  - `edges` (`Array<'leading' | 'trailing'>`, optional): 指示何时执行原始函数的数组。默认值为 `['trailing']`。
    - 如果包含 `'leading'`,则在首次调用防抖函数时立即执行原始函数。
    - 如果包含 `'trailing'`,则在最后一次调用防抖函数后等待 `debounceMs` 毫秒后执行原始函数。
    - 如果同时包含 `'leading'` 和 `'trailing'`,则原始函数会在延迟执行开始时和结束时都被调用。但是,要在两个时间点都被调用,防抖函数必须在 `debounceMs` 毫秒内至少被调用 2 次。因为不能通过一次调用防抖函数来调用原始函数两次。

#### 返回值

(`DebouncedFunction<F>`): 防抖函数,具有以下方法。

- `cancel()`: 取消预定的调用。
- `flush()`: 立即执行等待中的函数。
- `schedule()`: 重新安排函数执行。
