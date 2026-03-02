# Documentation Guide

es-toolkit docs are written in 4 languages. All must be created together.

## File Locations

| Language | Path                                        |
| -------- | ------------------------------------------- |
| English  | `docs/reference/{category}/{fn}.md`         |
| Korean   | `docs/ko/reference/{category}/{fn}.md`      |
| Japanese | `docs/ja/reference/{category}/{fn}.md`      |
| Chinese  | `docs/zh_hans/reference/{category}/{fn}.md` |

## Translation Table

| English    | Korean (해요체) | Japanese         | zh_hans |
| ---------- | --------------- | ---------------- | ------- |
| Signature  | 인터페이스      | インターフェース | 签名    |
| Parameters | 파라미터        | パラメータ       | 参数    |
| Returns    | 반환 값         | 戻り値           | 返回値  |
| Examples   | 예시            | 例               | 示例    |
| Usage      | 사용법          | 使い方           | 用法    |
| Throws     | 에러            | エラー           | 异常    |

## Korean Style

Write in polite conversational tone (해요체): "반환해요", "나눠요", "던져요".

## Template

Use existing docs as reference. See `docs/reference/array/chunk.md` for a complete example.

```markdown
# functionName

[One-line description.]

## Signature

\`\`\`typescript
function functionName<T>(param: ParamType): ReturnType;
\`\`\`

### Parameters

- `param` (`ParamType`): Description.

### Returns

(`ReturnType`): Description.

## Examples

\`\`\`typescript
import { functionName } from 'es-toolkit/category';

functionName(input);
// Returns: output
\`\`\`
```
