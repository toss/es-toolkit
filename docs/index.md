---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'es-toolkit'
  text: 'State-of-the-art JavaScript utility library'
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /hero.webp
    alt:
  actions:
    - theme: brand
      text: About es-toolkit
      link: /intro
    - theme: alt
      text: Reference
      link: /reference/array/at
    - theme: alt
      text: Usage
      link: /usage

features:
  - title: Best performance
    details: es-toolkit delivers 2-3× better performance in modern JavaScript runtimes compared to other libraries.
  - title: Small bundle footprint
    details: es-toolkit ships up to 97% less JavaScript code compared to other alternative libraries.
  - title: Seamless Lodash replacement
    details: es-toolkit offers a complete compatibility layer to seamlessly replace Lodash.
    link: /compatibility
  - title: Modern implementation
    details: es-toolkit fully leverages modern JavaScript APIs for straightforward and error-free implementation.
  - title: Robust types
    details: es-toolkit offers simple yet robust types for all functions.
  - title: Widely adopted
    details: es-toolkit is trusted and used by popular open-source projects like Storybook, Recharts, ink, and CKEditor.
  - title: Battle-tested
    details: es-toolkit has 100% test coverage, ensuring maximum robustness.
  - title: Comprehensive runtime support
    details: es-toolkit supports all JavaScript environments, including Node.js, Deno, Bun, and browsers.
---
