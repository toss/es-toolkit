# inRange

値が指定された範囲内にあるかどうかを確認します。

## インターフェース

```typescript
function inRange(value: number, maximum: number): boolean;
function inRange(value: number, minimum: number, maximum: number): boolean;
```

### パラメータ

- `value` (`number`): 確認する値です。
- `minimum` (`number`): 範囲の最小値（含む）です。
- `maximum` (`number`): 範囲の最大値（含まない）です。

### 戻り値

(`boolean`): 値が指定された範囲内にある場合は `true`、そうでない場合は `false` になります。

### エラー

`minimum` が `maximum` 以上の場合、エラーがスローされます。

## 例

```typescript
const result1 = inRange(3, 5); // result1 は true になります。
const result2 = inRange(1, 2, 5); // result2 は false になります。
const result3 = inRange(1, 5, 2); // 最小値が最大値以上の場合、エラーが発生します。
```
