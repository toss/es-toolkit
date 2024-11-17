# words

文字列を単語単位で分割し、配列として返します。ASCIIおよびUnicode文字をすべて単語として認識できます。

## インターフェース

```ts
function words(str: string): string[];
```

### パラメータ

- `str` (`string`): 単語に分割する文字列です。

### 戻り値

(`string[]`): 文字列を単語単位で分割した配列です。

## 例

```typescript
words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

words('camelCaseHTTPRequest🚀');
// => ['camel', 'Case', 'HTTP', 'Request', '🚀']

words('Lunedì 18 Set');
// => ['Lunedì', '18', 'Set']
```

## Lodash 互換性

`es-toolkit/compat` から `words` をインポートすると、Lodash と互換になります。

- `words`では、文字列を分割する正規表現を変更するために、第二引数`pattern`を提供できます。
- `words`は、第一引数が文字列でない場合、自動的に文字列に変換します。

```typescript
import { words } from 'es-toolkit/compat';

words('fred, barney, & pebbles', /[^, ]+/g);
// 戻り値: ['fred', 'barney', '&', 'pebbles']
```
