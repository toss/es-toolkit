import { ChildProcess, spawn, SpawnOptions } from 'node:child_process';
import { normalize as normalizePath } from 'node:path';
import { Readable } from 'node:stream';

interface ExecOptions {
  signal?: AbortSignal;
  timeout?: number;
  stdin?: string;
  spawnOptions?: SpawnOptions;
  throwOnNonZeroExitCode?: boolean;
}

interface ExecResult {
  pid: number | undefined;
  stderr: string;
  stdout: string;
  exitCode: number | null;
}

/**
 * Executes a command and captures its output.
 *
 * This function spawns a child process, collects its stdout and stderr, and resolves with the
 * process result when execution finishes. By default, it throws an {@link ExecError} when the
 * process exits with a non-zero exit code.
 *
 * @param {string} _command - The command to execute.
 * @param {string[]} args - The arguments passed to the command.
 * @param {ExecOptions} options - The options object.
 * @param {AbortSignal} options.signal - An optional AbortSignal used to abort the process.
 * @param {number} options.timeout - An optional timeout in milliseconds. When provided, the
 * process is aborted after the timeout expires.
 * @param {string} options.stdin - An optional string written to the process stdin.
 * @param {SpawnOptions} options.spawnOptions - Additional options forwarded to `child_process.spawn`.
 * @param {boolean} options.throwOnNonZeroExitCode - Whether to throw an {@link ExecError} when the
 * process exits with a non-zero exit code. Defaults to `true`.
 * @returns {Promise<ExecResult>} A promise that resolves with the process result.
 * @throws {ExecError} Throws when `throwOnNonZeroExitCode` is enabled and the process exits with a
 * non-zero exit code.
 *
 * @example
 * const result = await exec(process.execPath, ['-e', "process.stdout.write('hello')"]);
 *
 * console.log(result.stdout);
 * // => 'hello'
 *
 * @example
 * const result = await exec(process.execPath, ['-e', 'process.exit(2)'], {
 *   throwOnNonZeroExitCode: false,
 * });
 *
 * console.log(result.exitCode);
 * // => 2
 */
export async function exec(_command: string, args: string[] = [], options: ExecOptions = {}): Promise<ExecResult> {
  const command = normalizePath(_command);
  const signal = parseAbortSignal(options);

  const resolver = Promise.withResolvers<void>();

  const process = spawn(command, args, {
    windowsHide: true,
    ...options.spawnOptions,
    signal,
  });

  handleStdin(process, options);

  process.once('close', () => {
    resolver.resolve();
  });
  process.once('error', error => {
    resolver.reject(error);
  });

  const stdoutPromise = process.stdout != null ? streamToString(process.stdout) : Promise.resolve('');
  const stderrPromise = process.stderr != null ? streamToString(process.stderr) : Promise.resolve('');

  await resolver.promise;

  const stdout = await stdoutPromise;
  const stderr = await stderrPromise;

  const throwOnNonZeroExitCode = options.throwOnNonZeroExitCode ?? true;

  if (throwOnNonZeroExitCode && process.exitCode !== 0) {
    throw new ExecError({
      pid: process.pid,
      stdout,
      stderr,
      exitCode: process.exitCode,
    });
  }

  return {
    pid: process.pid,
    stdout,
    stderr,
    exitCode: process.exitCode,
  };
}

/**
 * Represents an error thrown when a process exits with a non-zero exit code.
 *
 * @param {ExecResult} result - The captured process result.
 */
export class ExecError extends Error {
  constructor(public readonly result: ExecResult) {
    super(`Process exited with non-zero exit code (${result.exitCode})`);
    this.name = 'ExecError';
  }
}

async function streamToString(stream: Readable) {
  return Buffer.concat(await stream.toArray()).toString('utf-8');
}

function handleStdin(process: ChildProcess, options: ExecOptions) {
  if (options.stdin == null) {
    return;
  }

  if (typeof options.stdin === 'string') {
    process.stdin?.end(options.stdin);
  }
}

function parseAbortSignal(options: ExecOptions): AbortSignal | undefined {
  const signals: AbortSignal[] = [];

  if (options.signal != null) {
    signals.push(options.signal);
  }

  if (options.timeout != null) {
    signals.push(AbortSignal.timeout(options.timeout));
  }

  if (options.spawnOptions?.signal != null) {
    signals.push(options.spawnOptions.signal);
  }

  if (signals.length === 0) {
    return undefined;
  }

  return AbortSignal.any(signals);
}
