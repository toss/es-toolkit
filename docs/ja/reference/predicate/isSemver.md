# isSemver

주어진 문자열이 [시マン틱 버전 2.0.0](https://semver.org/) 규격에 맞는 유효한 시맨틱 버전인지確認します。

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
