# exec

执行命令并捕获其标准输出(stdout)和标准错误(stderr)。

```typescript
const result = await exec(command, args, options);
```

## 用法

### `exec(command, args, options?)`

当你想要启动一个子进程,等待其执行完成并收集其输出时,使用 `exec`。默认情况下,如果进程以非零退出码退出,它会抛出 [ExecError](#execerror)。

```typescript
import { exec } from 'es-toolkit/node';

// 执行命令并读取其 stdout。
const result = await exec(process.execPath, ['-e', "process.stdout.write('hello')"]);

console.log(result.stdout);
// => 'hello'
console.log(result.exitCode);
// => 0
```

你可以禁用抛出异常并直接检查退出码。

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.exit(2)'], {
  throwOnNonZeroExitCode: false,
});

console.log(result.exitCode);
// => 2
```

你可以向进程的 stdin 写入字符串。

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.stdin.pipe(process.stdout)'], {
  stdin: 'hello\nworld',
});

console.log(result.stdout);
// => 'hello\nworld'
```

你可以使用 `AbortSignal` 或超时来中断进程。

```typescript
import { exec } from 'es-toolkit/node';

const controller = new AbortController();
setTimeout(() => controller.abort(), 50);

// 以 AbortError 被 reject。
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  signal: controller.signal,
});

// 50ms 后以 AbortError 被 reject。
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  timeout: 50,
});
```

#### 参数

- `command` (`string`): 要执行的命令。
- `args` (`string[]`, 可选): 传递给命令的参数。默认为 `[]`。
- `options` (`ExecOptions`, 可选): 选项对象。
  - `signal` (`AbortSignal`, 可选): 用于中断进程的 `AbortSignal`。
  - `timeout` (`number`, 可选): 以毫秒为单位的超时时间。超时过期时进程被中断。
  - `stdin` (`string`, 可选): 写入进程 stdin 的字符串。
  - `spawnOptions` (`SpawnOptions`, 可选): 转发给 `child_process.spawn` 的额外选项。
  - `throwOnNonZeroExitCode` (`boolean`, 可选): 当进程以非零退出码退出时是否抛出 `ExecError`。默认为 `true`。

#### 返回值

(`Promise<ExecResult>`): 以进程结果 resolve 的 Promise。

- `pid` (`number | undefined`): 启动的进程的 PID。
- `stdout` (`string`): 捕获的 stdout。
- `stderr` (`string`): 捕获的 stderr。
- `exitCode` (`number | null`): 进程的退出码。

#### 异常

当 `throwOnNonZeroExitCode` 为 `true` 且进程以非零退出码退出时,抛出 `ExecError`。

### `ExecError`

当进程以非零退出码退出时,`exec` 抛出的错误。它具有一个 `result` 属性,用于保存捕获的进程结果。

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
