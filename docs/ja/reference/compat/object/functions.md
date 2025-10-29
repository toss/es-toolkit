# functions (Lodash 互換性)

::: warning `Object.keys` と `typeof` チェックを使用してください

この `functions` 関数は内部的に `keys` 関数とフィルタリング処理を経由するため、動作が遅くなります。

代わりに、より高速で現代的な `Object.keys` と `typeof` チェックを使用してください。

:::

オブジェクトの固有プロパティのうち、関数であるプロパティの名前を配列として返します。

```typescript
const functionNames = functions(obj);
```

## 参照

### `functions(object)`

オブジェクトの固有プロパティを確認し、関数であるプロパティの名前のみを配列として返します。継承されたプロパティや `Symbol` キーを除外し、オブジェクトが直接所有する文字列キープロパティのみを確認します。オブジェクトのメソッドを見つけたり、関数プロパティのみを個別に処理したりする際に便利です。

```typescript
import { functions } from 'es-toolkit/compat';

// 基本的な使い方
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functions(obj);
// 結果: ['greet', 'calculate']

// クラスインスタンスで関数を探す
class Calculator {
  constructor() {
    this.value = 0;
    this.add = function (n) {
      this.value += n;
    };
  }

  multiply(n) {
    this.value *= n;
  }
}

Calculator.prototype.divide = function (n) {
  this.value /= n;
};

const calc = new Calculator();
const methods = functions(calc);
// 結果: ['add'] (継承された multiply、divide は除外)

// 関数がないオブジェクト
const data = { x: 1, y: 2, z: 'text' };
const noFunctions = functions(data);
// 結果: []
```

`null` または `undefined` は空の配列として処理されます。

```typescript
import { functions } from 'es-toolkit/compat';

functions(null); // []
functions(undefined); // []
```

#### パラメータ

- `object` (`any`): 確認するオブジェクトです。

#### 戻り値

(`string[]`): 関数であるプロパティの名前で構成された配列を返します。
