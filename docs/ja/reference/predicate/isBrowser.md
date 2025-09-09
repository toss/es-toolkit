# isBrowser

現在の環境がブラウザかどうかを確認します。

この関数は、ブラウザ環境にのみ存在する`window.document`プロパティの存在を確認します。

## インターフェース

```typescript
function isBrowser(): boolean;
```

### 戻り値

(`boolean`): 現在の環境がブラウザの場合は`true`、そうでない場合は`false`を返します。

## 例

```typescript
if (isBrowser()) {
  console.log('ブラウザで実行中です');
  document.getElementById('app').innerHTML = 'Hello World';
}
```
