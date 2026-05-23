# es-toolkit/compat

`es-toolkit/compat`は、[Lodash](https://lodash.com)と同じインターフェースと動作を提供するモジュールです。Lodashを使っている既存のコードをそのままにしたまま、少しずつ`es-toolkit`へ移行できるように作られています。

既存のプロジェクトでLodashを使っていないなら、[`es-toolkit`](/ja/intro)を使ってください。

::: tip ✅ 1.39.3からLodashと100%の互換性を保証しています
Lodash自身のテストコードをそのまま通過します。動作は同じまま、より軽く高速です。
:::

```ts
// lodashと同じ呼び出しの形を es-toolkit/compat でそのまま使えます
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3, 4], 0);
// [] を返します。lodashと同じです。
```

## マイグレーションの流れ

既存のコードからLodashを取り除くときは、次の流れをおすすめします。

1. `lodash` / `lodash-es`のimportパスを`es-toolkit/compat`に変えてください。呼び出し側のコードはそのままで大丈夫です。
2. 時間をかけて呼び出し側を整理しつつ、importを[`es-toolkit`](/ja/intro)に切り替えてください。すべて移行できれば、バンドルがより小さく、より高速になります。

## `es-toolkit`との違い

- **APIの形**: Lodashと1:1で一致しています。暗黙的な型変換、さまざまな引数の形、非推奨のヘルパーまでそのまま含まれます。[`es-toolkit`](/ja/intro)は型安全で整理された形だけを提供します。
- **バンドルサイズと速度**: [`es-toolkit`](/ja/intro)より少し大きく、少し遅いです。Lodashと動作を合わせるための追加処理が入っているためです。
- **非推奨の関数**: Lodashで非推奨になった関数も互換性のために`compat`には残っていますが、[`es-toolkit`](/ja/intro)には含まれません。マイグレーション中に一緒に整理してください。

関数ごとの詳細なドキュメントは[互換性リファレンス](/ja/compat/reference/array/castArray)をご覧ください。

## 設計原則

::: info
`es-toolkit/compat`の設計原則の方向性は変わる可能性があります。
:::

`es-toolkit/compat`は、次の機能について`lodash`と100%同じ機能を提供することを目指しています。

- `lodash`のテストケースとして書かれている機能
- `@types/lodash`または`@types/lodash-es`の型から推測できる機能
- `lodash`から`es-toolkit`へコードをマイグレーションする際に見つかった機能の違い（[Issuesページ](https://github.com/toss/es-toolkit/issues)に報告してください）

ただし、以下は`es-toolkit/compat`の対象外です。

- 暗黙的な型変換: 空文字列を0またはfalseに変換するような動作
- 特殊なケースに最適化された実装: [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)のように、ソートされた配列だけを受け取る関数
- `Array.prototype`のような組み込みオブジェクトのプロトタイプが変更されたケースへの対応
- JavaScript Realmへの対応
- メソッドチェーン: `_(arr).map(...).filter(...)`のようなメソッドチェーン

## 実装状況

::: info
以下の絵文字で、各機能の現在の状態を表しています。

- ✅: 完了（実装されており、lodashのテストコードをすべて通過しています）
- 📝: レビュー中（実装されていますが、lodashのテストコードでテストされていません）
- ❌: 未実装

「レビュー中」と書かれていても、すでにlodashと100%同じ機能を提供している場合があります。
:::

<CompatibilityStatus lang="ja"/>
