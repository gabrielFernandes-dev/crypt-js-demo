import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { constants, privateDecrypt, publicEncrypt } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function encryptText(plainText) {
  return publicEncrypt(
    {
      key: readFileSync(join(__dirname, 'public-key.pem'), 'utf8'),
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(plainText)
  );
}

export function decryptText(encryptedText) {
  return privateDecrypt(
    {
      key: readFileSync(join(__dirname, 'private-key.pem'), 'utf8'),
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    encryptedText
  );
}
