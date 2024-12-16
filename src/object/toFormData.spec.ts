import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { toFormData } from './toFormData';

describe('toFormData', () => {
  beforeAll(() => {
    vi.spyOn(FormData.prototype, 'append');
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should not append when value is undefined', () => {
    const object = {
      foo: undefined,
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
    expect(formData.get('foo')).toBeNull();
  });
  it('should append empty string when value is null', () => {
    const object = {
      foo: null,
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', '');
    expect(formData.get('foo')).toBe('');
  });
  it('should append boolean as string', () => {
    const object = {
      foo: true,
      bar: false,
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(2);
    expect(formData.append).toHaveBeenNthCalledWith(1, 'foo', 'true');
    expect(formData.append).toHaveBeenNthCalledWith(2, 'bar', 'false');
  });
  it('should append array values', () => {
    const object = {
      foo: [1, 2, 3],
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(3);
    expect(formData.append).toHaveBeenNthCalledWith(1, 'foo[0]', '1');
    expect(formData.append).toHaveBeenNthCalledWith(2, 'foo[1]', '2');
    expect(formData.append).toHaveBeenNthCalledWith(3, 'foo[2]', '3');
    expect(formData.get('foo[0]')).toBe('1');
    expect(formData.get('foo[1]')).toBe('2');
    expect(formData.get('foo[2]')).toBe('3');
  });
  it('should append date as ISO string', () => {
    const object = {
      date: new Date(),
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('date', object.date.toISOString());
    expect(formData.get('date')).toBe(object.date.toISOString());
  });
  it('should append nested object', () => {
    const object = {
      foo: {
        bar: 'baz',
      },
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo[bar]', 'baz');
    expect(formData.get('foo[bar]')).toBe('baz');
  });
  it('should append nested array', () => {
    const object = {
      foo: [
        {
          bar: 'baz',
        },
      ],
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo[0][bar]', 'baz');
    expect(formData.get('foo[0][bar]')).toBe('baz');
  });
  it('should append blob as is', () => {
    const object = {
      blob: new Blob(['content'], { type: 'text/plain' }),
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('blob', object.blob);
    expect(formData.get('blob')).toBeInstanceOf(Blob);
  });
  it('should append file as is', () => {
    if (typeof File === 'undefined') {
      return;
    }
    const object = {
      file: new File(['content'], 'file.txt', { type: 'text/plain' }),
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('file', object.file);
    expect(formData.get('file')).toBeInstanceOf(File);
  });
  it('should append all types of values', () => {
    if (typeof File === 'undefined') {
      return;
    }
    const object = {
      foo: undefined,
      bar: null,
      baz: true,
      qux: [1, 2, 3],
      quux: new Date(),
      corge: {
        grault: 'garply',
      },
      waldo: [
        {
          fred: 'plugh',
        },
      ],
      xyzzy: new Blob(['content'], { type: 'text/plain' }),
      thud: new File(['content'], 'file.txt', { type: 'text/plain' }),
    };

    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(10);
    expect(formData.get('foo')).toBeNull();
    expect(formData.get('bar')).toBe('');
    expect(formData.get('baz')).toBe('true');
    expect(formData.get('qux[0]')).toBe('1');
    expect(formData.get('qux[1]')).toBe('2');
    expect(formData.get('qux[2]')).toBe('3');
    expect(formData.get('quux')).toBe(object.quux.toISOString());
    expect(formData.get('corge[grault]')).toBe('garply');
    expect(formData.get('waldo[0][fred]')).toBe('plugh');
    expect(formData.get('xyzzy')).toBeInstanceOf(Blob);
    expect(formData.get('thud')).toBeInstanceOf(File);
  });
  it('should append float values', () => {
    const object = {
      foo: 1.23,
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', '1.23');
    expect(formData.get('foo')).toBe('1.23');
  });
  it('should append empty object', () => {
    const formData = toFormData({
      data: {},
    });
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append empty array', () => {
    const formData = toFormData({
      data: [],
    });
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append empty string object', () => {
    const object = {
      foo: '',
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', '');
    expect(formData.get('foo')).toBe('');
  });
  it('should not append empty empty object', () => {
    const object = {
      foo: {},
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append nested arrays', () => {
    const object = {
      foo: [
        [1, 2],
        [3, 4],
      ],
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(4);
    expect(formData.append).toHaveBeenNthCalledWith(1, 'foo[0][0]', '1');
    expect(formData.append).toHaveBeenNthCalledWith(2, 'foo[0][1]', '2');
    expect(formData.append).toHaveBeenNthCalledWith(3, 'foo[1][0]', '3');
    expect(formData.append).toHaveBeenNthCalledWith(4, 'foo[1][1]', '4');
    expect(formData.get('foo[0][0]')).toBe('1');
    expect(formData.get('foo[0][1]')).toBe('2');
    expect(formData.get('foo[1][0]')).toBe('3');
    expect(formData.get('foo[1][1]')).toBe('4');
  });
  it('should append BigInt as string', () => {
    const object = {
      foo: BigInt(123456789012345678901234567890n),
    };
    const formData = toFormData({
      data: object,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', object.foo.toString());
    expect(formData.get('foo')).toBe(object.foo.toString());
  });
  it('should throw error when serializing symbol', () => {
    const object = {
      foo: Symbol('foo'),
    };
    expect(() => toFormData({ data: object })).toThrow(TypeError);
  });
  it('should ignore null values when ignoreNullValues is true', () => {
    const data = { name: 'John', age: null, city: 'New York' };
    const formData = toFormData({
      data,
      config: { ignoreNullValues: true },
    });
    expect(formData.has('name')).toBe(true);
    expect(formData.get('name')).toBe('John');
    expect(formData.has('age')).toBe(false);
    expect(formData.has('city')).toBe(true);
    expect(formData.get('city')).toBe('New York');
  });

  it('should include null values when ignoreNullValues is false', () => {
    const data = { name: 'John', age: null, city: 'New York' };
    const formData = toFormData({
      data,
      config: { ignoreNullValues: false },
    });
    expect(formData.has('name')).toBe(true);
    expect(formData.get('name')).toBe('John');
    expect(formData.has('age')).toBe(true);
    expect(formData.get('age')).toBe('');
    expect(formData.has('city')).toBe(true);
    expect(formData.get('city')).toBe('New York');
  });
  it('should convert boolean values to integers when convertBooleansToIntegers is true', () => {
    const data = { isActive: true, isAdmin: false };
    const formData = toFormData({
      data,
      config: { convertBooleansToIntegers: true },
    });
    expect(formData.has('isActive')).toBe(true);
    expect(formData.get('isActive')).toBe('1');
    expect(formData.has('isAdmin')).toBe(true);
    expect(formData.get('isAdmin')).toBe('0');
  });
  it('should keep boolean values as strings when convertBooleansToIntegers is false', () => {
    const data = { isActive: true, isAdmin: false };
    const formData = toFormData({
      data,
      config: { convertBooleansToIntegers: false },
    });
    expect(formData.has('isActive')).toBe(true);
    expect(formData.get('isActive')).toBe('true');
    expect(formData.has('isAdmin')).toBe(true);
    expect(formData.get('isAdmin')).toBe('false');
  });
  it('should ignore empty arrays when allowEmptyArrays is false', () => {
    const data = { items: [] };
    const formData = toFormData({
      data,
      config: { allowEmptyArrays: false },
    });
    expect(formData.has('items')).toBe(false);
  });
  it('should include empty arrays when allowEmptyArrays is true', () => {
    const data = { items: [] };
    const formData = toFormData({
      data,
      config: { allowEmptyArrays: true },
    });
    expect(formData.has('items')).toBe(true);
    expect(formData.get('items')).toBe('');
  });
  it('should include array notation for non-file elements when noArrayNotationForNonFiles is false', () => {
    const data = { tags: ['tag1', 'tag2'] };
    const formData = toFormData({
      data,
      config: { noArrayNotationForNonFiles: false },
    });
    expect(formData.has('tags[0]')).toBe(true);
    expect(formData.get('tags[0]')).toBe('tag1');
    expect(formData.has('tags[1]')).toBe(true);
    expect(formData.get('tags[1]')).toBe('tag2');
  });
  it('should omit array notation for non-file elements when noArrayNotationForNonFiles is true', () => {
    const data = { tags: ['tag1', 'tag2'] };
    const formData = toFormData({
      data,
      config: { noArrayNotationForNonFiles: true },
    });
    expect(formData.has('tags')).toBe(true);
    expect(formData.getAll('tags')).toEqual(['tag1', 'tag2']);
  });
  it('should include array notation for file elements when noArrayNotationForFiles is false', () => {
    if (typeof File === 'undefined') {
      return;
    }
    const file1 = new File(['content'], 'file1.txt');
    const file2 = new File(['content'], 'file2.txt');
    const data = { files: [file1, file2] };
    const formData = toFormData({
      data,
      config: { noArrayNotationForFiles: false },
    });
    expect(formData.has('files[0]')).toBe(true);
    expect(formData.get('files[0]')).toBe(file1);
    expect(formData.has('files[1]')).toBe(true);
    expect(formData.get('files[1]')).toBe(file2);
  });
  it('should omit array notation for file elements when noArrayNotationForFiles is true', () => {
    if (typeof File === 'undefined') {
      return;
    }
    const file1 = new File(['content'], 'file1.txt');
    const file2 = new File(['content'], 'file2.txt');
    const data = { files: [file1, file2] };
    const formData = toFormData({
      data,
      config: { noArrayNotationForFiles: true },
    });
    expect(formData.has('files')).toBe(true);
    expect(formData.getAll('files')).toEqual([file1, file2]);
  });
  it('should use bracket notation for nested objects when useDotNotationForObjects is false', () => {
    const data = { user: { name: 'Alice', age: 30 } };
    const formData = toFormData({
      data,
      config: { useDotNotationForObjects: false },
    });
    expect(formData.has('user[name]')).toBe(true);
    expect(formData.get('user[name]')).toBe('Alice');
    expect(formData.has('user[age]')).toBe(true);
    expect(formData.get('user[age]')).toBe('30');
  });
  it('should use dot notation for nested objects when useDotNotationForObjects is true', () => {
    const data = { user: { name: 'Alice', age: 30 } };
    const formData = toFormData({
      data,
      config: { useDotNotationForObjects: true },
    });
    expect(formData.has('user.name')).toBe(true);
    expect(formData.get('user.name')).toBe('Alice');
    expect(formData.has('user.age')).toBe(true);
    expect(formData.get('user.age')).toBe('30');
  });
  it('should ignore null values and convert booleans to integers', () => {
    const data = { name: 'Alice', isActive: true, age: null };
    const formData = toFormData({
      data,
      config: { ignoreNullValues: true, convertBooleansToIntegers: true },
    });
    expect(formData.has('name')).toBe(true);
    expect(formData.get('name')).toBe('Alice');
    expect(formData.has('isActive')).toBe(true);
    expect(formData.get('isActive')).toBe('1');
    expect(formData.has('age')).toBe(false);
  });
  it('should ignore null values, convert booleans to integers, and omit array notation for files', () => {
    if (typeof File === 'undefined') {
      return;
    }
    const data = { name: 'Alice', isActive: false, documents: [new File(['doc'], 'doc1.txt')] };
    const formData = toFormData({
      data,
      config: { ignoreNullValues: true, convertBooleansToIntegers: true, noArrayNotationForFiles: true },
    });
    expect(formData.has('name')).toBe(true);
    expect(formData.get('name')).toBe('Alice');
    expect(formData.has('isActive')).toBe(true);
    expect(formData.get('isActive')).toBe('0');
    expect(formData.has('documents')).toBe(true);
    expect(formData.getAll('documents').length).toBe(1);
    expect(formData.getAll('documents')[0] instanceof File).toBe(true);
  });
  it('should ignore null values, convert booleans to integers, and use dot notation for objects', () => {
    const data = { user: { name: 'Alice', isActive: true, age: null }, roles: ['admin', 'user'] };
    const formData = toFormData({
      data,
      config: { ignoreNullValues: true, convertBooleansToIntegers: true, useDotNotationForObjects: true },
    });
    expect(formData.has('user.name')).toBe(true);
    expect(formData.get('user.name')).toBe('Alice');
    expect(formData.has('user.isActive')).toBe(true);
    expect(formData.get('user.isActive')).toBe('1');
    expect(formData.has('user.age')).toBe(false);
    expect(formData.has('roles[0]')).toBe(true);
    expect(formData.get('roles[0]')).toBe('admin');
    expect(formData.has('roles[1]')).toBe(true);
    expect(formData.get('roles[1]')).toBe('user');
  });
  it('should allow empty arrays, omit indices in keys, no array notation for non-files, and use dot notation', () => {
    const data = { categories: [], user: { name: 'Alice', hobbies: ['reading', 'coding'] } };
    const formData = toFormData({
      data,
      config: {
        allowEmptyArrays: true,
        noArrayNotationForNonFiles: true,
        useDotNotationForObjects: true,
      },
    });
    expect(formData.has('categories')).toBe(true);
    expect(formData.get('categories')).toBe('');
    expect(formData.has('user.name')).toBe(true);
    expect(formData.get('user.name')).toBe('Alice');
    expect(formData.has('user.hobbies')).toBe(true);
    expect(formData.getAll('user.hobbies')).toEqual(['reading', 'coding']);
  });
  it('should ignore null values, convert booleans to integers, allow empty arrays, omit indices in keys, and no array notation for files', () => {
    if (typeof File === 'undefined') {
      return;
    }
    const file1 = new File(['content'], 'file1.txt');
    const data = {
      isAdmin: false,
      settings: { notifications: true, theme: null },
      files: [file1],
      tags: [],
    };
    const formData = toFormData({
      data,
      config: {
        ignoreNullValues: true,
        convertBooleansToIntegers: true,
        allowEmptyArrays: true,
        noArrayNotationForFiles: true,
        useDotNotationForObjects: true,
      },
    });
    expect(formData.has('isAdmin')).toBe(true);
    expect(formData.get('isAdmin')).toBe('0');
    expect(formData.has('settings.notifications')).toBe(true);
    expect(formData.get('settings.notifications')).toBe('1');
    expect(formData.has('settings.theme')).toBe(false);
    expect(formData.has('tags')).toBe(true);
    expect(formData.get('tags')).toBe('');
    expect(formData.has('files')).toBe(true);
    expect(formData.getAll('files').length).toBe(1);
    expect(formData.getAll('files')[0] instanceof File).toBe(true);
  });
});
