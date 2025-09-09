import { bench, describe } from 'vitest';
import { truncate as truncateCompatToolkit_ } from 'es-toolkit/compat';
import { truncate as truncateToolkit_ } from 'es-toolkit/string';
import { truncate as truncateLodash_ } from 'lodash';

const truncateToolkit = truncateToolkit_;
const truncateCompatToolkit = truncateCompatToolkit_;
const truncateLodash = truncateLodash_;

const strAsciiShort = 'hi-diddly-ho there, neighborino';
const strAsciiLong = strAsciiShort.padEnd(500, 'A').padEnd(1000, '5').padEnd(1500, ' ').padEnd(2000, ', ');

const strUnicodeShort = 'hi-diddly-ho there, ¥, §✈✉, 🤓 neighborino';
const strUnicodeLong = (strUnicodeShort.padEnd(500, 'A').padEnd(1000, '5') + strUnicodeShort)
  .padEnd(1500, ' ')
  .padEnd(2000, ', ');

describe('truncate - short ascii', () => {
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strAsciiShort);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strAsciiShort);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strAsciiShort);
  });
});

describe('truncate - long ascii', () => {
  const options = { length: 150 };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strAsciiLong, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strAsciiLong, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strAsciiLong, options);
  });
});

describe('truncate - short unicode', () => {
  const options = { length: 28 };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strUnicodeShort, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strUnicodeShort, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strUnicodeShort, options);
  });
});

describe('truncate - long unicode', () => {
  const options = { length: 24, separator: ', ' };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strUnicodeLong, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strUnicodeLong, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strUnicodeLong, options);
  });
});

describe('truncate - do nothing - short ascii', () => {
  const options = { length: 100 };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strAsciiShort, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strAsciiShort, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strAsciiShort, options);
  });
});

describe('truncate - do nothing - long ascii', () => {
  const options = { length: 1_000_000 };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strAsciiLong, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strAsciiLong, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strAsciiLong, options);
  });
});

describe('truncate - do nothing - short unicode', () => {
  const options = { length: 100 };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strUnicodeShort, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strUnicodeShort, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strUnicodeShort, options);
  });
});

describe('truncate - do nothing - long unicode', () => {
  const options = { length: 1_000_000 };
  bench('es-toolkit/truncate', () => {
    truncateToolkit(strUnicodeLong, options);
  });

  bench('es-toolkit/compat/truncate', () => {
    truncateCompatToolkit(strUnicodeLong, options);
  });

  bench('lodash/truncate', () => {
    truncateLodash(strUnicodeLong, options);
  });
});
