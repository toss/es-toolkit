# before (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [`before`](../../function/before.md)

由于复杂的类型验证和整数转换处理，这个 `before` 函数的运行速度较慢。

请使用更快、更现代的 `es-toolkit` 的 [before](../../function/before.md)。

:::

创建一个函数，该函数在指定次数内执行原始函数，之后返回最后一次的结果。

```typescript
const limitedFunction = before(n, func);
```

## 参考

### `before(n, func)`

当您想要限制函数只执行到特定次数时，请使用 `before`。这对于限制函数调用次数或只在初始设置阶段执行函数时非常有用。

```typescript
import { before } from 'es-toolkit/compat';

// 基本用法
let count = 0;
const beforeThree = before(3, () => ++count);

console.log(beforeThree()); // 1 (第一次调用)
console.log(beforeThree()); // 2 (第二次调用)
console.log(beforeThree()); // 2 (从第三次调用开始返回最后结果)
console.log(beforeThree()); // 2 (继续返回最后结果)
```

使用闭包的替代方案：

```typescript
// 使用 before
const beforeThree = before(3, myFunction);

// 使用闭包（更简单更快）
function createBefore(limit, callback) {
  let callCount = 0;
  let lastResult;

  return function (...args) {
    if (callCount < limit - 1) {
      lastResult = callback.apply(this, args);
      callCount++;
    }
    return lastResult;
  };
}

const beforeThreeAlternative = createBefore(3, myFunction);
```

用作初始化函数：

```typescript
import { before } from 'es-toolkit/compat';

class Database {
  constructor() {
    this.isInitialized = false;

    // 初始化只执行一次
    this.initialize = before(2, () => {
      console.log('正在初始化数据库...');
      this.setupConnection();
      this.isInitialized = true;
      return '初始化完成';
    });
  }

  setupConnection() {
    // 实际连接设置逻辑
  }

  query(sql) {
    const initResult = this.initialize();
    console.log(initResult); // 第一次调用: "初始化完成"，之后：相同结果

    // 查询执行逻辑
    return `执行查询: ${sql}`;
  }
}

const db = new Database();
db.query('SELECT * FROM users'); // 执行初始化
db.query('SELECT * FROM products'); // 不执行初始化
```

限制 API 调用：

```typescript
import { before } from 'es-toolkit/compat';

// 最多允许 5 次 API 调用
const limitedApiCall = before(6, endpoint => {
  console.log(`API 调用: ${endpoint}`);
  return fetch(endpoint).then(res => res.json());
});

// 前 5 次执行实际的 API 调用
limitedApiCall('/api/data1'); // 实际调用
limitedApiCall('/api/data2'); // 实际调用
limitedApiCall('/api/data3'); // 实际调用
limitedApiCall('/api/data4'); // 实际调用
limitedApiCall('/api/data5'); // 实际调用
limitedApiCall('/api/data6'); // 返回最后结果（不进行 API 调用）
```

限制事件监听器：

```typescript
import { before } from 'es-toolkit/compat';

// 最多处理 3 次点击事件
const limitedClickHandler = before(4, event => {
  console.log('处理点击:', event.target.id);
  return `处理完成: ${Date.now()}`;
});

document.getElementById('button').addEventListener('click', limitedClickHandler);
// 只处理前 3 次点击，之后返回最后结果
```

处理参数和返回值：

```typescript
import { before } from 'es-toolkit/compat';

const limitedCalculator = before(3, (operation, a, b) => {
  const result = operation === 'add' ? a + b : a - b;
  console.log(`计算: ${a} ${operation} ${b} = ${result}`);
  return result;
});

console.log(limitedCalculator('add', 5, 3)); // "计算: 5 add 3 = 8"，返回: 8
console.log(limitedCalculator('subtract', 10, 4)); // "计算: 10 subtract 4 = 6"，返回: 6
console.log(limitedCalculator('multiply', 7, 2)); // 不计算，返回: 6（最后结果）
```

传递 0 或 1 会使函数不执行：

```typescript
import { before } from 'es-toolkit/compat';

const neverCalled = before(0, () => {
  console.log('此函数不会执行');
  return '结果';
});

const onceOnly = before(1, () => {
  console.log('此函数也不会执行');
  return '结果';
});

console.log(neverCalled()); // undefined
console.log(onceOnly()); // undefined
```

资源清理优化：

```typescript
import { before } from 'es-toolkit/compat';

// 函数引用会自动清理以防止内存泄漏
const limitedProcessor = before(2, data => {
  // 复杂的数据处理
  return processComplexData(data);
});

// 第 2 次调用后，原始函数引用被移除（垃圾回收）
```

#### 参数

- `n` (`number`): 函数执行的最大次数。执行到 n-1 次，从第 n 次调用开始返回最后结果。
- `func` (`Function`): 要限制的函数。

#### 返回值

(`Function`): 返回一个新函数，该函数在指定次数内执行原始函数，之后返回最后一次的结果。
