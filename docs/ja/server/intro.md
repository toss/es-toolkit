# es-toolkit/server

`es-toolkit/server` は、Node.js、Deno、Bun のように Node.js 互換 API を提供するサーバーランタイム向けのユーティリティモジュールです。プロセスを実行したり、ターミナル出力に色やスタイルを付けたりするような、一見シンプルでも毎回自分で実装するには手間のかかる処理を、小さな API として提供します。

他の `es-toolkit` モジュールと同じように TypeScript 型を同梱し、必要な機能だけを備えた小さく予測しやすいインターフェースを保っています。

```typescript
import { colors, exec } from 'es-toolkit/server';

const result = await exec('git', ['status', '--short'], {
  throwOnNonZeroExitCode: false,
});

if (result.stdout.trim().length === 0) {
  console.log(colors.green('作業ツリーはクリーンです。'));
} else {
  console.log(colors.yellow(result.stdout.trim()));
}
```

## 実行環境

`es-toolkit/server` は `es-toolkit` や `es-toolkit/compat` とは異なり、Node.js 互換のサーバーランタイムでのみ使用できます。ブラウザや React Native のように `node:child_process` などの Node.js API を利用できない環境では使用できません。

ブラウザでも動作する配列、オブジェクト、文字列、Promise のユーティリティが必要な場合は [`es-toolkit`](/ja/intro) を使用してください。既存の Lodash コードを呼び出し側を変えずに移行している場合は [`es-toolkit/compat`](/ja/compat/intro) を使用できます。
