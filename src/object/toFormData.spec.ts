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
    const formData = toFormData({
      foo: undefined,
    });
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
    expect(formData.get('foo')).toBeNull();
  });
  it('should append empty string when value is null', () => {
    const formData = toFormData({
      foo: null,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', '');
    expect(formData.get('foo')).toBe('');
  });
  it('should append boolean as string', () => {
    const formData = toFormData({
      foo: true,
      bar: false,
    });
    expect(formData.append).toHaveBeenCalledTimes(2);
    expect(formData.append).toHaveBeenNthCalledWith(1, 'foo', 'true');
    expect(formData.append).toHaveBeenNthCalledWith(2, 'bar', 'false');
  });
  it('should append array values', () => {
    const formData = toFormData({
      foo: [1, 2, 3],
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
    const date = new Date();
    const formData = toFormData({
      foo: date,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', date.toISOString());
    expect(formData.get('foo')).toBe(date.toISOString());
  });
  it('should append nested object', () => {
    const formData = toFormData({
      foo: {
        bar: 'baz',
      },
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo[bar]', 'baz');
    expect(formData.get('foo[bar]')).toBe('baz');
  });
  it('should append nested array', () => {
    const formData = toFormData({
      foo: [
        {
          bar: 'baz',
        },
      ],
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo[0][bar]', 'baz');
    expect(formData.get('foo[0][bar]')).toBe('baz');
  });
  it('should append blob as is', () => {
    const blob = new Blob(['content'], { type: 'text/plain' });
    const formData = toFormData({
      foo: blob,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', blob);
    expect(formData.get('foo')).toBeInstanceOf(Blob);
  });
  it('should append file as is', () => {
    const file = new File(['content'], 'file.txt', { type: 'text/plain' });
    const formData = toFormData({
      foo: file,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', file);
    expect(formData.get('foo')).toBeInstanceOf(File);
  });
  it('should append all types of values', () => {
    const date = new Date();
    const blob = new Blob(['content'], { type: 'text/plain' });
    const file = new File(['content'], 'file.txt', { type: 'text/plain' });
    const formData = toFormData({
      foo: undefined,
      bar: null,
      baz: true,
      qux: [1, 2, 3],
      quux: date,
      corge: {
        grault: 'garply',
      },
      waldo: [
        {
          fred: 'plugh',
        },
      ],
      xyzzy: blob,
      thud: file,
    });
    expect(formData.append).toHaveBeenCalledTimes(10);
    expect(formData.get('foo')).toBeNull();
    expect(formData.get('bar')).toBe('');
    expect(formData.get('baz')).toBe('true');
    expect(formData.get('qux[0]')).toBe('1');
    expect(formData.get('qux[1]')).toBe('2');
    expect(formData.get('qux[2]')).toBe('3');
    expect(formData.get('quux')).toBe(date.toISOString());
    expect(formData.get('corge[grault]')).toBe('garply');
    expect(formData.get('waldo[0][fred]')).toBe('plugh');
    expect(formData.get('xyzzy')).toBeInstanceOf(Blob);
    expect(formData.get('thud')).toBeInstanceOf(File);
  });
  it('should append float values', () => {
    const formData = toFormData({
      foo: 1.23,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', '1.23');
    expect(formData.get('foo')).toBe('1.23');
  });
  it('should append empty object', () => {
    const formData = toFormData({});
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append empty array', () => {
    const formData = toFormData([]);
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append empty string', () => {
    const formData = toFormData('');
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append empty string object', () => {
    const formData = toFormData({
      foo: '',
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', '');
    expect(formData.get('foo')).toBe('');
  });
  it('should not append empty empty object', () => {
    const formData = toFormData({
      foo: {},
    });
    expect(formData.append).not.toHaveBeenCalled();
    expect(formData).toEqual(new FormData());
  });
  it('should append nested arrays', () => {
    const formData = toFormData({
      foo: [
        [1, 2],
        [3, 4],
      ],
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
    const bigIntValue = BigInt(123456789012345678901234567890n);
    const formData = toFormData({
      foo: bigIntValue,
    });
    expect(formData.append).toHaveBeenCalledTimes(1);
    expect(formData.append).toHaveBeenCalledWith('foo', bigIntValue.toString());
    expect(formData.get('foo')).toBe(bigIntValue.toString());
  });
  it('should throw error when serializing symbol', () => {
    const symbolValue = Symbol('foo');
    expect(() => toFormData({ foo: symbolValue })).toThrow(TypeError);
  });
});
