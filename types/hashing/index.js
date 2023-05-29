import { createHash } from 'node:crypto';

export function hashText(text) {
  return createHash('sha256').update(text).digest();
};
