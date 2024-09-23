---
description: es-toolkit提供的最小包体积
---

# 包体积

![图表显示es-toolkit与lodash之间包大小的差异，差异高达97%。](/assets/bundle-size.png)

通过其现代化的实现，es-toolkit显著减少了其包体积，与 [lodash](https://lodash.com) 等其他库相比，可以减少高达97%。

这使得es-toolkit在包体积方面成为最高效的选择，其中一些实用函数的体积甚至少于100字节。

## 包体积比较

|                                            | es-toolkit@0.0.1 | lodash-es@4.17.21 | Difference |
| ------------------------------------------ | ---------------- | ----------------- | ---------- |
| [sample](./reference/array/sample)         | 88 bytes         | 2000 bytes        | -95.6%     |
| [difference](./reference/array/difference) | 91 bytes         | 3190 bytes        | -97.2%     |
| [sum](./reference/math/sum)                | 152 bytes        | 413 bytes         | -63.2%     |
| [debounce](./reference/function/debounce)  | 144 bytes        | 1400 bytes        | -89.7%     |
| [throttle](./reference/function/throttle)  | 110 bytes        | 1460 bytes        | -92.5%     |
| [pick](./reference/object/pick)            | 657 bytes        | 3860 bytes        | -83.0%     |
| [zip](./reference/array/zip)               | 797 bytes        | 1790 bytes        | -55.5%     |

## 包体积测试方法

我们的包体积是使用 [esbuild 0.23.0](https://esbuild.github.io) 测量的，通过分析如下代码的大小：

```tsx
import { chunk } from 'es-toolkit';
// 或 import { chunk } from 'lodash-es';

console.log(chunk);
```

有关详细信息，请参见我们的[包体积基准代码](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)。
