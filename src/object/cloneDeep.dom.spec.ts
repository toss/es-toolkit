/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';
import { cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  it('should not clone uncloneable objects like `HTMLElement`s', () => {
    const element = document.createElement('div');
    element.textContent = 'Hello, World!';

    const clonedElement = cloneDeep(element);

    expect(clonedElement).toBe(element);
    expect(clonedElement.nodeType).toBe(element.nodeType);
    expect(clonedElement.textContent).toBe('Hello, World!');
  });
});
