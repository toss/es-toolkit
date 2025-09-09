---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'es-toolkit'
  text: '最先进的JavaScript工具库'
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /hero.webp
    alt:
  actions:
    - theme: brand
      text: 关于 es-toolkit
      link: /zh_hans/intro
    - theme: alt
      text: 参考文档
      link: /zh_hans/reference/array/at
    - theme: alt
      text: 使用指南
      link: /zh_hans/usage

features:
  - title: 最佳性能
    details: es-toolkit在现代JavaScript运行时中的性能比其他库提高了2-3倍。
  - title: 小型包体积
    details: 与其他替代库相比，es-toolkit的JavaScript代码体积最多减少了97%。
  - title: 简单替代Lodash
    details: es-toolkit提供了一个完整的兼容层，可以轻松替代Lodash。
    link: /zh_hans/compatibility
  - title: 现代化实现
    details: es-toolkit充分利用现代JavaScript API进行简单且无错误的实现。
  - title: 强大的类型支持
    details: es-toolkit为所有函数提供简单而强大的类型支持。
  - title: 经过实战验证
    details: es-toolkit具有100%的测试覆盖率，确保最大的健壮性。
  - title: 广泛采用
    details: es-toolkit被多个流行的开源项目所信任和使用，例如Storybook、Recharts、ink和CKEditor。
  - title: 全面的运行时支持
    details: es-toolkit支持包括Node.js、Deno、Bun和浏览器在内的所有JavaScript环境。
---
