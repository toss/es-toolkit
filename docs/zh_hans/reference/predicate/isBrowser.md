# isBrowser

检查当前执行环境是否为浏览器。

```typescript
const result = isBrowser();
```

## 用法

### `isBrowser()`

当有需要仅在浏览器环境中执行的代码时，请使用 `isBrowser`。它通过检查 `window.document` 的存在来判断是否为浏览器环境。在 SSR（服务端渲染）或 Node.js 环境中很有用。

```typescript
import { isBrowser } from 'es-toolkit/predicate';

// 仅在浏览器环境中操作 DOM
if (isBrowser()) {
  document.getElementById('app').innerHTML = 'Hello World';
  console.log('在浏览器环境中运行');
} else {
  console.log('在服务器环境中运行');
}
```

可以用于实现基于环境的条件逻辑。

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function getWindowWidth() {
  if (isBrowser()) {
    return window.innerWidth;
  }
  return 0; // 在服务器端返回默认值
}

// 注册事件监听器
function addWindowListener() {
  if (isBrowser()) {
    window.addEventListener('resize', () => {
      console.log('窗口大小已改变');
    });
  }
}
```

在 Next.js、Nuxt.js 等 SSR 框架中特别有用。

```typescript
import { isBrowser } from 'es-toolkit/predicate';

function initializeAnalytics() {
  if (isBrowser()) {
    // 仅在浏览器中加载分析脚本
    const script = document.createElement('script');
    script.src = 'https://analytics.example.com/script.js';
    document.head.appendChild(script);
  }
}

// 访问本地存储
function getStoredValue(key: string) {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
}
```

#### 返回值

(`boolean`): 如果当前环境为浏览器则返回 `true`，否则返回 `false`。
