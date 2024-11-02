# rangeRight

`end`から始まり`start`の前で終わる数値の配列を返します。連続する数値は`step`だけ離れています。

`step`のデフォルト値は1で、0にはできません。

## インターフェース

```typescript
function rangeRight(end: number): number[];
function rangeRight(start: number, end: number): number[];
function rangeRight(start: number, end: number, step: number): number[];
```

### パラメータ

- `start` (`number`): 開始する数値。配列はこの数値を含みます。
- `end` (`number`): 終了する数値。配列はこの数値を含みません。
- `step` (`number`): 配列内の連続する数値の差。デフォルト値は`1`です。

### 戻り値

- (`number[]`): `end`から始まり`start`の前で終わる、連続する数値が`step`だけ離れている配列。

## 例

```typescript
// [3, 2, 1, 0] を返します
rangeRight(4);

// [15, 10, 5, 0] を返します
rangeRight(0, 20, 5);

// [20, 15, 10, 5, 0] を返します
rangeRight(0, 21, 5);

// [-3, -2, -1, 0] を返します
rangeRight(0, -4, -1);

// エラーを投げます: ステップ値は0以外の整数でなければなりません。
rangeRight(1, 4, 0);
```
