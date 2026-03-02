---
description: es-toolkit提供的最小包体积
---

# 包体积

<BundleSizeChart />

通过其现代化的实现，es-toolkit显著减少了其包体积，与 [lodash](https://lodash.com) 等其他库相比，可以减少高达97%。

这使得es-toolkit在包体积方面成为最高效的选择，其中一些实用函数的体积甚至少于100字节。

## 包体积比较

<BundleSizeTable />

## 包体积测试方法

我们的包体积是使用 [esbuild 0.23.0](https://esbuild.github.io) 测量的，通过分析如下代码的大小：

```tsx
import { chunk } from 'es-toolkit';

// 或 import { chunk } from 'lodash-es';

console.log(chunk);
```

有关详细信息，请参见我们的[包体积基准代码](https://github.com/toss/es-toolkit/tree/main/benchmarks/bundle-size)。
