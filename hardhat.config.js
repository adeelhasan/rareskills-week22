/** @type import('hardhat/config').HardhatUserConfig */
/** @type import "@nomicfoundation/hardhat-toolbox"; */
/** @type import "@nomicfoundation/hardhat-ethers"; */
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
    },
    polygonmain : {
      url: "https://polygon-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY      
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};