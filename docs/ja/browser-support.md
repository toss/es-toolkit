---
description: es-toolkit が標準でサポートするブラウザの範囲と、より古いブラウザをサポートする方法
---

# ブラウザサポート

es-toolkit は、2022年初頭以降にリリースされたすべてのブラウザで、追加設定なしで動作します。

| 環境       | 最小バージョン |
| ---------- | -------------- |
| Chrome     | 98+            |
| Edge       | 98+            |
| Firefox    | 94+            |
| Safari     | 15.4+          |
| iOS Safari | 15.4+          |
| Node.js    | 18+            |

es-toolkit はモダンな JavaScript を積極的に活用し、小さく効率的なコードベースを維持しています。
上記より古いバージョンのブラウザをサポートするには、ビルド設定を追加できます。Chrome 51 や Safari 10 のように ES2015 のみをサポートするさらに古いブラウザでも、正しく動作させることができます。下記の[古いブラウザをサポートする](#古いブラウザをサポートする)を参照してください。

es-toolkit は新しいバージョンをリリースするたびに、サポートするブラウザで正しく動作することを検証しています。[`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) などの ESLint プラグインによる静的検証を行い、さらに実際の Playwright ベースの E2E テストで再検証しています。

## 古いブラウザをサポートする

バンドラーを正しく設定すれば、es-toolkit は Chrome 51 や Safari 10 のような古いブラウザでも正しく動作します。
そのためには2つの設定が必要です。

### 1. 最新の構文を古い構文に変換する(トランスパイル)

es-toolkit は、オプショナルチェーン(`foo?.bar`)やクラスフィールドといった最新の構文を積極的に使った状態で配布されています。

バンドラーは一般的に依存関係(`node_modules`)をトランスパイルしません。
そのため、es-toolkit が使う最新の構文を古いブラウザでもサポートされる構文に変換する、次の設定を追加してください。

#### Vite

[`build.target`](https://vite.dev/config/build-options.html#build-target) をサポートしたい最も古いブラウザに設定します。

```js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: ['chrome80', 'safari14.1'], // [!code highlight]
  },
});
```

Vite は `build.target` を es-toolkit を含むバンドル内のすべてのモジュールに適用するため、追加の設定は不要です。

#### Webpack + Babel

`babel-loader` に `@babel/preset-env` を設定し、`exclude` パターンが es-toolkit を除外しないようにします。

```js
export default {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /core-js/, // [!code highlight]
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { chrome: '80', safari: '14.1' } }], // [!code highlight]
            ],
          },
        },
      },
    ],
  },
};
```

### 2. 最新のランタイム JavaScript API を補う(ポリフィル)

es-toolkit は `Array#at` や `structuredClone` のような、最新のブラウザやランタイムでサポートされるモダンな JavaScript API を活用しています。古いブラウザにはこれらの関数の実装がないため、es-toolkit を使うには関数の実装を補う必要があります。

次のように `core-js` が提供するポリフィルを追加してください。

```js
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'core-js/actual/aggregate-error';
import 'core-js/actual/array/at';
import 'core-js/actual/array/find-last';
import 'core-js/actual/array/find-last-index';
import 'core-js/actual/object/has-own';
import structuredCloneShim from '@ungap/structured-clone';

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = structuredCloneShim;
}
```

このコードは、アプリケーションのエントリーポイントで es-toolkit を読み込む前にロードされる必要があります。

### 注意点

#### 1. Vite で Chrome 51 や Safari 10 のような非常に古いブラウザをサポートするには追加のプラグインが必要です

Vite はデフォルトで esbuild を使用していますが、非常に古いブラウザまではサポートしていません。
非常に古いブラウザをサポートするには、次のように [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) プラグインを使ってソースコードを Babel でトランスパイルする必要があります。

```js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy'; // [!code highlight]

export default defineConfig({
  plugins: [
    legacy({ // [!code highlight]
      targets: ['chrome >= 51', 'safari >= 10', 'ios_saf >= 10', 'firefox >= 54', 'edge >= 15'], // [!code highlight]
    }), // [!code highlight]
  ],
});
```

#### 2. `es-toolkit/bigint` は BigInt をサポートするブラウザでのみ使用できます

JavaScript の BigInt は新しく追加された値型のため、トランスパイルもポリフィルの追加もできません。`es-toolkit/bigint` を使う場合は、Chrome 67 以上、Safari 14 以上のブラウザのみサポートできます。
