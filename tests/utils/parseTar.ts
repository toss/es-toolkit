import { PassThrough } from 'node:stream';
import * as tar from 'tar';

export async function* parseTar(tgz: Buffer) {
  const parser: tar.ParseStream = new tar.Parse();

  const passthrough = new PassThrough({ objectMode: true, autoDestroy: true, emitClose: true });

  parser.on(`entry`, (entry: tar.ReadEntry) => {
    passthrough.write(entry);
  });

  parser.on(`error`, error => {
    passthrough.destroy(error);
  });

  parser.on(`close`, () => {
    if (!passthrough.destroyed) {
      passthrough.end();
    }
  });

  parser.end(tgz);

  for await (const entry of passthrough) {
    const it = entry as tar.ReadEntry;
    yield it;
    it.resume();
  }
}