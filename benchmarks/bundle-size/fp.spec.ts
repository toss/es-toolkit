import { describe, expect, it } from 'vitest';
import { getBundleSize } from './utils/getBundleSize';

// Tree-shaken, minified size of importing a single function, comparing
// `es-toolkit/fp` with the closest `remeda` equivalent.

describe('pipe bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'pipe')).toMatchInlineSnapshot(`1146`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'pipe')).toMatchInlineSnapshot(`908`);
  });
});

describe('map bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'map')).toMatchInlineSnapshot(`227`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'map')).toMatchInlineSnapshot(`359`);
  });
});

describe('filter bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'filter')).toMatchInlineSnapshot(`262`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'filter')).toMatchInlineSnapshot(`391`);
  });
});

describe('take bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'take')).toMatchInlineSnapshot(`632`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'take')).toMatchInlineSnapshot(`443`);
  });
});

describe('uniq bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'uniq')).toMatchInlineSnapshot(`108`);
  });

  it('remeda (unique)', async () => {
    expect(await getBundleSize('remeda', 'unique')).toMatchInlineSnapshot(`1233`);
  });
});

describe('chunk bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'chunk')).toMatchInlineSnapshot(`286`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'chunk')).toMatchInlineSnapshot(`607`);
  });
});

describe('sortBy bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'sortBy')).toMatchInlineSnapshot(`497`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'sortBy')).toMatchInlineSnapshot(`612`);
  });
});

describe('pick bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'pick')).toMatchInlineSnapshot(`180`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'pick')).toMatchInlineSnapshot(`353`);
  });
});

describe('omit bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'omit')).toMatchInlineSnapshot(`164`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'omit')).toMatchInlineSnapshot(`471`);
  });
});

describe('multiply bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'multiply')).toMatchInlineSnapshot(`72`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'multiply')).toMatchInlineSnapshot(`301`);
  });
});

describe('add bundle size', () => {
  it('es-toolkit/fp', async () => {
    expect(await getBundleSize('es-toolkit/fp', 'add')).toMatchInlineSnapshot(`72`);
  });

  it('remeda', async () => {
    expect(await getBundleSize('remeda', 'add')).toMatchInlineSnapshot(`301`);
  });
});
