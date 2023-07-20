const { expect } = require('chai');

// Start test block
describe('Exercise2', function () {
  before(async function () {
    this.Exercise2 = await ethers.getContractFactory('Exercise2');
  });

  beforeEach(async function () {
    this.exercise2 = await this.Exercise2.deploy();
    await this.exercise2.waitForDeployment();
  });

  // Test case
  it('should pass without failing', async function () {
    // Store a value
    //await this.e.store(42);
    let hashBytes = new Uint8Array(32) [
      160,  64, 70,  28,  54, 241, 244, 112,
      114, 233, 79, 125,  25,  70,  27, 225,
      219, 211, 34, 161, 194, 194, 181, 121,
       58, 244, 43,  13, 114, 187, 171,  63
    ];
    const hashString = new TextDecoder().decode(hashBytes);
    await this.exercise2.challenge(hashString,"0xf25e29a951681c6dc49db7697ba3cafe0574c131e919966519a5ba11293c33ec");

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    //expect((await this.box.retrieve()).toString()).to.equal('42');
  });
});