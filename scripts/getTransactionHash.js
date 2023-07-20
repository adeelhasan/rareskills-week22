
//the connection API is working
//however the way the provider is interacting / being prepared is faulty
const { encodeRlp, Transaction, AbiCoder, keccak256, Signature, SigningKey, resolveProperties } = require("ethers");
const hre = require("hardhat");

async function main() {
    const tx = await ethers.provider.getTransaction("0xf25e29a951681c6dc49db7697ba3cafe0574c131e919966519a5ba11293c33ec");
    const data = {
        type: 2,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
        maxFeePerGas: tx.maxFeePerGas,
        gasLimit: tx.gasLimit,
        to: tx.to,
        value: tx.value,
        nonce: tx.nonce,
        data: tx.data,
        chainId: tx.chainId,
    };
    //console.log(tx);

    //the hash of the serialized RLP encoded tx data
    //const serializedData = Transaction.from(data).unsignedSerialized;
    //const encodedData = encodeRlp(data);
    //const coder = new AbiCoder.defaultAbiCoder();
    const resolvedData = await resolveProperties(data);
    const serializedData = Transaction.from(resolvedData).unsignedSerialized;
    const hash = keccak256(serializedData);
    const recoveredAddress = SigningKey.recoverPublicKey(hash, tx.signature);

    console.log(recoveredAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});