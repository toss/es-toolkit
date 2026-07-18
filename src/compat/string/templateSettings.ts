import { templateSettings as settings } from './template.ts';

// Defined in `template.ts` (circular reference with `template`) and re-bound here,
// because the unbundled build strips modules that only re-export bindings.
export const templateSettings = settings;
