---
description: es-toolkit/compat がトランスパイルやポリフィルなしで、配布されたそのままの状態でサポートするブラウザと Node.js のバージョン
---

# ブラウザと Node.js のサポート

`es-toolkit/compat` は、ES2015 をサポートするすべての環境で、配布されたそのままの状態で動作します。

| 環境       | 最小バージョン |
| ---------- | -------------- |
| Chrome     | 51+            |
| Edge       | 15+            |
| Firefox    | 54+            |
| Safari     | 10+            |
| iOS Safari | 10+            |
| Node.js    | 6+             |

トランスパイルもポリフィルも不要です。バンドラーの設定を追加しなくても、`es-toolkit/compat` をそのまま使用できます。

これは、追加設定なしで使うには Chrome 98、Safari 15.4、Node.js 20.12 以降が必要なメインライブラリの `es-toolkit` とは異なります。詳しくは[ブラウザサポート](/ja/browser-support)を参照してください。

この範囲は `es-toolkit/compat` と関数ごとのエントリポイント(`es-toolkit/compat/*`)にのみ適用されます。`es-toolkit` や `es-toolkit/array` などの他のエントリポイントは、メインライブラリの要件に従います。

## 古い環境をサポートする理由

`es-toolkit/compat` は、lodash からの移行を支援するために存在します。lodash を使っているコードは、古い Node.js サーバーや古いブラウザなど、今も古い環境で動いていることが多くあります。
そのため、ビルド設定を変えずに lodash から `es-toolkit/compat` へ切り替えられるよう、`es-toolkit/compat` は公開されたままの状態で古い環境でも動作します。

## 検証方法

これらの環境のサポートは、変更のたびに2つの方法で検証しています。

- **ESLint による静的検証**: [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) で `es-toolkit/compat` のコードを ES2015 の構文と組み込み機能のみに制限し(オプショナルチェーンと `??` はビルド時に古い構文へ変換されるため許可しています)、[`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat) で Node.js 6 を対象にチェックしています。
- **CI で実際の Node.js 6 による検証**: ビルド済みパッケージのすべての `es-toolkit/compat/*` エントリポイントを読み込み、compat 関数のすべての `@example` を実行しています。
