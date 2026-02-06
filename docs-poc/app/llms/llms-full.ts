import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export async function loader() {
  const scan = source.getPages('en').map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
