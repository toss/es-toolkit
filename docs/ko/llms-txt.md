# AI 활용

es-toolkit은 AI 에이전트가 라이브러리를 적극적으로 활용할 수 있도록 노력하고 있어요. AI 도구가 es-toolkit을 더 쉽게 이해하고, 참조하고, 사용할 수 있도록 다양한 편의 기능을 제공해 나갈 예정이에요.

## llms.txt

그 첫 번째로, es-toolkit은 [llms.txt](https://llmstxt.org/) 파일을 제공하고 있어요. llms.txt는 AI 어시스턴트와 대규모 언어 모델(LLM)이 프로젝트 문서를 더 효과적으로 이해할 수 있도록 돕는 표준이에요.

### `/llms.txt`

es-toolkit 문서의 구조화된 목차로, 개별 페이지로의 링크를 포함하고 있어요. AI 도구가 특정 함수나 주제를 찾아볼 때 유용해요.

- **URL**: [https://es-toolkit.dev/llms.txt](https://es-toolkit.dev/llms.txt)

### `/llms-full.txt`

모든 문서 페이지의 전체 내용을 하나의 파일로 합친 것이에요. AI 도구에 es-toolkit에 대한 포괄적인 컨텍스트를 제공하고 싶을 때 유용해요.

- **URL**: [https://es-toolkit.dev/llms-full.txt](https://es-toolkit.dev/llms-full.txt)

### AI 도구에서 활용하기

많은 AI 도구와 LLM 기반 애플리케이션이 llms.txt 표준을 지원하고 있어요. 이 엔드포인트를 사용하면 AI 어시스턴트에게 es-toolkit의 API와 기능에 대한 전체 컨텍스트를 제공할 수 있어요.

예를 들어, AI 코딩 어시스턴트에게 URL을 제공하면 코드 작성을 도와줄 때 es-toolkit 문서를 참고할 수 있어요:

```
유틸리티 함수는 es-toolkit을 사용해 주세요. 문서: https://es-toolkit.dev/llms-full.txt
```
