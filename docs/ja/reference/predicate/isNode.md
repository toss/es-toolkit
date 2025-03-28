# isNode

現在の環境がNode.jsかどうかを確認します。

この関数は、Node.js環境にのみ存在する`process.versions.node`プロパティの存在を確認します。

## インターフェース

```typescript
function isNode(): boolean;
```

### 戻り値

(`boolean`): 現在の環境がNode.jsの場合は`true`、そうでない場合は`false`を返します。

## 例

```typescript
if (isNode()) {
  console.log('这是在 Node.js 中运行');
  const fs = import('node:fs');
}
```
