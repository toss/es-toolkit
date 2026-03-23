# AI 連携

es-toolkitは、AIエージェントがライブラリを最大限に活用できるよう取り組んでいます。AIコーディングツール向けのAgent Skillsと、より幅広いAI統合のためのllms.txtエンドポイントを提供しています。

## Agent Skills

es-toolkitは、AIコーディングツールがes-toolkitを効果的に理解し使用できるようにする[Agent Skills](https://skills.sh)を提供しています。Claude Code、Cursor、Copilot、Windsurfなど、さまざまなツールで利用できます。

### インストール

::: code-group

```sh [npx (すべての AI ツール)]
npx skills add toss/es-toolkit
```

```sh [Claude Code Plugin]
/plugin marketplace add toss/es-toolkit
/plugin install es-toolkit@es-toolkit-plugin
```

:::

### 利用可能なスキル

| スキル         | 説明                                          |
| ------------- | --------------------------------------------- |
| **guide**     | インストール、インポートパターン、ランタイム設定ガイド |
| **recommend** | ユースケースに最適なes-toolkit関数を提案          |
| **migrate**   | lodashコードをes-toolkitに移行                   |

### 使用例

```
/es-toolkit:guide Denoでes-toolkitを使うには？
/es-toolkit:recommend 2つのオブジェクトをディープマージしたい
/es-toolkit:migrate _.chunk(users, 10)
```

## llms.txt

es-toolkitは[llms.txt](https://llmstxt.org/)ファイルを提供しています。llms.txtは、AIアシスタントや大規模言語モデル（LLM）がプロジェクトのドキュメントをより効果的に理解できるようにするための標準です。

### `/llms.txt`

es-toolkitのドキュメントの構造化された目次で、各ページへのリンクが含まれています。AIツールが特定の関数やトピックを検索する際に便利です。

- **URL**: [https://es-toolkit.dev/llms.txt](https://es-toolkit.dev/llms.txt)

### `/llms-full.txt`

すべてのドキュメントページの内容を1つのファイルにまとめたものです。AIツールにes-toolkitの包括的なコンテキストを提供したい場合に便利です。

- **URL**: [https://es-toolkit.dev/llms-full.txt](https://es-toolkit.dev/llms-full.txt)

### AIツールでの活用方法

多くのAIツールやLLMベースのアプリケーションがllms.txt標準をサポートしています。これらのエンドポイントを使用して、AIアシスタントにes-toolkitのAPIと機能に関する完全なコンテキストを提供できます。

例えば、AIコーディングアシスタントにURLを提供すると、コード作成を手伝う際にes-toolkitのドキュメントを参照できます:

```
ユーティリティ関数にはes-toolkitを使用してください。ドキュメント: https://es-toolkit.dev/llms-full.txt
```
