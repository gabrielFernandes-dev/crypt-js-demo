import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateKeyPairSync } from 'node:crypto';
import { appendFileSync, readdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const keyPairExists = readdirSync(__dirname).filter((fileName) =>
  fileName.endsWith('.pem')
).length
  ? true
  : false;

if (!keyPairExists) {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  appendFileSync(
    join(__dirname, 'public-key.pem'),
    publicKey.export({ format: 'pem', type: 'pkcs1' }),
    'utf-8'
  );

  appendFileSync(
    join(__dirname, 'private-key.pem'),
    privateKey.export({ format: 'pem', type: 'pkcs1' }),
    'utf-8'
  );
}
