import { describe, expect, it } from 'vitest';
import { flattenObject } from './flattenObject';

describe('flattenObject', function () {
  it('flattens primitive values correctly', () => {
    const result1 = flattenObject({
      a: {
        b: 'yay',
      },
    });

    expect(result1).toEqual({
      'a.b': 'yay',
    });

    const date = new Date();

    const result2 = flattenObject({
      a: {
        b: {
          string: 'hello world',
          number: 1234.5678,
          boolean: true,
          null: null,
          undefined: undefined,
          date: date,
        },
      },
    });

    expect(result2).toEqual({
      'a.b.string': 'hello world',
      'a.b.number': 1234.5678,
      'a.b.boolean': true,
      'a.b.null': null,
      'a.b.undefined': undefined,
      'a.b.date': date,
    });
  });

  it('flattens multiple keys', () => {
    const date = new Date();

    const result = flattenObject({
      a: {
        b: {
          c: 1,
        },
        d: {
          e: {
            f: {
              g: date,
            },
          },
        },
      },
      h: {
        i: 'hi',
      },
    });

    expect(result).toEqual({
      'a.b.c': 1,
      'a.d.e.f.g': date,
      'h.i': 'hi',
    });
  });

  it('handles empty objects correctly', () => {
    const result = flattenObject({
      a: {
        b: {},
      },
    });

    expect(result).toEqual({
      'a.b': {},
    });
  });

  it('handles `Buffer`s correctly', () => {
    const result = flattenObject({
      a: {
        b: Buffer.from('test'),
      },
    });

    expect(result).toEqual({
      'a.b': Buffer.from('test'),
    });
  });

  it('handles `TypedArray`s correctly', () => {
    const result = flattenObject({
      a: {
        b: new Uint8Array([1, 2, 3, 4]),
      },
    });

    expect(result).toEqual({
      'a.b': new Uint8Array([1, 2, 3, 4]),
    });
  });

  it('handles numeric keys', () => {
    const result = flattenObject({
      '01': {
        '02': {
          '03': 1,
        },
      },
    });

    expect(result).toEqual({
      '01.02.03': 1,
    });
  });

  it('handles mixed keys', () => {
    const result = flattenObject({
      a1: {
        b2: {
          c3: 1,
        },
      },
    });

    expect(result).toEqual({
      'a1.b2.c3': 1,
    });
  });

  it('handles arrays', () => {
    const result = flattenObject({
      a: [1, 2, 3],
    });

    expect(result).toEqual({
      'a.0': 1,
      'a.1': 2,
      'a.2': 3,
    });
  });

  it('handles object arrays', () => {
    const result = flattenObject({
      a: [1, { b: 2 }, 3, [{ c: 4 }]],
    });

    expect(result).toEqual({
      'a.0': 1,
      'a.1.b': 2,
      'a.2': 3,
      'a.3.0.c': 4,
    });
  });

  describe('custom delimiters', () => {
    it('handles forward slash delimiter', () => {
      const result = flattenObject(
        {
          a: {
            b: {
              c: 1,
            },
            d: [2, 3],
          },
        },
        { delimiter: '/' }
      );

      expect(result).toEqual({
        'a/b/c': 1,
        'a/d/0': 2,
        'a/d/1': 3,
      });
    });

    it('handles dash delimiter', () => {
      const result = flattenObject(
        {
          users: {
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              settings: {
                theme: 'dark',
              },
            },
          },
        },
        { delimiter: '-' }
      );

      expect(result).toEqual({
        'users-profile-firstName': 'John',
        'users-profile-lastName': 'Doe',
        'users-profile-settings-theme': 'dark',
      });
    });

    it('handles underscore delimiter', () => {
      const result = flattenObject(
        {
          database: {
            tables: {
              users: ['admin', 'guest'],
              permissions: {
                read: true,
                write: false,
              },
            },
          },
        },
        { delimiter: '_' }
      );

      expect(result).toEqual({
        database_tables_users_0: 'admin',
        database_tables_users_1: 'guest',
        database_tables_permissions_read: true,
        database_tables_permissions_write: false,
      });
    });

    it('handles multi-character delimiter', () => {
      const result = flattenObject(
        {
          app: {
            config: {
              api: {
                url: 'https://api.example.com',
                key: '12345',
              },
            },
          },
        },
        { delimiter: '->' }
      );

      expect(result).toEqual({
        'app->config->api->url': 'https://api.example.com',
        'app->config->api->key': '12345',
      });
    });

    it('handles empty string delimiter', () => {
      const result = flattenObject(
        {
          x: {
            y: {
              z: 42,
            },
          },
        },
        { delimiter: '' }
      );

      expect(result).toEqual({
        xyz: 42,
      });
    });

    it('handles special characters delimiter', () => {
      const result = flattenObject(
        {
          level1: {
            level2: {
              data: 'test',
              array: [1, 2],
            },
          },
        },
        { delimiter: '@#$' }
      );

      expect(result).toEqual({
        'level1@#$level2@#$data': 'test',
        'level1@#$level2@#$array@#$0': 1,
        'level1@#$level2@#$array@#$1': 2,
      });
    });
  });
});
