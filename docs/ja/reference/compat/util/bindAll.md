# bindAll (Lodash 互換性)

オブジェクトのメソッドをオブジェクト自身にバインドします。

```typescript
const boundObject = bindAll(object, methodNames);
```

## 参照

### `bindAll(object, ...methodNames)`

オブジェクトの特定のメソッドの`this`値を該当オブジェクトに固定したい時に`bindAll`を使用してください。イベントハンドラーやコールバック関数としてメソッドを渡す際に`this`コンテキストを維持するのに役立ちます。

```typescript
import { bindAll } from 'es-toolkit/compat';

const view = {
  label: 'docs',
  click: function () {
    console.log('clicked ' + this.label);
  },
};

// メソッドをオブジェクトにバインド
bindAll(view, 'click');
document.addEventListener('click', view.click);
// => クリック時 'clicked docs' 出力
```

複数のメソッドを一度にバインドできます。

```typescript
import { bindAll } from 'es-toolkit/compat';

const obj = {
  name: 'example',
  greet() {
    return `Hello, ${this.name}!`;
  },
  farewell() {
    return `Goodbye, ${this.name}!`;
  },
};

// 配列で複数のメソッドをバインド
bindAll(obj, ['greet', 'farewell']);

const greet = obj.greet;
greet(); // 'Hello, example!' (thisが正しくバインドされました)
```

数値や特殊キーも処理できます。

```typescript
import { bindAll } from 'es-toolkit/compat';

const obj = {
  '-0': function () {
    return 'negative zero';
  },
  '0': function () {
    return 'zero';
  },
};

bindAll(obj, -0);
obj['-0'](); // 'negative zero'
```

#### パラメータ

- `object` (`Object`): メソッドをバインドするオブジェクトです。
- `methodNames` (`...(string | string[] | number | IArguments)`): バインドするメソッド名です。個別の文字列、配列、数値、Arguments オブジェクトで指定できます。

#### 戻り値

(`Object`): メソッドがバインドされた元のオブジェクトを返します。
