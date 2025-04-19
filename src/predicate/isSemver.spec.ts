import { describe, expect, it } from 'vitest';
import { isSemver } from './isSemver';

describe('isSemver', () => {
  it('returns `true` for valid SemVer strings', () => {
    expect(isSemver('1.0.0')).toBe(true);
    expect(isSemver('1.0.0-alpha')).toBe(true);
    expect(isSemver('1.0.0-alpha.1')).toBe(true);
    expect(isSemver('1.0.0-0.3.7')).toBe(true);
    expect(isSemver('1.0.0-x.7.z.92')).toBe(true);
    expect(isSemver('1.0.0-alpha+001')).toBe(true);
    expect(isSemver('1.0.0+20130313144700')).toBe(true);
    expect(isSemver('1.0.0-beta+exp.sha.5')).toBe(true);
  });

  it('returns `false` for invalid SemVer strings', () => {
    expect(isSemver('1.2')).toBe(false);
    expect(isSemver('-1.2.3')).toBe(false);
    expect(isSemver('1.2.3-')).toBe(false);
    expect(isSemver('1.2.3-+')).toBe(false);
    expect(isSemver('1.2.3-+001')).toBe(false);
    expect(isSemver('1.2.3-01')).toBe(false);
    expect(isSemver('1.2.3-0123')).toBe(false);
    expect(isSemver('1.2.3-0123.0123')).toBe(false);
  });
});
