const { expect } = require('chai');
const { getBytes, keccak256 } = require('ethers');

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

    //from optimism transaction at :
    //https://optimistic.etherscan.io/tx/0x08e18539b6a2b45c74aa3eb4bc769a173baf87b3373437123c9498d72f02c2e2

    const message = "attack at dawn";
    const signatureForMessage = "0xe5d0b13209c030a26b72ddb84866ae7b32f806d64f28136cb5516ab6ca15d3c438d9e7c79efa063198fda1a5b48e878a954d79372ed71922003f847029bf2e751b";
    await this.exercise2.challenge(message, signatureForMessage);
  });
});