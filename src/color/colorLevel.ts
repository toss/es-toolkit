import type { ColorLevel } from './types.ts';

const FORCE_COLOR_MAP: Record<string, ColorLevel> = {
  '0': 0,
  false: 0,
  '1': 1,
  '2': 2,
  '3': 3,
};

/**
 * Detects terminal color support level by checking environment variables and
 * terminal capabilities in priority order:
 *
 * 1. FORCE_COLOR — User explicitly forces a specific color level (spec: force-color.org)
 * 2. NO_COLOR — User explicitly disables all colors (spec: no-color.org)
 * 3. TTY check — Non-interactive output (e.g. piped to file) gets no colors
 * 4. Windows — Detects Windows Terminal (truecolor) vs legacy cmd.exe (basic)
 * 5. COLORTERM — Set by terminals that support truecolor (e.g. iTerm2, Alacritty)
 * 6. TERM — Set by terminals; "256color" suffix indicates 256-color support
 * 7. Node.js hasColors() — Runtime API (Node 11.13+) for accurate detection
 * 8. Default — Basic 16 colors if none of the above matched
 */
export function detectColorLevel(): ColorLevel {
  // `typeof` guard prevents ReferenceError in environments where `process`
  // doesn't exist at all (Cloudflare Workers, browser, etc.)
  const proc = typeof process !== 'undefined' ? process : undefined;
  const env = proc?.env ?? {};
  const isTTY = proc?.stdout?.isTTY ?? false;

  // 1. FORCE_COLOR — Highest priority override set by the user or CI tooling.
  //    Spec says "present and non-empty" activates it; empty string = not set.
  //    Values "0"-"3" map to color levels; any other non-empty value defaults to 1.
  if ('FORCE_COLOR' in env && env.FORCE_COLOR !== '') {
    const force = env.FORCE_COLOR;

    if (force != null && force in FORCE_COLOR_MAP) {
      return FORCE_COLOR_MAP[force];
    }

    return 1;
  }

  // 2. NO_COLOR — Opt-out mechanism for users who don't want colored output.
  //    Spec says "present and non-empty" disables color; empty string = not set.
  if ('NO_COLOR' in env && env.NO_COLOR !== '') {
    return 0;
  }

  // 3. TTY — If stdout is not a terminal (e.g. piped to a file or another process),
  //    ANSI codes would appear as garbage text, so we disable colors.
  if (!isTTY) {
    return 0;
  }

  // 4. Windows — Windows Terminal (WT_SESSION) and ConEmu support truecolor.
  //    Legacy cmd.exe / PowerShell only support basic 16 colors.
  if (proc?.platform === 'win32') {
    if (env.WT_SESSION || env.ConEmuANSI === 'ON') {
      return 3;
    }
    return 1;
  }

  // 5. COLORTERM — Modern terminals like iTerm2, Alacritty, and kitty set this
  //    to "truecolor" or "24bit" to advertise full RGB color support.
  if (env.COLORTERM === 'truecolor' || env.COLORTERM === '24bit') {
    return 3;
  }

  // 6. TERM — Terminal type identifier. The "256color" suffix (e.g. "xterm-256color")
  //    is a widely used convention to indicate 256-color palette support.
  if (env.TERM?.includes('256color')) {
    return 2;
  }

  // 7. Node.js hasColors() — Built-in API (since Node 11.13) that queries the
  //    terminal's actual color capability. Used as a fallback when env vars
  //    don't provide enough information.
  const hasColors = (proc?.stdout as { hasColors?: (count: number) => boolean })?.hasColors;

  const TRUECOLOR_COUNT = 16_777_216; // 256^3 — full RGB palette
  const ANSI_256_COUNT = 256;

  if (typeof hasColors === 'function') {
    if (hasColors(TRUECOLOR_COUNT)) {
      return 3;
    }
    if (hasColors(ANSI_256_COUNT)) {
      return 2;
    }
  }

  // 8. Default — We already confirmed it's a TTY, so basic 16 colors are safe.
  return 1;
}

/**
 * The detected color level for the current environment.
 * Evaluated once at import time and cached for the lifetime of the process.
 *
 * - `0` — No color support
 * - `1` — Basic 16 colors
 * - `2` — 256 colors
 * - `3` — Truecolor (16 million colors)
 */
export const colorLevel = detectColorLevel();

/**
 * Whether the current environment supports any color output.
 * Evaluated once at import time alongside {@link colorLevel}.
 */
export const isColorSupported = colorLevel > 0;
