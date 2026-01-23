# addJitter

为基础延迟时间添加随机抖动（jitter），以避免大量任务在同一时间点同时触发（“惊群”/thundering herd 问题）。

返回值在如下区间内等概率采样：

```
[delay - delay * factor, delay + delay * factor]
```

随后会被限制为不小于 0（不会返回负值）。

适用于：重试 / 指数退避、轮询调度、分散批量任务启动时间等需要减少竞争与瞬时压力的场景。

## 签名

```typescript
function addJitter(delay: number, factor?: number, rng?: () => number): number;
```

### 参数

- `delay` (`number`): 基础延迟（毫秒）。
- `factor` (`number`, 可选，默认 `0.2`): 抖动系数，取值范围建议在 `[0, 1]` 之间，表示最大正负偏移比例；`0` 表示无抖动。
- `rng` (`() => number`, 可选，默认 `Math.random`): 返回 `[0, 1)` 区间浮点数的随机数生成函数，可注入自定义实现以便测试复现。

### 返回值

(`number`): 应用抖动后的非负延迟时间（毫秒）。

## 示例

### 基本用法

```typescript
import { addJitter } from 'es-toolkit/promise';

const base = 1000; // 1 秒
const value = addJitter(base); // 当 factor = 0.2 时，返回值位于 [800, 1200]
console.log(value);
```

### 自定义抖动系数

```typescript
addJitter(500, 0.5); // 结果位于 [250, 750]
```

### 注入自定义 RNG（确定性测试）

```typescript
// rng 始终返回 1 -> 取上界
const upper = addJitter(100, 0.3, () => 1); // 130
// rng 始终返回 0 -> 取下界
const lower = addJitter(100, 0.3, () => 0); // 70
```

### 与指数退避结合的重试策略

```typescript
import { addJitter, delay } from 'es-toolkit/promise';

async function fetchWithRetry(run: () => Promise<any>) {
  let base = 500;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await run();
    } catch (err) {
      const wait = addJitter(base); // 分散并发重试
      await delay(wait);
      base *= 2; // 指数增加
    }
  }
  throw new Error('All retries failed');
}
```

### 用于轮询

```typescript
import { addJitter, delay } from 'es-toolkit/promise';

async function poll(run: () => Promise<void>) {
  const base = 2000;
  const wait = addJitter(base, 0.15);
  await delay(wait);
  await run();
  // 调度下一次
  setTimeout(() => poll(run), addJitter(base, 0.15));
}
```

## 行为与说明

- 区间内均匀分布（uniform）。
- 永不返回负值：即使 `factor` 设置大于 1（不推荐）或 `delay` 很小，结果也会被下限截断为 0。
- `factor = 0` 时直接返回原始 `delay`。
- 可通过自定义 `rng` 进行可重复测试。
