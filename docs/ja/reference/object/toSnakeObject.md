# toSnakeObject

オブジェクトのキーをスネークケース（snake_case）に変換します。

この関数は元のオブジェクトを変更しません。

## インターフェース

```typescript
function toSnakeObject<T extends Record<PropertyKey, any>>(obj: T): Record<string, any>;
```

### パラメータ

- `obj` (`T`): キーをスネークケースに変換するオブジェクト。

### 戻り値

(`Record<string, any>`): キーがスネークケースに変換された新しいオブジェクト。

## 例

```typescript
const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
// 出力: {
//   first_name: 'Gweesin',
//   last_name: 'Chan',
//   contact_info: {
//     email_address: 'john@example.com',
//     phone_number: '123-456-7890'
//   }
// }
```

## 説明

`toSnakeObject` 関数は、オブジェクトおよびそのネストされたオブジェクトのすべてのキーを再帰的にスネークケースに変換します。この関数は、どの深さのネストされたオブジェクトにも適用可能で、元のオブジェクトを変更しません。

## デモ

::: sandpack

```ts index.ts
import { toSnakeObject } from 'es-toolkit';

const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
```

:::
