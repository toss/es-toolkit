import { Readable } from "node:stream";

export async function streamToBuffer(stream: Readable) {
  return await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on(`error`, error => {
      reject(error);
    });

    stream.on(`data`, chunk => {
      chunks.push(chunk);
    });

    stream.on(`end`, () => {
      resolve(Buffer.concat(chunks));
    });
  });
}