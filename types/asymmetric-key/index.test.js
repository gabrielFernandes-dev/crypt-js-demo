import { decryptText, encryptText } from './index.js';
import { expect } from 'chai';

const mockData = {
  plainText: "batman's social security number",
};

describe('Asymmetric-key', () => {
  describe('Public-key encription', () => {
    const encryptedText = encryptText(mockData.plainText);

    mockData.encryptedText = encryptedText.toString('hex');

    it('Should not be a falsey value', () => {
      expect(Boolean(encryptedText.toString('hex')), 'Not a truthy value').not
        .to.be.false;
    });

    it('Should returnd a Buffer instance', () => {
      expect(encryptedText instanceof Buffer).to.be.true;
    });

    it('Should return a hexadecimal value', () => {
      expect(encryptedText.toString('hex')).to.match(
        /[0-9a-f:]+/i,
        'Not a valid hex value'
      );
    });
  });

  describe('Private-key decription', () => {
    const decryptedText = decryptText(
      Buffer.from(mockData.encryptedText, 'hex')
    );

    it('Should not be a falsey value', () => {
      expect(Boolean(decryptedText), 'Not a truthy value').not.to.be.false;
    });

    it('Should returnd a Buffer instance', () => {
      expect(Buffer.isBuffer(decryptedText), 'Not a instance of Buffer').to.be
        .true;
    });

    it('Should match the mock data', () => {
      expect(decryptedText.toString('utf-8')).to.be.equal(mockData.plainText);
    });
  });
});
