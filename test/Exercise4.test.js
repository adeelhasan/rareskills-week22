const { expect } = require('chai');
const { getBytes, keccak256, AbiCoder, Signature } = require('ethers');

// Start test block
describe('Exercise4', function () {
  before(async function () {
    this.Exercise4 = await ethers.getContractFactory('Week22Exercise4');
  });

  beforeEach(async function () {
    this.exercise4 = await this.Exercise4.deploy();
    await this.exercise4.waitForDeployment();
  });

  // Test case
  it('should pass without failing', async function () {

    //calculated from python script, and based on the public key of the polygon transaction
    //const calculatedHash = "0xb6d8d05c2b97d08927dbdb647e8a15f91846104ad1d34be5fa138cb7e3cbde06";
    //const signature = "0x2ad5e3fdc18939c174cfb07e0af9b246c6224318b06093699d156dd59d4ecdec71f72ba5934bf833477bd07036999e4335d10be47721b15d6f560388a91debe9";

    //based on transaction hash from polygon transaction
    const calculatedHash = "0xa0eea3cd5ae052d3ffe50ec82baa3e4f0deb99c6537d1de6ae43d51cd1fbb0f8";
    const signature = "0x9ef4899e556330b0c4e764d90b7a4c864ef03ba9725aa694ac67783bcf004aa00c01b87088c349649c938589f7b9f633f28ada510ee3e57d2d559fb8fc9da10e";

    let evenBytes = getBytes(signature); //64 bytes
    let signatureBytes = new Uint8Array(65);
    signatureBytes[64] = 28;
    signatureBytes.set(evenBytes, 0);


    //await this.exercise4.claimAirdrop(100, calculatedHash, AbiCoder.defaultAbiCoder().encode(["bytes"],signatureBytes));
    await this.exercise4.claimAirdrop(100, calculatedHash, signatureBytes);
    expect(await this.exercise4.hacked()).to.be.true;

  });
});