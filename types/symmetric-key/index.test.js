import { decrypt, encrypt } from './index.js';
import { randomUUID } from 'node:crypto';
import { expect } from 'chai';

const mockData = {
  plainText: "prince of persia's name",
  password: randomUUID(),
};

describe('Simmetric-key', () => {
  describe('Encryption', () => {
    const encryptedText = encrypt(mockData.plainText, mockData.password);

    Object.assign(mockData, { encryptedText });

    it('Should not be a falsey value', () => {
      expect(Boolean(encryptedText), 'Not a truthy value').to.be.true;
    });

    it('Should return an encrypted text in Hex format', () => {
      expect(encryptedText.match(/[0-9a-f:]+/i), 'Not a valid  hex value.');
    });
  });

  describe('Decryption', () => {
    const decryptedText = decrypt(mockData.encryptedText, mockData.password);

    it('Should not be a falsey value', () => {
      expect(Boolean(decryptedText)).to.be.true;
    });

    it('Should match mocked data', () => {
      expect(decryptedText.toString('utf-8')).to.be.equal(mockData.plainText);
    });
  });
});
