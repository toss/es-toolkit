# exec

Executes a command and captures its stdout and stderr.

```typescript
const result = await exec(command, args, options);
```

## Usage

### `exec(command, args, options?)`

Use `exec` when you want to spawn a child process, wait for it to finish, and collect its output. By default, it throws an [ExecError](#execerror) if the process exits with a non-zero exit code.

```typescript
import { exec } from 'es-toolkit/node';

// Run a command and read its stdout.
const result = await exec(process.execPath, ['-e', "process.stdout.write('hello')"]);

console.log(result.stdout);
// => 'hello'
console.log(result.exitCode);
// => 0
```

You can disable throwing and inspect the exit code directly.

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.exit(2)'], {
  throwOnNonZeroExitCode: false,
});

console.log(result.exitCode);
// => 2
```

You can write a string to the process's stdin.

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.stdin.pipe(process.stdout)'], {
  stdin: 'hello\nworld',
});

console.log(result.stdout);
// => 'hello\nworld'
```

You can abort the process using an `AbortSignal` or a timeout.

```typescript
import { exec } from 'es-toolkit/node';

const controller = new AbortController();
setTimeout(() => controller.abort(), 50);

// Rejects with an AbortError.
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  signal: controller.signal,
});

// Rejects with an AbortError after 50ms.
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  timeout: 50,
});
```

#### Parameters

- `command` (`string`): The command to execute.
- `args` (`string[]`, optional): The arguments passed to the command. Defaults to `[]`.
- `options` (`ExecOptions`, optional): The options object.
  - `signal` (`AbortSignal`, optional): An `AbortSignal` used to abort the process.
  - `timeout` (`number`, optional): A timeout in milliseconds. The process is aborted when the timeout expires.
  - `stdin` (`string`, optional): A string written to the process stdin.
  - `spawnOptions` (`SpawnOptions`, optional): Additional options forwarded to `child_process.spawn`.
  - `throwOnNonZeroExitCode` (`boolean`, optional): Whether to throw `ExecError` when the process exits with a non-zero exit code. Defaults to `true`.

#### Returns

(`Promise<ExecResult>`): A promise that resolves with the process result.

- `pid` (`number | undefined`): The PID of the spawned process.
- `stdout` (`string`): The captured stdout.
- `stderr` (`string`): The captured stderr.
- `exitCode` (`number | null`): The exit code of the process.

#### Throws

Throws an `ExecError` when `throwOnNonZeroExitCode` is `true` and the process exits with a non-zero exit code.

### `ExecError`

An error thrown by `exec` when a process exits with a non-zero exit code. It has a `result` property that holds the captured process result.

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
