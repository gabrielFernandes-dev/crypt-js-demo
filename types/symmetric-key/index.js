import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'node:crypto';

const algorithm = 'aes256';
const inputEncoding = 'utf-8';
const outputEncoding = 'hex';
const ivlength = 16;

export function encrypt(plainText, password) {
  const iv = randomBytes(ivlength);

  const key = createHash('sha256')
    .update(password)
    .digest('base64')
    .toString(outputEncoding)
    .slice(0, 32);

  const cipher = createCipheriv(algorithm, key, iv);

  let encryptedText = cipher.update(plainText, inputEncoding, outputEncoding);

  encryptedText += cipher.final(outputEncoding);

  return [iv.toString(outputEncoding), encryptedText].join(':');
}

export function decrypt(encryptedText, password) {
  const [ivHex, encodedText] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const key = createHash('sha256')
    .update(password)
    .digest('base64')
    .slice(0, 32);

  const decipher = createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(Buffer.from(encodedText, outputEncoding));

  decrypted += decipher.final(inputEncoding);

  return decrypted;
}
