# sampleSize

指定された `size` のサンプル要素の配列を返します。

この関数は配列と数値を受け取ります。[Floydのアルゴリズム](https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html)を使用して、サンプリングされた要素を含む配列を返します。

## インターフェース

```typescript
function sampleSize<T>(array: T[], size: number): T[];
```

### パラメータ

- `array` (`T[]`): サンプリングする配列です。
- `size` (`number`): サンプリングするサイズです。

### 戻り値

(`T[]`): サンプルサイズが適用された新しい配列です。

### エラー

`size` が `array` の長さより大きい場合、エラーをスローします。

## 例

```typescript
const result = sampleSize([1, 2, 3], 2);
// 結果は配列の要素から2つを含む配列になります。
// [1, 2] または [1, 3] または [2, 3]
```
