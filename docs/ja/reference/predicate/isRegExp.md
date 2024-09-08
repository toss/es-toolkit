# isRegExp

`value`が正規表現かをチェックします。


## インターフェース

```typescript
function isRegExp(value: unknown): value is RegExp;
```

### パラメータ

- `value` (`unknown`) チェックする値ます。

### 戻り値

(`boolean`): `value`が正規表現であれば`true`を、そうでなければ`false`を返ししますます。