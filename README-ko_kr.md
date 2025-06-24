![](./docs/public/og.png)

# es-toolkit &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE) [![codecov](https://codecov.io/gh/toss/es-toolkit/graph/badge.svg?token=8N5S3AR3C7)](https://codecov.io/gh/toss/es-toolkit) [![NPM badge](https://img.shields.io/npm/v/es-toolkit?logo=npm)](https://www.npmjs.com/package/es-toolkit) [![JSR badge](https://jsr.io/badges/@es-toolkit/es-toolkit)](https://jsr.io/@es-toolkit/es-toolkit) [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

[English](https://github.com/toss/es-toolkit/blob/main/README.md) | 한국어 | [简体中文](https://github.com/toss/es-toolkit/blob/main/README-zh_hans.md) | [日本語](https://github.com/toss/es-toolkit/blob/main/README-ja_jp.md)

es-toolkit은 높은 성능과 작은 번들 사이즈, 강력한 타입을 자랑하는 현대적인 JavaScript 유틸리티 라이브러리예요.

- es-toolkit은 매일 사용하는 다양한 유틸리티 함수를 현대적인 구현으로 제공해요. 예를 들어, [debounce](https://es-toolkit.dev/reference/function/debounce.html), [delay](https://es-toolkit.dev/reference/promise/delay.html), [chunk](https://es-toolkit.dev/reference/array/chunk.html), [sum](https://es-toolkit.dev/reference/math/sum.html), [pick](https://es-toolkit.dev/reference/object/pick.html) 같은 함수들이 있어요.
- 설계할 때 퍼포먼스를 중요 원칙으로 두어, es-toolkit은 현대적인 JavaScript 환경에서 [2-3배 빠른 성능](https://es-toolkit.dev/ko/performance.html)을 보여요.
- es-toolkit은 트리 셰이킹을 기본으로 지원하며, 함수에 따라서는 다른 라이브러리와 비교했을 때 [최대 97% 작은 JavaScript 번들 사이즈](https://es-toolkit.dev/ko/bundle-size.html)를 제공해요.
- es-toolkit은 lodash를 손쉽게 대체할 수 있는 완전한 호환성 레이어, [es-toolkit/compat](https://es-toolkit.dev/compatibility.html)을 제공해요.
- es-toolkit은 TypeScript 타입이 내장되어 있고, 직관적이고 정확한 타입을 추구해요. [isNotNil](https://es-toolkit.dev/ko/reference/predicate/isNotNil.html) 같은 사용하기 편리한 유틸리티 함수도 제공해요.
- es-toolkit은 [Storybook](https://github.com/storybookjs/storybook/blob/9d862798d666678cc4822e857c00bbd744169ced/code/core/package.json#L358)이나 [ink](https://github.com/vadimdemedes/ink/blob/2090ad9779be59dea71d173eb49785b7bd4495d0/package.json#L55) 같이 자주 사용되는 오픈소스 라이브러리에서 사용돼요.
- es-toolkit은 100% 테스트 커버리지를 유지하면서, 높은 안정성을 자랑해요.

## 예시

```tsx
// jsr을 사용하는 경우에는 '@es-toolkit/es-toolkit'에서 가져와요.
import { chunk, debounce } from 'es-toolkit';

const debouncedLog = debounce(message => {
  console.log(message);
}, 300);

// 이 호출은 디바운스 처리돼요.
debouncedLog('Hello, world!');

const array = [1, 2, 3, 4, 5, 6];
const chunkedArray = chunk(array, 2);

console.log(chunkedArray);
// 출력: [[1, 2], [3, 4], [5, 6]]
```

## 기여하기

커뮤니티에 있는 모든 분들에게 기여를 환영해요. 아래에 작성되어 있는 기여 가이드를 확인하세요.

[CONTRIBUTING](https://github.com/toss/es-toolkit/blob/main/.github/CONTRIBUTING.md)

## 라이선스

MIT © Viva Republica, Inc. 자세한 내용은 [LICENSE](./LICENSE)를 참고하세요.

<a title="Toss" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="Toss" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>
