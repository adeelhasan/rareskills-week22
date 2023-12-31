/// Based on this answer:
/** https://ethereum.stackexchange.com/questions/78815/ethers-js-recover-public-key-from-contract-deployment-via-v-r-s-values/141938#141938
    and
    https://kebabsec.xyz/posts/rareskills-alphagoatclub-ctf/
**/

const { decodeRlp } = require("ethers");

async function getSenderPublicKey(transactionHash) {
    // Fetch the transaction details
    const transaction = await ethers.provider.getTransaction(transactionHash);

    const expandedSig = {
        r: transaction.r,
        s: transaction.s,
        v: transaction.v,
    };

    const signature = transaction.signature;

    const transactionData = {
        gasLimit: transaction.gasLimit,
        value: transaction.value,
        nonce: transaction.nonce,
        data: transaction.data,
        chainId: transaction.chainId,
        to: transaction.to,
        type: transaction.type,
        maxFeePerGas: transaction.maxFeePerGas,
        maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
    };

    const rstransaction = await hre.ethers.resolveProperties(transactionData);
    const raw = ethers.Transaction.from(rstransaction).unsignedSerialized;
    const msgHash = ethers.keccak256(raw);
    const msgBytes = ethers.getBytes(msgHash);

    console.log(signature);
    console.log(msgHash);
    //console.log(raw);

    const publicKey = ethers.SigningKey.recoverPublicKey(msgBytes, signature);
    const address = ethers.recoverAddress(msgBytes, signature);
    const actualAddress = transaction.from;

    if (actualAddress !== address) {
        throw new Error("Failed to recover the public key");
    }

    return publicKey;
}

(async () => {
    //const transactionHash = "0xf25e29a951681c6dc49db7697ba3cafe0574c131e919966519a5ba11293c33ec";
    const transactionHash = "0x09281ab72c20092dc9b414745ef2673116e36dfe069b61d2e37ecb8815b140bf";
    
    const publicKey = await getSenderPublicKey(transactionHash);
    console.log("Sender Public Key:", publicKey);
})();