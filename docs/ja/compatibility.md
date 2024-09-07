# Lodashとの互換性

```tsx
// es-toolkit/compatはlodashと100%同じ動作を提供することを目指しています
import { chunk } from 'es-toolkit/compat';

// es-toolkitは元々chunkのサイズとして0をサポートしていませんでした
chunk([1, 2, 3, 4], 0);
// es-toolkit/compatはlodashと同じ[]を返します
```

`lodash`との最大の互換性を確保するために、2つのライブラリ間のギャップを埋める互換レイヤーである`es-toolkit/compat`を使用してください。

`es-toolkit`はスムーズなマイグレーションを保証するために、2つのライブラリ間の動作の違いがない`es-toolkit/compat`ライブラリを開発しています。`lodash`と同じAPIと機能を提供し、スムーズにマイグレーションできるようサポートする予定です。

`es-toolkit/compat`は実際の`lodash`テストコードを使用してテストされます。

`es-toolkit/compat`は、元の`es-toolkit`と比較して若干のパフォーマンス低下とバンドルサイズの増加があることに注意してください。このモジュールはスムーズな移行を支援するために設計されており、移行が完了したら最適なパフォーマンスを得るために元の`es-toolkit`に置き換えるべきです。

## デザイン原則

::: info
デザイン原則は変更される可能性があります。
:::

`es-toolkit/compat`は以下のような機能について`lodash`と100%同じ機能を提供することを目指しています。

- `lodash`のテストケースで作成された機能
- `@types/lodash`または`@types/lodash-es`の型から推論できる機能

以下のような機能は`es-toolkit/compat`ではサポートしていません。

- 空文字列を0またはfalseに変換するような暗黙的な型変換
- [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)のような特定のタイプの配列に特化した実装を持つ関数
- `Array.prototype`のようなJavaScriptの組み込みオブジェクトのプロトタイプが変更された場合に対応するコード
- JavaScript Realmに対応するコード
- `_(arr).map(...).filter(...)`のような"Seq"メソッドを通じたメソッドチェーンのサポート

## 実装ステータス

::: info
以下の絵文字は各機能の実装ステータスを示しています：

- ✅: 完了（関数は完全に実装され、lodashのテストコードで全てのテストに合格しています。）
- 📝: レビュー中（関数は実装されていますが、まだlodashのテストコードでテストされていません。）
- ❌: 未実装（関数はまだ実装されていません。）

"レビュー中"と表示されていても、完全に同じか確認しているだけですでに同じ機能を提供しているかもしれません。
:::

<CompatibilityStatus lang="ja"/>
