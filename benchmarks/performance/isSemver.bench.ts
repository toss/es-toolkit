import { bench, describe } from 'vitest';
import { isSemver as isSemverToolkit_ } from 'es-toolkit';
import isSemver_ from 'is-semver';

const isSemverToolkit = isSemverToolkit_;
const isSemver = isSemver_;

describe('isSemver', () => {
  bench('es-toolkit/isSemver', () => {
    const vals = [
      '1.0.0',
      '1.0.0-alpha',
      '1.0.0-alpha.1',
      '1.0.0-0.3.7',
      '1.0.0-x.7.z.92',
      '1.0.0-alpha+001',
      '1.0.0+20130313144700',
      '1.0.0-beta+exp.sha.5',
    ];
    for (let i = 0; i < vals.length; i++) {
      isSemverToolkit(vals[i]);
    }
  });

  bench('is-semver/isSemver', () => {
    const vals = [
      '1.0.0',
      '1.0.0-alpha',
      '1.0.0-alpha.1',
      '1.0.0-0.3.7',
      '1.0.0-x.7.z.92',
      '1.0.0-alpha+001',
      '1.0.0+20130313144700',
      '1.0.0-beta+exp.sha.5',
    ];
    for (let i = 0; i < vals.length; i++) {
      isSemver(vals[i]);
    }
  });
});
