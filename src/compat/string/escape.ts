import { escape as escapeToolkit } from '../../string/escape.ts';
import { toString } from '../util/toString.ts';

export function escape(string?: string): string {
  return escapeToolkit(toString(string));
}
