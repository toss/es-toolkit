# isSemver

指定された文字列が [セマンティック バージョン 2.0.0](https://semver.org/) 仕様に従った有効なセマンティック バージョンであるかどうかを確認します。

## インターフェース

```typescript
function isSemver(value: unknown): boolean;
```

### パラメータ

- `value` (`unknown`): 有効なセマンティックバージョンかどうかをテストする値。

### パラメータ

(`boolean`): 値が有効なセマンティックバージョンの場合は `true`、そうでない場合は `false` を返します。

## 例

```typescript
const value1 = '1.0.0';
const value2 = '1.0.0-alpha+001';
const value3 = '1.0';

console.log(isSemver(value1)); // true
console.log(isSemver(value2)); // true
console.log(isSemver(value3)); // false
```
