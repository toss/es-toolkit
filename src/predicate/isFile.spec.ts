import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isFile } from './isFile';

describe('isFile', () => {
  let originalFile: typeof File;

  beforeAll(() => {
    originalFile = globalThis.File;
    //@ts-expect-error - globalThis.File is browser only.
    globalThis.File = class File extends Blob {
      name: string;
      constructor(chunks: any[], filename: string, options?: BlobPropertyBag) {
        super(chunks, options);
        this.name = filename;
      }
    };
  });

  afterAll(() => {
    globalThis.File = originalFile;
  });

  it('returns true if the value is a File', () => {
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    expect(isFile(file)).toBe(true);
  });

  it('returns false if the value is not a File', () => {
    expect(isFile(0)).toBe(false);
    expect(isFile('abc')).toBe(false);
    expect(isFile(123)).toBe(false);
    expect(isFile({ a: 1 })).toBe(false);
    expect(isFile([1, 2, 3])).toBe(false);
    expect(isFile(null)).toBe(false);
    expect(isFile(undefined)).toBe(false);
    const blob = new Blob(['content'], { type: 'text/plain' });
    expect(isFile(blob)).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const items: Array<File | number> = [new File([''], 'example.txt'), 1, new File([''], 'example2.txt'), 2];
    const result = items.filter(isFile);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(File);
    expect(result[1]).toBeInstanceOf(File);
  });

  it('returns false if File is not supported in the environment', () => {
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    const originalFile = globalThis.File;
    // @ts-expect-error - we need to simulate the absence of File
    globalThis.File = undefined;
    expect(isFile(file)).toBe(false);
    globalThis.File = originalFile;
  });

  it('returns false if Blob is not supported in the environment', () => {
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    const originalBlob = globalThis.Blob;
    // @ts-expect-error - we need to simulate the absence of Blob
    globalThis.Blob = undefined;
    expect(isFile(file)).toBe(false);
    globalThis.Blob = originalBlob;
  });

  it('returns false if Blob is passed as a File', () => {
    const blob = new Blob(['content'], { type: 'text/plain' });
    expect(isFile(blob)).toBe(false);
  });
});
