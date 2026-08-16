# deepFreeze

オブジェクトと、その中にネストされたすべてのオブジェクトと配列を再帰的に凍結して、変更できないようにします。

```typescript
const frozen = deepFreeze(obj);
```

## 使用法

### `deepFreeze(obj)`

オブジェクトを完全に変更できないようにしたい時に `deepFreeze` を使用してください。`Object.freeze` はオブジェクトの最上位のプロパティだけを凍結するため、ネストされたオブジェクトは変更できてしまいます。`deepFreeze` はネストされたオブジェクトと配列もすべて再帰的に凍結するので、どの深さでも値を変更できなくなります。

オブジェクトはその場で凍結され、同じ参照がそのまま返されます。すでに凍結されたオブジェクトはスキップされるため、循環参照があっても安全に処理されます。

```typescript
import { deepFreeze } from 'es-toolkit/object';

// ネストされたオブジェクトも凍結されます
const user = deepFreeze({ name: 'Alex', settings: { theme: 'dark' } });
user.settings.theme = 'light'; // strictモードではTypeErrorが発生します
// user.settingsは依然として{ theme: 'dark' }です

// 配列と配列内のオブジェクトも凍結されます
const config = deepFreeze({ tags: ['admin', 'user'] });
config.tags.push('guest'); // strictモードではTypeErrorが発生します
```

#### パラメータ

- `obj` (`T`): 深く凍結するオブジェクトです。

#### 戻り値

(`T`): 自分自身とネストされたすべてのオブジェクトと配列が凍結された、同じオブジェクトを返します。
