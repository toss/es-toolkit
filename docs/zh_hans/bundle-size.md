---
description: es-toolkit提供的最小包体积
---

# 包体积

![图表显示es-toolkit与lodash之间包大小的差异，差异高达97%。](/assets/bundle-size.png)

通过其现代化的实现，es-toolkit显著减少了其包体积，与 [lodash](https://lodash.com) 等其他库相比，可以减少高达97%。

这使得es-toolkit在包体积方面成为最高效的选择，其中一些实用函数的体积甚至少于100字节。

## 包体积比较

|                                            | es-toolkit@1.40.0 | lodash-es@4.17.21 | Difference |
| ------------------------------------------ | ----------------- | ----------------- | ---------- |
| [sample](./reference/array/sample)         | 94 bytes          | 4817 bytes        | -98.0%     |
| [difference](./reference/array/difference) | 90 bytes          | 7985 bytes        | -98.8%     |
| [sum](./reference/math/sum)                | 93 bytes          | 698 bytes         | -86.6%     |
| [debounce](./reference/function/debounce)  | 531 bytes         | 2873 bytes        | -81.5%     |
| [throttle](./reference/function/throttle)  | 764 bytes         | 3111 bytes        | -75.4%     |
| [pick](./reference/object/pick)            | 132 bytes         | 9520 bytes        | -98.6%     |
| [zip](./reference/array/zip)               | 221 bytes         | 3961 bytes        | -94.4%     |

## 包体积测试方法

我们的包体积是使用 [esbuild 0.23.0](https://esbuild.github.io) 测量的，通过分析如下代码的大小：

```tsx
import { chunk } from 'es-toolkit';

// 或 import { chunk } from 'lodash-es';

console.log(chunk);
```

有关详细信息，请参见我们的[包体积基准代码](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)。
