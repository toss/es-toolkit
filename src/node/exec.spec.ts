import { describe, expect, it } from 'vitest';
import { exec, ExecError } from './exec';

describe('exec', () => {
  it('captures stdout', async () => {
    const result = await exec(process.execPath, ['-e', "process.stdout.write('foo\\n')"]);

    expect(result.stdout).toBe('foo\n');
    expect(result.stderr).toBe('');
    expect(result.exitCode).toBe(0);
  });

  it('captures stderr', async () => {
    const result = await exec(process.execPath, ['-e', "process.stderr.write('some error\\n')"]);

    expect(result.stdout).toBe('');
    expect(result.stderr).toBe('some error\n');
    expect(result.exitCode).toBe(0);
  });

  it('sets exitCode for non-zero exits when throwOnNonZeroExitCode is false', async () => {
    const result = await exec(process.execPath, ['-e', 'process.exit(2)'], {
      throwOnNonZeroExitCode: false,
    });

    expect(result.stdout).toBe('');
    expect(result.stderr).toBe('');
    expect(result.exitCode).toBe(2);
  });

  it('throws when exitCode is non-zero and throwOnNonZeroExitCode is true', async () => {
    try {
      await exec(process.execPath, ['-e', 'process.exit(1)'], {
        throwOnNonZeroExitCode: true,
      });
      expect.fail('Expected exec to throw');
    } catch (error: any) {
      expect(error).toBeInstanceOf(ExecError);
      expect(error.result.exitCode).toBe(1);
      expect(error.result.stdout).toBe('');
      expect(error.result.stderr).toBe('');
    }
  });

  it('supports stdin passed as a string', async () => {
    const result = await exec(process.execPath, ['-e', 'process.stdin.pipe(process.stdout)'], {
      stdin: 'foo\nbar',
    });

    expect(result.stdout).toBe('foo\nbar');
    expect(result.stderr).toBe('');
    expect(result.exitCode).toBe(0);
  });

  it('supports empty stdin strings', async () => {
    const result = await exec(
      process.execPath,
      ['-e', "process.stdout.write(String(require('node:fs').readFileSync(0, 'utf8').length))"],
      { stdin: '' }
    );

    expect(result.stdout).toBe('0');
    expect(result.stderr).toBe('');
    expect(result.exitCode).toBe(0);
  });

  it('rejects with ExecError when the command cannot be spawned', async () => {
    await expect(exec('NON_EXISTENT_COMMAND')).rejects.toMatchInlineSnapshot(
      `[Error: spawn NON_EXISTENT_COMMAND ENOENT]`
    );
  });

  it('rejects when aborted via signal', async () => {
    const controller = new AbortController();

    const promise = exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
      signal: controller.signal,
    });

    controller.abort();

    await expect(promise).rejects.toMatchInlineSnapshot(`[AbortError: The operation was aborted]`);
  });

  it('rejects when timing out', async () => {
    await expect(
      exec(process.execPath, ['-e', 'setTimeout(() => {}, 1000)'], {
        timeout: 50,
      })
    ).rejects.toMatchInlineSnapshot(`[AbortError: The operation was aborted]`);
  });
});
