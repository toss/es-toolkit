# pipe

指定された関数パイプラインをベース値から開始して実行し、最終結果を返します。

```typescript
const result = pipe(value, func1, func2);
```

## 使用法

### `pipe(value, ...funcs)`

複数の関数をパイプラインに連結してベース値に対して即座に実行したい場合は、`pipe`を使用します。ベース値は最初の関数の入力となり、各関数の戻り値は次の関数の入力になります。これは、関数呼び出しをネストしたり、複数の一時変数を使用したりせずにデータを変換するのに便利です。

```typescript
const double = (n: number) => n * 2;
const square = (n: number) => n * n;
const half = (n: number) => n / 2;
const numToStr = (n: number) => String(n);

// 最初に double(5) = 10
// 次に square(10) = 100
// 次に half(100) = 50
// 最後に numToStr(50) -> '50'
const result = pipe(5, double, square, half, numToStr);
// 戻り値: '50'
```

#### パラメータ

- `value` (`any`): ベース値です。
- `funcs` (`Array<(result: any) => any>`): 順番に実行する関数です。

#### 戻り値

(`any`): `funcs`の最後の関数の戻り値です。関数が渡されない場合は、`value`が直接返されます。
