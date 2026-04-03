# deepFreeze

オブジェクトを深くフリーズし、すべてのネストされたオブジェクトを不変にします。

`Object.freeze`はオブジェクトの直接のプロパティのみをフリーズしますが、
`deepFreeze`はすべてのネストされたオブジェクトと配列を再帰的にフリーズします。

## インターフェース

```typescript
function deepFreeze<T>(obj: T): T;
```

### パラメータ

- `obj` (`T`): 深くフリーズするオブジェクト。

### 戻り値

(`T`): 深くフリーズされたオブジェクト。

## 例

```typescript
import { deepFreeze } from 'es-toolkit/object';

const frozen = deepFreeze({ user: { name: 'Alex', age: 20 } });

frozen.user = {}; // strictモードではTypeError
frozen.user.age = 22; // strictモードではTypeError
```
