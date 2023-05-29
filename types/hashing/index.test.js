import { expect } from 'chai';
import { hashText } from './index.js';

const mockData = {
  plainText: "victoria's secret",
  hashedText:
    '07b444f4ca826cc5fc8e5cb882dabbdefffcbd6dcc24d066c90cc90a286d28f7',
};

describe('Hashing', () => {
  const hashedText = hashText(mockData.plainText);

  it('Should not be a falsey value', () => {
    expect(Boolean(hashedText.toString('hex')), 'Not a truthy value').to.be
      .true;
  });

  it('Should returned a Buffer from the hased text', () => {
    expect(
      Buffer.isBuffer(hashedText),
      'Returned value is not a Buffer instance'
    );
  });

  it('Should return a hexadecimal value', () => {
    expect(hashedText.toString('hex')).to.match(
      /[0-9a-f:]+/i,
      'Not a valid hex value'
    );
  });

  it('Should match mocked hashed text', () => {
    expect(hashedText.toString('hex')).to.be.equal(mockData.hashedText);
  });
});
