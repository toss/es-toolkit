# es-toolkit/types

`es-toolkit/types` is a module of **compile-time type utilities** that TypeScript doesn't provide out of the box. It's a declaration-only module with no runtime code, so you import only types, not values.

```typescript
import type { DeepPartial, ValueOf } from 'es-toolkit/types';
```

## What's included

We picked only the types you'd otherwise have to write by hand because TypeScript doesn't ship them.

| Type                                                         | Description                                                                               |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| [`ValueOf<T>`](./reference/ValueOf.md)                       | Creates a union of an object's value types. The value-side counterpart to `keyof`.        |
| [`Simplify<T>`](./reference/Simplify.md)                     | Flattens an intersection or mapped type into a single, readable object type.              |
| [`Writable<T>`](./reference/Writable.md)                     | Removes `readonly` from all properties. The inverse of the built-in `Readonly`.           |
| [`NonEmptyArray<T>`](./reference/NonEmptyArray.md)           | An array with at least one element.                                                       |
| [`DeepPartial<T>`](./reference/DeepPartial.md)               | Makes every property optional recursively, including nested objects.                      |
| [`DeepReadonly<T>`](./reference/DeepReadonly.md)             | Makes every property `readonly` recursively, including nested objects.                    |
| [`IsEqual<A, B>`](./reference/IsEqual.md)                    | Resolves to `true` when two types are exactly the same.                                   |
| [`Primitive`](./reference/Primitive.md)                      | A union of every primitive value in JavaScript.                                           |
| [`ToCamelCaseKeys<T>`](./reference/ToCamelCaseKeys.md)       | Converts every key to camelCase recursively. The return type of `toCamelCaseKeys`.        |
| [`ToSnakeCaseKeys<T>`](./reference/ToSnakeCaseKeys.md)       | Converts every key to snake_case recursively. The return type of `toSnakeCaseKeys`.       |
| [`ToPascalCaseKeys<T>`](./reference/ToPascalCaseKeys.md)     | Converts every key to PascalCase recursively. The return type of `toPascalCaseKeys`.      |
| [`ToKebabCaseKeys<T>`](./reference/ToKebabCaseKeys.md)       | Converts every key to kebab-case recursively. The return type of `toKebabCaseKeys`.       |
| [`ToConstantCaseKeys<T>`](./reference/ToConstantCaseKeys.md) | Converts every key to CONSTANT_CASE recursively. The return type of `toConstantCaseKeys`. |

## Selection criteria

We didn't add anything TypeScript already gives you. If something comparable exists natively, use it (`Partial`, `Omit`, `NonNullable`, …) — we only fill genuine gaps. And when we do, we shape it to match the native types. For example, `ValueOf` mirrors `keyof`.

## Contributing

If a type you need isn't here, feel free to [open an issue](https://github.com/toss/es-toolkit/issues/new) or contribute it directly. When contributing, it helps to include **where the type is needed** and **how common the pattern is** — that's a big help in judging it against the selection criteria above.
