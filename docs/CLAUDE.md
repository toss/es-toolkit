# Documentation Guide

es-toolkit docs are written in 4 languages. All must be created together.

## Writing guide

The template, placeholder rules, and style guidance live in [`.github/CONTRIBUTING.md` § 5 Writing Documentation](../.github/CONTRIBUTING.md#5-writing-documentation). Read that section before creating or editing any reference doc.

For canonical examples, see [`sum`](./reference/math/sum.md) and [`toCamelCaseKeys`](./reference/object/toCamelCaseKeys.md).

## File locations

| Language | Path                                        |
| -------- | ------------------------------------------- |
| English  | `docs/reference/{category}/{fn}.md`         |
| Korean   | `docs/ko/reference/{category}/{fn}.md`      |
| Japanese | `docs/ja/reference/{category}/{fn}.md`      |
| Chinese  | `docs/zh_hans/reference/{category}/{fn}.md` |

## Translation table

Use these terms consistently across translations:

| English    | Korean (해요체) | Japanese   | zh_hans |
| ---------- | --------------- | ---------- | ------- |
| Usage      | 사용법          | 使用法     | 用法    |
| Parameters | 파라미터        | パラメータ | 参数    |
| Returns    | 반환 값         | 戻り値     | 返回值  |
| Throws     | 에러            | エラー     | 异常    |
| Examples   | 예시            | 例         | 示例    |

## Korean style

Write Korean docs in polite conversational tone (해요체): "반환해요", "나눠요", "던져요".
