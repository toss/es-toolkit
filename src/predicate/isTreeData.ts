/**
 * Checks whether `value` is tree-structured data: either a single tree node
 * (a plain object whose optional `children` array contains further tree
 * nodes) or an array (a forest) of such nodes. A leaf node is any plain object
 * without the children key.
 *
 * The children key is configurable via the `childrenKey` option (default
 * `'children'`). Primitive values and `null` are never tree data. See
 * issue #1598.
 *
 * @template T - The node value type.
 * @param value - The value to check.
 * @param options - Optional configuration.
 * @param options.childrenKey - The property name that holds the child nodes.
 * @returns `true` if `value` is tree-structured data, `false` otherwise.
 *
 * @example
 * isTreeData({ name: 'root', children: [{ name: 'a' }, { name: 'b' }] }) // true
 * isTreeData({ name: 'leaf' }) // true
 * isTreeData({ nodes: [{ name: 'x' }] }, { childrenKey: 'nodes' }) // true
 * isTreeData({ children: 'not an array' }) // false
 * isTreeData(42) // false
 *
 * @group predicate
 */
export function isTreeData(value: unknown, options: { childrenKey?: string } = {}): boolean {
  const childrenKey = options.childrenKey ?? 'children';

  if (Array.isArray(value)) {
    return value.every(node => isTreeData(node, options));
  }

  if (value !== null && typeof value === 'object') {
    if (childrenKey in value) {
      const children = (value as Record<string, unknown>)[childrenKey];
      if (!Array.isArray(children)) {
        return false;
      }
      return children.every(child => isTreeData(child, options));
    }
    return true;
  }

  return false;
}
