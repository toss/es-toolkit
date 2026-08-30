const K = new Int32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
  0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
  0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
  0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
  0xc67178f2,
]);

const BASE64_URL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/**
 * Computes the SHA-256 digest of a string and encodes it in Base64URL
 * format without padding.
 *
 * The output is byte-identical to
 * `crypto.hash('sha256', data, 'base64url')` in Node.js.
 *
 * @param data - The string to hash. Encoded as UTF-8 before hashing.
 * @returns The 43-character Base64URL-encoded digest.
 */
export function sha256(data: string): string {
  const bytes = new TextEncoder().encode(data);
  const byteLength = bytes.length;

  // Pad to a multiple of 64 bytes: append 0x80, zeros, then the bit length
  // as a 64-bit big-endian integer (Merkle–Damgård padding).
  const paddedLength = (((byteLength + 8) >> 6) + 1) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[byteLength] = 0x80;

  const view = new DataView(padded.buffer);
  view.setUint32(paddedLength - 8, Math.floor(byteLength / 0x20000000));
  view.setUint32(paddedLength - 4, (byteLength << 3) >>> 0);

  let h0 = 0x6a09e667 | 0;
  let h1 = 0xbb67ae85 | 0;
  let h2 = 0x3c6ef372 | 0;
  let h3 = 0xa54ff53a | 0;
  let h4 = 0x510e527f | 0;
  let h5 = 0x9b05688c | 0;
  let h6 = 0x1f83d9ab | 0;
  let h7 = 0x5be0cd19 | 0;

  const w = new Int32Array(64);

  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let i = 0; i < 16; i++) {
      w[i] = view.getUint32(offset + i * 4) | 0;
    }
    for (let i = 16; i < 64; i++) {
      const x = w[i - 15];
      const y = w[i - 2];
      const sigma0 = (((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3)) | 0;
      const sigma1 = (((y >>> 17) | (y << 15)) ^ ((y >>> 19) | (y << 13)) ^ (y >>> 10)) | 0;
      w[i] = (w[i - 16] + sigma0 + w[i - 7] + sigma1) | 0;
    }

    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;

    for (let i = 0; i < 64; i++) {
      const bigSigma1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + bigSigma1 + ch + K[i] + w[i]) | 0;
      const bigSigma0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (bigSigma0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
    h5 = (h5 + f) | 0;
    h6 = (h6 + g) | 0;
    h7 = (h7 + h) | 0;
  }

  const digest = new Uint8Array(32);
  const digestView = new DataView(digest.buffer);
  digestView.setInt32(0, h0);
  digestView.setInt32(4, h1);
  digestView.setInt32(8, h2);
  digestView.setInt32(12, h3);
  digestView.setInt32(16, h4);
  digestView.setInt32(20, h5);
  digestView.setInt32(24, h6);
  digestView.setInt32(28, h7);

  // 32 bytes = 10 full 3-byte groups + 2 remaining bytes = 43 characters.
  let result = '';
  for (let i = 0; i < 30; i += 3) {
    const n = (digest[i] << 16) | (digest[i + 1] << 8) | digest[i + 2];
    result +=
      BASE64_URL_ALPHABET[(n >>> 18) & 63] +
      BASE64_URL_ALPHABET[(n >>> 12) & 63] +
      BASE64_URL_ALPHABET[(n >>> 6) & 63] +
      BASE64_URL_ALPHABET[n & 63];
  }
  const n = (digest[30] << 8) | digest[31];
  result +=
    BASE64_URL_ALPHABET[(n >>> 10) & 63] + BASE64_URL_ALPHABET[(n >>> 4) & 63] + BASE64_URL_ALPHABET[(n << 2) & 63];

  return result;
}
