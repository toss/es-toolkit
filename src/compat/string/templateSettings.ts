import { templateSettings as settings } from './template.ts';

// `templateSettings` lives in `template.ts` because the settings object and `template`
// reference each other. It is re-bound here instead of using `export { ... } from`: the
// unbundled build strips pure re-export modules, which breaks the
// `es-toolkit/compat/templateSettings` entry point.
export const templateSettings = settings;
