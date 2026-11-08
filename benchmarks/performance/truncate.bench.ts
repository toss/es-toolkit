import { truncate as truncateCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const strAsciiShort = 'hi-diddly-ho there, neighborino';
const strAsciiLong = strAsciiShort.padEnd(500, 'A').padEnd(1000, '5').padEnd(1500, ' ').padEnd(2000, ', ');

const strUnicodeShort = 'hi-diddly-ho there, ¥, §✈✉, 🤓 neighborino';
const strUnicodeLong = (strUnicodeShort.padEnd(500, 'A').padEnd(1000, '5') + strUnicodeShort)
  .padEnd(1500, ' ')
  .padEnd(2000, ', ');

group('truncate - short ascii', () => {
  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strAsciiShort));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strAsciiShort));
  });
});

group('truncate - long ascii', () => {
  const options = { length: 150 };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strAsciiLong, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strAsciiLong, options));
  });
});

group('truncate - short unicode', () => {
  const options = { length: 28 };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strUnicodeShort, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strUnicodeShort, options));
  });
});

group('truncate - long unicode', () => {
  const options = { length: 24, separator: ', ' };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strUnicodeLong, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strUnicodeLong, options));
  });
});

group('truncate - do nothing - short ascii', () => {
  const options = { length: 100 };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strAsciiShort, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strAsciiShort, options));
  });
});

group('truncate - do nothing - long ascii', () => {
  const options = { length: 1_000_000 };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strAsciiLong, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strAsciiLong, options));
  });
});

group('truncate - do nothing - short unicode', () => {
  const options = { length: 100 };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strUnicodeShort, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strUnicodeShort, options));
  });
});

group('truncate - do nothing - long unicode', () => {
  const options = { length: 1_000_000 };

  bench('es-toolkit/compat/truncate', () => {
    do_not_optimize(truncateCompatToolkit(strUnicodeLong, options));
  });

  bench('lodash/truncate', () => {
    do_not_optimize(lodash.truncate(strUnicodeLong, options));
  });
});
