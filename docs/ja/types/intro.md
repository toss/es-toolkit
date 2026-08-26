# es-toolkit/types

`es-toolkit/types` は、TypeScript が標準では提供しない**コンパイル時の型ユーティリティ**をまとめたモジュールです。ランタイムコードを一切含まない宣言専用（declaration-only）モジュールなので、値ではなく型だけをインポートして使います。

```typescript
import type { DeepPartial, ValueOf } from 'es-toolkit/types';
```

## 含まれるもの

TypeScript に用意されていないために毎回自分で書いていた型だけを厳選して収録しました。

| 型                                                           | 説明                                                                                    |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [`ValueOf<T>`](./reference/ValueOf.md)                       | オブジェクトの値の型のユニオンを作ります。`keyof` の値版です。                          |
| [`Simplify<T>`](./reference/Simplify.md)                     | 交差型やマップ型を 1 つの読みやすいオブジェクト型に平坦化します。                       |
| [`Writable<T>`](./reference/Writable.md)                     | すべてのプロパティから `readonly` を外します。組み込みの `Readonly` の逆です。          |
| [`NonEmptyArray<T>`](./reference/NonEmptyArray.md)           | 少なくとも 1 つ以上の要素を持つ配列です。                                               |
| [`DeepPartial<T>`](./reference/DeepPartial.md)               | ネストしたオブジェクトの内側まで再帰的にすべて省略可能にします。                        |
| [`DeepReadonly<T>`](./reference/DeepReadonly.md)             | ネストしたオブジェクトの内側まで再帰的にすべて `readonly` にします。                    |
| [`IsEqual<A, B>`](./reference/IsEqual.md)                    | 2 つの型が完全に同じかどうかを判定します。                                              |
| [`Primitive`](./reference/Primitive.md)                      | JavaScript のすべてのプリミティブ値をまとめたユニオンです。                             |
| [`JsonValue`](./reference/JsonValue.md)                      | `JSON.parse` が生成しうるすべての値です。                                               |
| [`UnknownRecord`](./reference/UnknownRecord.md)              | キーも値も分からないオブジェクトです。`{}` の代わりに使います。                         |
| [`ToCamelCaseKeys<T>`](./reference/ToCamelCaseKeys.md)       | すべてのキーを再帰的にキャメルケースに変換します。`toCamelCaseKeys` の戻り値の型です。  |
| [`ToSnakeCaseKeys<T>`](./reference/ToSnakeCaseKeys.md)       | すべてのキーを再帰的にスネークケースに変換します。`toSnakeCaseKeys` の戻り値の型です。  |
| [`ToPascalCaseKeys<T>`](./reference/ToPascalCaseKeys.md)     | すべてのキーを再帰的にパスカルケースに変換します。`toPascalCaseKeys` の戻り値の型です。 |
| [`ToKebabCaseKeys<T>`](./reference/ToKebabCaseKeys.md)       | すべてのキーを再帰的にケバブケースに変換します。`toKebabCaseKeys` の戻り値の型です。    |
| [`ToConstantCaseKeys<T>`](./reference/ToConstantCaseKeys.md) | すべてのキーを再帰的に定数ケースに変換します。`toConstantCaseKeys` の戻り値の型です。   |

## 選定基準

TypeScript がすでに提供しているものは追加していません。近いものが標準にあればそれを使うほうがよく（`Partial`、`Omit`、`NonNullable` など）、本当に欠けているものだけを補いました。補う場合も、標準の型と揃うように設計しています。たとえば `ValueOf` は `keyof` と対になるようにしています。

## コントリビュート

必要な型がここにない場合は、いつでも [Issue](https://github.com/toss/es-toolkit/issues/new) を立てるか、直接コントリビュートしてください。コントリビュートの際は、その型が**どんな場面で必要か**、**どれくらいよく使うパターンか**を一緒に書いていただけると、上記の選定基準を判断するうえで大きな助けになります。
