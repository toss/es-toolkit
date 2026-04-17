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

export async function exec(_command: string, args: string[] = [], options: ExecOptions = {}): Promise<ExecResult> {
  const command = normalizePath(_command);
  const signal = parseAbortSignal(options);

  const resolver = Promise.withResolvers<void>();

  const process = spawn(command, args, {
    windowsHide: true,
    ...options.spawnOptions,
    signal,
  });

  const stdoutPromise = process.stdout != null ? streamToString(process.stdout) : Promise.resolve('');
  const stderrPromise = process.stderr != null ? streamToString(process.stderr) : Promise.resolve('');

  process.once('close', resolver.resolve);
  process.once('error', error => {
    resolver.reject(error);
  });

  handleStdin(process, options);

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
