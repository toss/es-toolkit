import * as compat from './compat.ts';

type ToolkitFn = (value: any) => any;

type Compat = typeof compat;

interface Toolkit extends ToolkitFn, Compat {}

// Cast the initial function to the combined Toolkit type
export const toolkit: Toolkit = ((value: any) => {
  return value;
}) as Toolkit;

// Assign properties from compat module
Object.assign(toolkit, compat);

// Set the placeholder for partial and partialRight
toolkit.partial.placeholder = toolkit;
toolkit.partialRight.placeholder = toolkit;
