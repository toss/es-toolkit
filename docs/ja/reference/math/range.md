# range

`start`から始まり`end`の前で終わる数値の配列を返します。連続する数値は`step`だけ離れています。

`step`のデフォルト値は1で、0にはできません。

## インターフェース

```typescript
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
```

### パラメータ

- `start` (`number`): 開始する数値。配列はこの数値を含みます。
- `end` (`number`): 終了する数値。配列はこの数値を含みません。
- `step` (`number`): 配列内の連続する数値の差。デフォルト値は`1`です。

### 戻り値

- (`number[]`): `start`から始まり`end`の前で終わる、連続する数値が`step`だけ離れている配列。

## 例

```typescript
// [0, 1, 2, 3] を返します
range(4);

// [0, 5, 10, 15] を返します
range(0, 20, 5);

// [0, -1, -2, -3] を返します
range(0, -4, -1);

// エラーを投げます: ステップ値は0以外の整数でなければなりません。
range(1, 4, 0);
```
