# deburr

特殊文字とアクセント記号をASCII文字に変換します。

```typescript
const result = deburr(str);
```

## 参照

### `deburr(str)`

文字列に含まれる特殊文字やアクセント記号(ダイアクリティカルマーク)をASCII文字に変換したいときは`deburr`を使用します。URLやファイル名、検索機能で文字を正規化するときに便利です。

```typescript
import { deburr } from 'es-toolkit/string';

// 基本的な使い方
deburr('café'); // returns 'cafe'
deburr('résumé'); // returns 'resume'
deburr('naïve'); // returns 'naive'
deburr('Zürich'); // returns 'Zurich'
```

様々な言語の特殊文字を処理できます。

```typescript
import { deburr } from 'es-toolkit/string';

// ドイツ語
deburr('München'); // returns 'Munchen'
deburr('Björk'); // returns 'Bjork'

// フランス語
deburr('Crème brûlée'); // returns 'Creme brulee'
deburr('naïveté'); // returns 'naivete'

// スペイン語
deburr('niño'); // returns 'nino'
deburr('mañana'); // returns 'manana'
```

URL生成やファイル名の整理に活用できます。

```typescript
import { deburr } from 'es-toolkit/string';

// URLスラッグを生成
const title = 'Caféの特別なメニュー';
const slug = deburr(title).toLowerCase().replace(/\s+/g, '-');
// returns 'cafeの-特別な-メニュー'

// ファイル名を整理
const fileName = 'résumé-田中太郎.pdf';
const cleanName = deburr(fileName); // returns 'resume-田中太郎.pdf'
```

検索機能で文字列比較を簡単にします。

```typescript
import { deburr } from 'es-toolkit/string';

function searchMatch(query: string, target: string): boolean {
  const normalizedQuery = deburr(query.toLowerCase());
  const normalizedTarget = deburr(target.toLowerCase());
  return normalizedTarget.includes(normalizedQuery);
}

searchMatch('cafe', 'Café Mocha'); // returns true
searchMatch('resume', 'résumé.pdf'); // returns true
```

#### パラメータ

- `str` (`string`): 特殊文字やアクセント記号が含まれる文字列です。

#### 戻り値

(`string`): 特殊文字とアクセント記号がASCII文字に変換された新しい文字列を返します。
