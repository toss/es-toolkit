// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { detectColorLevel } from './colorLevel.ts';

describe('detectColorLevel', () => {
  const originalEnv = { ...process.env };
  const originalIsTTY = process.stdout.isTTY;
  const originalPlatform = process.platform;

  beforeEach(() => {
    delete process.env.FORCE_COLOR;
    delete process.env.NO_COLOR;
    delete process.env.COLORTERM;
    delete process.env.TERM;
    delete process.env.CI;
    delete process.env.WT_SESSION;
    delete process.env.ConEmuANSI;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    Object.defineProperty(process.stdout, 'isTTY', { value: originalIsTTY, writable: true });
    Object.defineProperty(process, 'platform', { value: originalPlatform });
  });

  function setTTY(value: boolean) {
    Object.defineProperty(process.stdout, 'isTTY', { value, writable: true });
  }

  function setPlatform(value: string) {
    Object.defineProperty(process, 'platform', { value });
  }

  it('should disable colors when FORCE_COLOR is "0"', () => {
    process.env.FORCE_COLOR = '0';
    expect(detectColorLevel()).toBe(0);
  });

  it('should disable colors when FORCE_COLOR is "false"', () => {
    process.env.FORCE_COLOR = 'false';
    expect(detectColorLevel()).toBe(0);
  });

  it('should return level 1 when FORCE_COLOR is "1"', () => {
    process.env.FORCE_COLOR = '1';
    expect(detectColorLevel()).toBe(1);
  });

  it('should ignore FORCE_COLOR when it is an empty string', () => {
    process.env.FORCE_COLOR = '';
    setTTY(false);
    expect(detectColorLevel()).toBe(0);

    setTTY(true);
    expect(detectColorLevel()).toBe(1);
  });

  it('should return level 2 when FORCE_COLOR is "2"', () => {
    process.env.FORCE_COLOR = '2';
    expect(detectColorLevel()).toBe(2);
  });

  it('should return level 3 when FORCE_COLOR is "3"', () => {
    process.env.FORCE_COLOR = '3';
    expect(detectColorLevel()).toBe(3);
  });

  it('should default to level 1 for unknown FORCE_COLOR values like "true"', () => {
    process.env.FORCE_COLOR = 'true';
    expect(detectColorLevel()).toBe(1);
  });

  it('should let FORCE_COLOR override NO_COLOR', () => {
    process.env.FORCE_COLOR = '3';
    process.env.NO_COLOR = '1';
    expect(detectColorLevel()).toBe(3);
  });

  it('should let FORCE_COLOR=0 override COLORTERM=truecolor', () => {
    process.env.FORCE_COLOR = '0';
    process.env.COLORTERM = 'truecolor';
    expect(detectColorLevel()).toBe(0);
  });

  it('should disable colors when NO_COLOR is set to a non-empty value', () => {
    process.env.NO_COLOR = '1';
    setTTY(true);
    expect(detectColorLevel()).toBe(0);
  });

  it('should ignore NO_COLOR when it is an empty string', () => {
    process.env.NO_COLOR = '';
    setTTY(true);
    expect(detectColorLevel()).toBe(1);
  });

  it('should disable colors when stdout is not a TTY', () => {
    setTTY(false);
    expect(detectColorLevel()).toBe(0);
  });

  it('should disable colors in CI when stdout is not a TTY', () => {
    process.env.CI = 'true';
    setTTY(false);
    expect(detectColorLevel()).toBe(0);
  });

  it('should return level 3 when COLORTERM is "truecolor" or "24bit"', () => {
    setTTY(true);

    process.env.COLORTERM = 'truecolor';
    expect(detectColorLevel()).toBe(3);

    process.env.COLORTERM = '24bit';
    expect(detectColorLevel()).toBe(3);
  });

  it('should return level 2 when TERM contains "256color"', () => {
    setTTY(true);
    process.env.TERM = 'xterm-256color';
    expect(detectColorLevel()).toBe(2);
  });

  it('should return level 1 when TERM does not indicate extended color support', () => {
    setTTY(true);
    process.env.TERM = 'xterm';
    expect(detectColorLevel()).toBe(1);
  });

  it('should return level 3 for Windows Terminal (WT_SESSION)', () => {
    setTTY(true);
    setPlatform('win32');
    process.env.WT_SESSION = 'some-id';
    expect(detectColorLevel()).toBe(3);
  });

  it('should return level 3 for ConEmu with ANSI mode on Windows', () => {
    setTTY(true);
    setPlatform('win32');
    process.env.ConEmuANSI = 'ON';
    expect(detectColorLevel()).toBe(3);
  });

  it('should return level 1 for a plain Windows terminal', () => {
    setTTY(true);
    setPlatform('win32');
    expect(detectColorLevel()).toBe(1);
  });

  it('should use hasColors() to detect truecolor and 256 support', () => {
    setTTY(true);
    Object.defineProperty(process.stdout, 'hasColors', {
      value: (n: number) => n <= 16_777_216,
      configurable: true,
    });
    expect(detectColorLevel()).toBe(3);

    Object.defineProperty(process.stdout, 'hasColors', {
      value: (n: number) => n <= 256,
      configurable: true,
    });
    expect(detectColorLevel()).toBe(2);

    Object.defineProperty(process.stdout, 'hasColors', {
      value: (n: number) => n <= 16,
      configurable: true,
    });
    expect(detectColorLevel()).toBe(1);

    delete (process.stdout as any).hasColors;
  });

  it('should return level 1 when stdout is a TTY with no special env vars', () => {
    setTTY(true);
    expect(detectColorLevel()).toBe(1);
  });

  it('should return level 0 when process is not defined', () => {
    const original = globalThis.process;
    delete (globalThis as any).process;
    try {
      expect(detectColorLevel()).toBe(0);
    } finally {
      globalThis.process = original;
    }
  });
});
