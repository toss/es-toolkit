# bindAll

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトのメソッドをオブジェクト自身にバインドし、既存のメソッドを上書きします。メソッド名は個別の引数または配列として指定できます。

## インターフェース

```typescript
function bindAll(
  object: Record<string, any>,
  ...methodNames: Array<string | string[] | number | IArguments>
): Record<string, any>;
```

### パラメータ

- `object` (`Object`): メソッドをバインドするオブジェクト
- `methodNames` (`...(string|string[]|number|IArguments)`): バインドするメソッド名。以下の形式で指定可能:
  - 個別のメソッド名の文字列
  - メソッド名の配列
  - 数値（`-0`は特別に処理）
  - Arguments オブジェクト

### 戻り値

(`Object`): メソッドがバインドされたオブジェクト

## 例

```typescript
const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

bindAll(view, ['click']);
jQuery(element).on('click', view.click);
// => クリック時に 'clicked docs' がログ出力される

// 個別のメソッド名を使用
bindAll(view, 'click');
// => 上記と同じ結果

// 数値キーの処理
const obj = {
  '-0': function () {
    return -2;
  },
  '0': function () {
    return -1;
  },
};
bindAll(obj, -0);
obj['-0'](); // => -2
```
