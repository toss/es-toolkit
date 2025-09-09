---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'es-toolkit'
  text: '最先端のJavaScriptユーティリティライブラリ'
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /hero.webp
    alt:
  actions:
    - theme: brand
      text: es-toolkitを知る
      link: /ja/intro
    - theme: alt
      text: リファレンス
      link: /ja/reference/array/at
    - theme: alt
      text: インストールと使用方法
      link: /ja/usage

features:
  - title: 高速なパフォーマンス
    details: 同様の機能を提供する他のライブラリと比較して、平均2-3倍高速な実行時パフォーマンスを提供します。
  - title: 小さなバンドルサイズ
    details: 同等の機能を持つ関数を基準に、最大97%小さなJavaScriptサイズを実現しています。
  - title: 簡単なLodashの代替
    details: es-toolkitはLodashを簡単に代替できる完全な互換性レイヤーを提供します。
    link: /ja/compatibility
  - title: モダンな実装
    details: 最新のJavaScript APIを使用しているため、実装が直感的でシンプルです。
  - title: 堅牢な型定義
    details: すべての関数に対してシンプルながら堅牢な型定義を提供しています。
  - title: 幅広い採用
    details: es-toolkitは、Storybook、Recharts、ink、CKEditorなどの人気のオープンソースプロジェクトから信頼され、採用されています。
  - title: テストカバレッジ100%
    details: すべての関数とブランチに対して、綿密なテストが作成されています。
  - title: あらゆる環境で使用可能
    details: Node.js、Deno、Bun、そしてブラウザまで、幅広いJavaScript環境をサポートしています。
---
