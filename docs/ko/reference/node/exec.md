# exec

명령어를 실행하고 표준 출력(stdout)과 표준 에러(stderr)를 캡처해요.

```typescript
const result = await exec(command, args, options);
```

## 사용법

### `exec(command, args, options?)`

자식 프로세스를 생성하고 실행이 끝날 때까지 기다린 뒤, 그 출력을 수집하고 싶을 때 `exec`를 사용해요. 기본적으로 프로세스가 0이 아닌 종료 코드로 종료되면 [ExecError](#execerror)를 던져요.

```typescript
import { exec } from 'es-toolkit/node';

// 명령어를 실행하고 stdout을 읽어요.
const result = await exec(process.execPath, ['-e', "process.stdout.write('hello')"]);

console.log(result.stdout);
// => 'hello'
console.log(result.exitCode);
// => 0
```

예외를 던지지 않게 설정하고 종료 코드를 직접 확인할 수도 있어요.

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.exit(2)'], {
  throwOnNonZeroExitCode: false,
});

console.log(result.exitCode);
// => 2
```

프로세스의 stdin으로 문자열을 전달할 수 있어요.

```typescript
import { exec } from 'es-toolkit/node';

const result = await exec(process.execPath, ['-e', 'process.stdin.pipe(process.stdout)'], {
  stdin: 'hello\nworld',
});

console.log(result.stdout);
// => 'hello\nworld'
```

`AbortSignal`이나 타임아웃을 사용해서 프로세스를 중단시킬 수 있어요.

```typescript
import { exec } from 'es-toolkit/node';

const controller = new AbortController();
setTimeout(() => controller.abort(), 50);

// AbortError로 reject돼요.
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  signal: controller.signal,
});

// 50ms 이후 AbortError로 reject돼요.
await exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
  timeout: 50,
});
```

#### 파라미터

- `command` (`string`): 실행할 명령어예요.
- `args` (`string[]`, 선택): 명령어에 전달할 인자들이에요. 기본값은 `[]`예요.
- `options` (`ExecOptions`, 선택): 옵션 객체예요.
  - `signal` (`AbortSignal`, 선택): 프로세스를 중단시키는 데 사용할 `AbortSignal`이에요.
  - `timeout` (`number`, 선택): 밀리초 단위의 타임아웃이에요. 타임아웃이 만료되면 프로세스가 중단돼요.
  - `stdin` (`string`, 선택): 프로세스의 stdin에 쓸 문자열이에요.
  - `spawnOptions` (`SpawnOptions`, 선택): `child_process.spawn`에 그대로 전달되는 추가 옵션이에요.
  - `throwOnNonZeroExitCode` (`boolean`, 선택): 프로세스가 0이 아닌 종료 코드로 종료되었을 때 `ExecError`를 던질지 여부예요. 기본값은 `true`예요.

#### 반환 값

(`Promise<ExecResult>`): 프로세스 결과로 resolve되는 Promise예요.

- `pid` (`number | undefined`): 생성된 프로세스의 PID예요.
- `stdout` (`string`): 캡처된 stdout이에요.
- `stderr` (`string`): 캡처된 stderr이에요.
- `exitCode` (`number | null`): 프로세스의 종료 코드예요.

#### 에러

`throwOnNonZeroExitCode`가 `true`이고 프로세스가 0이 아닌 종료 코드로 종료되면 `ExecError`를 던져요.

### `ExecError`

프로세스가 0이 아닌 종료 코드로 종료되었을 때 `exec`가 던지는 에러예요. 캡처된 프로세스 결과를 담는 `result` 속성을 가지고 있어요.

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
