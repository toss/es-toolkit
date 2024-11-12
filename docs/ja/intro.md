# es-toolkitの紹介

es-toolkitは、日常的な開発で使用する様々な関数を集めた最先端のJavaScriptユーティリティライブラリです。

[lodash](https://lodash.com/)のような他のライブラリと比較して、es-toolkitは[同じ関数基準で最大97%小さいバンドルサイズ](./bundle-size.md)を提供し、[2〜3倍高速に](./performance.md)動作します。最新のJavaScript APIを活用して現代的に実装したおかげです。

es-toolkitは堅固なTypeScriptタイプを内蔵して提供し、信頼性を高めるために100%テストカバレッジを目指しています。

## 提供する機能

es-toolkitが提供する機能リストは以下の通りです：

- **Array**: 配列操作のためのユーティリティ、例えば [uniq](./reference/array/uniq.md) や [difference](./reference/array/difference.md) など。
- **Function**: 関数の実行を制御するためのツール、例えば [debounce](./reference/function/debounce.md) や [throttle](./reference/function/throttle.md) など。
- **Math**: 数値操作のためのユーティリティ、例えば [sum](./reference/math/sum.md) や [round](./reference/math/round.md) など。
- **Object**: JavaScriptオブジェクトを操作するためのツール、例えば [pick](./reference/object/pick.md) や [omit](./reference/object/omit.md) など。
- **Predicate**: 型ガード関数、例えば [isNotNil](./reference/predicate/isNotNil.md) など。
- **Promise**: 非同期操作のためのユーティリティ、例えば [delay](./reference/promise/delay.md) など。
- **String**: 文字列操作のためのユーティリティ、例えば [snakeCase](./reference/string/snakeCase.md) など。

## 信頼されるツール

以下のように、大規模リポジトリの開発者たちが es-toolkit を選択しています。

- [storybookjs/storybook](https://github.com/storybookjs/storybook)
  ![GitHub stars](https://img.shields.io/github/stars/storybookjs/storybook?style=flat-square&logo=github&label=Stars&labelColor=black&color=black)
  ![NPM downloads](https://img.shields.io/npm/dw/storybook?style=flat-square&logo=npm&label=Downloads&labelColor=black&color=black)

- [microsoft/genaiscript](https://github.com/microsoft/genaiscript)
  ![GitHub stars](https://img.shields.io/github/stars/microsoft/genaiscript?style=flat-square&logo=github&label=Stars&labelColor=black&color=black)
  ![NPM downloads](https://img.shields.io/npm/dw/genaiscript?style=flat-square&logo=npm&label=Downloads&labelColor=black&color=black)

- [vadimdemedes/ink](https://github.com/vadimdemedes/ink)
  ![GitHub stars](https://img.shields.io/github/stars/vadimdemedes/ink?style=flat-square&logo=github&label=Stars&labelColor=black&color=black)
  ![NPM downloads](https://img.shields.io/npm/dw/ink?style=flat-square&logo=npm&label=Downloads&labelColor=black&color=black)

[もっと見る](https://github.com/toss/es-toolkit/network/dependents)

<script setup>
import NpmWeeklyDownloadsChart from '../components/NpmWeeklyDownloadsChart.vue'
</script>

<NpmWeeklyDownloadsChart />

## リンク

このプロジェクトについてより多くの情報を得るには、以下のリンクを参照してください：

- [GitHub](https://github.com/toss/es-toolkit)
