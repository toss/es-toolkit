# debounce (Lodash 兼容)

::: warning 请使用 `es-toolkit` 的 [`debounce`](../../function/debounce.md)

这个 `debounce` 函数由于复杂的 `maxWait` 处理和 Lodash 兼容的选项结构而存在开销。

请使用更快、更现代的 `es-toolkit` 的 [`debounce`](../../function/debounce.md)。

:::

创建一个防抖函数,延迟调用提供的函数,直到自上次调用后经过 `wait` 毫秒。

```typescript
const debouncedFunction = debounce(func, wait, options);
```

## 用法

### `debounce(func, wait, options)`

当您想要延迟函数调用时,使用 `debounce`。它对于防止搜索输入、滚动事件、按钮点击等中的过度调用很有用。

```typescript
import { debounce } from 'es-toolkit/compat';

// 基本用法
const searchFunction = debounce(query => {
  console.log('搜索:', query);
}, 300);

// 仅当在 300ms 内未再次调用时执行
searchFunction('React'); // 不执行
searchFunction('Vue'); // 不执行
searchFunction('Angular'); // 300ms 后输出 "搜索: Angular"
```

与主库 debounce 的比较:

```typescript
// compat 版本(Lodash 兼容,包含 maxWait 等额外选项)
import { debounce } from 'es-toolkit/compat';
const debouncedCompat = debounce(func, 300, {
  leading: true,
  trailing: false,
  maxWait: 1000
});

// 主库版本(更快、更简单)
import { debounce } from 'es-toolkit';
const debouncedMain = debounce(func, 300, {
  edges: ['leading'] // 使用 edges 而不是 leading/trailing
});
```

leading 和 trailing 选项:

```typescript
import { debounce } from 'es-toolkit/compat';

const func = () => console.log('执行了');

// leading: true - 首次调用时立即执行
const leadingDebounce = debounce(func, 1000, { leading: true });
leadingDebounce(); // 立即输出 "执行了"
leadingDebounce(); // 等待 1 秒
// 1 秒后没有额外执行

// trailing: true(默认) - 最后一次调用后延迟执行
const trailingDebounce = debounce(func, 1000, { trailing: true });
trailingDebounce(); // 等待 1 秒
trailingDebounce(); // 等待 1 秒(取消之前的计时器)
// 1 秒后输出 "执行了"

// 两者都为 true - 在开始和结束时执行
const bothDebounce = debounce(func, 1000, {
  leading: true,
  trailing: true,
});
bothDebounce(); // 立即输出 "执行了"
bothDebounce(); // 等待 1 秒
// 1 秒后输出 "执行了"(trailing)
```

maxWait 选项:

```typescript
import { debounce } from 'es-toolkit/compat';

// 保证至少每 2 秒执行一次
const debouncedWithMaxWait = debounce(() => console.log('已保存'), 500, { maxWait: 2000 });

// 即使快速连续调用,也会每 2 秒执行一次
setInterval(() => {
  debouncedWithMaxWait();
}, 100); // 每 100ms 调用一次,但每 2 秒输出 "已保存"
```

实际搜索示例:

```typescript
import { debounce } from 'es-toolkit/compat';

class SearchComponent {
  constructor() {
    this.searchInput = document.getElementById('search');

    // 将用户输入防抖 300ms
    this.debouncedSearch = debounce(this.performSearch.bind(this), 300, {
      leading: false, // 输入开始时不立即搜索
      trailing: true, // 输入停止后搜索
    });

    this.searchInput.addEventListener('input', e => {
      this.debouncedSearch(e.target.value);
    });
  }

  performSearch(query) {
    if (query.length < 2) return;

    console.log('API 调用:', query);
    // fetch(`/api/search?q=${query}`)...
  }
}
```

滚动事件优化:

```typescript
import { debounce } from 'es-toolkit/compat';

// 将滚动事件防抖 100ms,但至少每 500ms 执行一次
const optimizedScrollHandler = debounce(
  () => {
    const scrollTop = window.pageYOffset;
    console.log('滚动位置:', scrollTop);

    // 头部隐藏/显示逻辑
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

API 调用限制:

```typescript
import { debounce } from 'es-toolkit/compat';

class AutoSave {
  constructor() {
    // 防抖 500ms,至少每 5 秒保存一次
    this.debouncedSave = debounce(this.saveToServer.bind(this), 500, { maxWait: 5000 });
  }

  onTextChange(content) {
    this.pendingContent = content;
    this.debouncedSave();
  }

  saveToServer() {
    if (!this.pendingContent) return;

    console.log('保存到服务器:', this.pendingContent);
    // fetch('/api/save', { ... })

    this.pendingContent = null;
  }
}
```

cancel 和 flush 方法:

```typescript
import { debounce } from 'es-toolkit/compat';

const debouncedFunc = debounce(() => {
  console.log('执行了');
}, 1000);

debouncedFunc(); // 等待 1 秒

// 取消待执行的调用
debouncedFunc.cancel();

// 或立即执行
debouncedFunc(); // 开始等待 1 秒
debouncedFunc.flush(); // 立即输出 "执行了" 并取消计时器
```

防止重复按钮点击:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleSubmit = debounce(
  async formData => {
    console.log('正在提交表单...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
      console.log('提交完成');
    } catch (error) {
      console.error('提交失败:', error);
    }
  },
  1000,
  { leading: true, trailing: false } // 仅处理第一次点击
);

document.getElementById('submit-btn').addEventListener('click', e => {
  const formData = new FormData(e.target.form);
  handleSubmit(formData);
});
```

调整大小事件处理:

```typescript
import { debounce } from 'es-toolkit/compat';

const handleResize = debounce(
  () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('窗口已调整大小:', { width, height });

    // 重新计算布局
    recalculateLayout();
  },
  250,
  { leading: false, trailing: true }
);

window.addEventListener('resize', handleResize);

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  handleResize.cancel();
});
```

#### 参数

- `func` (`Function`): 要防抖的函数。
- `wait` (`number`, 可选): 要延迟的毫秒数。默认为 `0`。
- `options` (`DebounceSettings`, 可选): 选项对象。
  - `leading` (`boolean`): 如果为 `true`,则在延迟开始时执行函数。默认为 `false`。
  - `trailing` (`boolean`): 如果为 `true`,则在延迟结束时执行函数。默认为 `true`。
  - `maxWait` (`number`): 函数执行可以延迟的最大时间。默认为 `Infinity`。

#### 返回值

(`DebouncedFunc`): 返回防抖函数。它包含 `cancel()` 和 `flush()` 方法。
