# es-toolkit/server

`es-toolkit/server` is a utility module for server runtimes that provide Node.js-compatible APIs, such as Node.js, Deno, and Bun. It offers small APIs for tasks that look simple but are tedious to implement every time, such as running processes or styling terminal output.

Like other `es-toolkit` modules, it ships with TypeScript types and keeps a small, predictable interface with only the necessary features.

```typescript
import { colors, exec } from 'es-toolkit/server';

const result = await exec('git', ['status', '--short'], {
  throwOnNonZeroExitCode: false,
});

if (result.stdout.trim().length === 0) {
  console.log(colors.green('Working tree is clean.'));
} else {
  console.log(colors.yellow(result.stdout.trim()));
}
```

## Runtime support

Unlike `es-toolkit` and `es-toolkit/compat`, `es-toolkit/server` can only be used in Node.js-compatible server runtimes. It cannot be used in environments that do not provide Node.js APIs such as `node:child_process`, including browsers and React Native.

If you need array, object, string, or Promise utilities that also work in browsers, use [`es-toolkit`](/intro). If you are migrating existing Lodash code without changing call sites, use [`es-toolkit/compat`](/compat/intro).
