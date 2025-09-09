# bindAll

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

オブジェクトのメソッドを、指定された名前に基づいてオブジェクト自身に紐付けます。メソッド名は引数として提供できます。

## インターフェース

```typescript
function bindAll<T>(object: T, ...methodNames: Array<string | string[]>): T;
```

### パラメータ

- `object` (`T`): メソッドをバインドするオブジェクト
- `methodNames` (`...(string | string[])`): バインドするメソッド名。

### 戻り値

(`T`): メソッドがバインドされたオブジェクト

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
