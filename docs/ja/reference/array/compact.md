# compact

偽と評価される値である `false`、`null`、`0`、`''`、`undefined`、`NaN` を除去した新しい配列を返します。

## インターフェース

```typescript
function compact<T>(arr: T[]): Array<Exclude<T, false | null | 0 | '' | undefined>>;
```

### パラメータ

- `arr` (`T[]`): 偽と評価される値を除去する配列。

### 戻り値

(`Array<Exclude<T, false | null | 0 | '' | undefined>>`): 偽と評価される値をすべて除去した新しい配列。

## 例

```typescript
compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// 戻り値: [1, 2, 3, 4, 5]
```
