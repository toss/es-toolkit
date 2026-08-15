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

この範囲は世界のブラウザトラフィックの約98.7%をカバーします。ビルド設定を追加すれば、さらに下まで広げられます。

- **Chrome 80 / Safari 14.1**(2020年頃、約98.8%カバー): トランスパイル + 6つのポリフィル。[古いブラウザをサポートする](#古いブラウザをサポートする)を参照してください。
- **Chrome 51 / Safari 10**(ES2015世代、約99.4%カバー): [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) を使用、`es-toolkit/bigint` は除外。[ES2015世代のブラウザ](#es2015世代のブラウザ-chrome-51-safari-10)を参照してください。

これらのサポート範囲は継続的に検証されています。すべての変更は静的解析([`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x)、[`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat))でチェックされ、ドキュメント内のすべてのコード例からなるテストスイートが、実際の Chrome 98、Chrome 80、Chrome 51、WebKit 15.4、WebKit 14.1 上で CI により実行されます。

## なぜこのバージョンなのか

es-toolkit はバンドルを小さく高速に保つため、トランスパイルしていないモダンな JavaScript を配布しています。最小サポートバージョンは、内部で使用している最も新しいランタイム API によって決まります。

| 機能                                         | 使用している関数                                               | Chrome | Safari |
| -------------------------------------------- | -------------------------------------------------------------- | ------ | ------ |
| `??`、`?.`、`BigInt`                         | 全体                                                           | 80     | 14     |
| クラスフィールド                             | `Semaphore`、`Mutex`                                           | 72     | 14.1   |
| `AggregateError`                             | `clone`                                                        | 85     | 14     |
| `Object.hasOwn`                              | `pick`、`groupBy`、`get` などのオブジェクト/配列ユーティリティ | 93     | 15.4   |
| `Error` の `cause` オプション                | `clone`                                                        | 93     | 15     |
| `Array.prototype.at`                         | `nthArg`                                                       | 92     | 15.4   |
| `Array.prototype.findLast` / `findLastIndex` | `findLast`、`findLastKey`、`takeRightWhile`                    | 97     | 15.4   |
| `structuredClone`                            | `cloneDeepWith`                                                | 98     | 15.4   |

リポジトリの ESLint ルールが、Chrome 98 / Safari 15.4 より新しい構文や API が追加された場合にビルドを失敗させるため、この表が知らないうちにずれることはありません。

## 古いブラウザをサポートする

Chrome 80 / Safari 14.1 で es-toolkit を実行するには、2つのことが必要です。

1. es-toolkit を含むバンドル全体の**トランスパイル**
2. 上の表にあるランタイム API のための**6つのポリフィル**

必要なポリフィルはごくわずかで、`core-js/stable` 全体をインポートする必要はありません。

<<< @/../tests/browser-compat/polyfills/minimal.mjs{js}

このファイルを、es-toolkit をインポートする**前に**、アプリケーションのエントリーポイントで一度インポートしてください。

::: warning es-toolkit をトランスパイル対象から除外しないでください
ビルドツールは通常 `node_modules` をトランスパイルしません。es-toolkit はモダンな構文で配布されているため、必ずトランスパイルに**含める**必要があります。下記の Vite 設定はバンドルされるすべてのコードを変換するため自動的に処理されます。webpack + Babel の場合は、es-toolkit が含まれるように `exclude` の範囲を調整してください。
:::

### Vite

[`build.target`](https://vite.dev/config/build-options.html#build-target) をサポートしたい最も古いブラウザに設定します。

<<< @/../tests/browser-compat/fixtures/vite-polyfill/vite.config.mjs{js}

Vite は `build.target` を es-toolkit を含むバンドル内のすべてのモジュールに適用するため、追加の設定は不要です。

### webpack + Babel

`babel-loader` に `@babel/preset-env` を設定し、`exclude` パターンが es-toolkit を除外しないようにします。

<<< @/../tests/browser-compat/fixtures/webpack/webpack.config.mjs{js}

::: danger `useBuiltIns: 'usage'` はデフォルトでは es-toolkit にポリフィルを注入しません
`@babel/preset-env` の `useBuiltIns: 'usage'` は、Babel 自身が処理したファイルにのみポリフィルを注入します。一般的な `exclude: /node_modules/` の設定では、Babel は es-toolkit の `Object.hasOwn` 呼び出しを見ることがなく、ポリフィルは注入されません。上記のポリフィルファイルをエントリーポイントでインポートするか(推奨)、es-toolkit を `babel-loader` の対象に含めてください。
:::

### 古いブラウザでの既知の動作差異

- **Chrome 80–92 / Safari 14.1 では `clone` が `Error` の `cause` を保持できません**: これらのエンジンは `Error` コンストラクタの `cause` オプションを黙って無視し、これをポリフィルするにはグローバルの `Error` コンストラクタを置き換える必要があります。これらのブラウザでは、複製されたエラーに `cause` がありません。

## ES2015世代のブラウザ (Chrome 51+ / Safari 10+)

世界のトラフィックの約99.4%までカバーするには、[`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) を使用してください。Babel でトランスパイルするため — esbuild と異なり — `words` や `camelCase` などの文字列ユーティリティが使う Unicode プロパティ正規表現も変換でき、必要な core-js ポリフィルを自動的に注入します。

<<< @/../tests/browser-compat/fixtures/vite-legacy/vite.config.mjs{js}

2つの Web API は core-js の範囲外のため、`plugin-legacy` は提供しません。`structuredClone` と、`debounce`・`delay` が使用する `AbortController` です。上記の最小ポリフィルの代わりに、このファイルをエントリーポイントで一度インポートしてください。

<<< @/../tests/browser-compat/polyfills/legacy.mjs{js}

`es-toolkit/bigint` のほかに、1つのグループの関数はより高い下限を保ちます。`es-toolkit/compat` の単語分割関数(`words`、`camelCase`、`kebabCase`、`lowerCase`、`snakeCase`、`startCase`、`upperCase`)は Unicode プロパティ正規表現を呼び出し時に文字列から組み立てるため、どのトランスパイラも変換できず、呼び出すには Chrome 64+ / Safari 11.1+ が必要です。インポート自体は安全で、メインの `es-toolkit` モジュールの同名関数は Babel が変換できる正規表現リテラルを使っているため、最後まで動作します。

::: warning このティアでは `es-toolkit/bigint` が除外されます
`BigInt` は ES2015 では表現できません。リテラルはトランスパイルできず、ランタイムはポリフィルできません。アプリケーションが `es-toolkit/bigint` をインポートしない限り(そして `sum` などの関数に `BigInt` 値を渡さない限り)、bigint のコードはバンドルに入らず、レガシービルドは正しく動作します。それ以外のすべて — `es-toolkit`、`es-toolkit/compat`、`es-toolkit/fp` — はサポートされます。
:::

::: info このティアの検証範囲
CI はこの設定をそのまま実際の Chrome 51 で実行します。Safari 10–13 は Linux CI では自動化できないため、このティアの Safari 側は直接のテスト実行ではなく Babel/core-js の変換保証に基づいています。WebKit 14.1 レーンがデュアルバンドルのモダン側を検証します。
:::

## どのように検証されているか

[`tests/browser-compat`](https://github.com/toss/es-toolkit/tree/main/tests/browser-compat) スイートは、すべての関数の JSDoc からすべての `@example` を抽出し(1,300以上のケース)、配布される `dist` ファイルを上記の各設定でバンドルして、CI で実際のブラウザ上で実行します。

| 設定                               | ブラウザ               |
| ---------------------------------- | ---------------------- |
| トランスパイルなし、ポリフィルなし | Chrome 98、WebKit 15.4 |
| 上記の Vite 設定                   | Chrome 80、WebKit 14.1 |
| 上記の webpack 設定                | Chrome 80、WebKit 14.1 |
| 上記の `plugin-legacy` 設定        | Chrome 51、WebKit 14.1 |

このページに掲載されている設定ファイルは CI スイートが使用しているファイルそのものなので、ドキュメントが実際のテストとずれることはありません。
