# exec

コマンドを実行し、その標準出力(stdout)と標準エラー(stderr)をキャプチャします。

```typescript
const result = await exec(command, args, options);
```

## 使い方

### `exec(command, args, options?)`

子プロセスを起動して終了を待ち、その出力を収集したいときに `exec` を使用します。デフォルトでは、プロセスが0以外の終了コードで終了した場合、[ExecError](#execerror)をスローします。

```typescript
import { exec } from 'es-toolkit/node';

// コマンドを実行して stdout を読み取ります。
const result = await exec(process.execPath, ['-e', "process.stdout.write('hello')"]);

console.log(result.stdout);
// => 'hello'
console.log(result.exitCode);
// => 0
```

例外をスローしないように設定し、終了コードを直接確認することもできます。

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.exit(2)'], {
  throwOnNonZeroExitCode: false,
});

console.log(result.exitCode);
// => 2
```

プロセスの stdin に文字列を書き込むことができます。

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.stdin.pipe(process.stdout)'], {
  stdin: 'hello\nworld',
});

console.log(result.stdout);
// => 'hello\nworld'
```

`AbortSignal` やタイムアウトを使用してプロセスを中断できます。

```typescript
import { exec } from 'es-toolkit/node';

const controller = new AbortController();
setTimeout(() => controller.abort(), 50);

// AbortError で reject されます。
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  signal: controller.signal,
});

// 50ms 後に AbortError で reject されます。
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  timeout: 50,
});
```

#### パラメータ

- `command` (`string`): 実行するコマンドです。
- `args` (`string[]`, オプション): コマンドに渡される引数です。デフォルト値は `[]` です。
- `options` (`ExecOptions`, オプション): オプションオブジェクトです。
  - `signal` (`AbortSignal`, オプション): プロセスを中断するために使用する `AbortSignal` です。
  - `timeout` (`number`, オプション): ミリ秒単位のタイムアウトです。タイムアウトが切れるとプロセスが中断されます。
  - `stdin` (`string`, オプション): プロセスの stdin に書き込む文字列です。
  - `spawnOptions` (`SpawnOptions`, オプション): `child_process.spawn` にそのまま転送される追加オプションです。
  - `throwOnNonZeroExitCode` (`boolean`, オプション): プロセスが0以外の終了コードで終了した場合に `ExecError` をスローするかどうかです。デフォルト値は `true` です。

#### 戻り値

(`Promise<ExecResult>`): プロセスの結果で resolve される Promise です。

- `pid` (`number | undefined`): 起動したプロセスの PID です。
- `stdout` (`string`): キャプチャされた stdout です。
- `stderr` (`string`): キャプチャされた stderr です。
- `exitCode` (`number | null`): プロセスの終了コードです。

#### エラー

`throwOnNonZeroExitCode` が `true` で、プロセスが0以外の終了コードで終了した場合に `ExecError` をスローします。

### `ExecError`

プロセスが0以外の終了コードで終了したときに `exec` がスローするエラーです。キャプチャされたプロセス結果を保持する `result` プロパティを持ちます。

```typescript
import { exec, ExecError } from 'es-toolkit/node';

try {
  await exec(process.execPath, ['-e', 'process.exit(1)']);
} catch (error) {
  if (error instanceof ExecError) {
    console.log(error.result.exitCode);
    // => 1
    console.log(error.result.stdout);
    console.log(error.result.stderr);
  }
}
```
