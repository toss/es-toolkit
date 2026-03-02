# AI 連携

es-toolkitは、AIエージェントがライブラリを最大限に活用できるよう取り組んでいます。AIツールがes-toolkitをより簡単に理解し、参照し、使用できるようにするための機能を積極的に提供していく予定です。

## llms.txt

その第一歩として、es-toolkitは[llms.txt](https://llmstxt.org/)ファイルを提供しています。llms.txtは、AIアシスタントや大規模言語モデル（LLM）がプロジェクトのドキュメントをより効果的に理解できるようにするための標準です。

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
