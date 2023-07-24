// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

contract Exercise2 {
	using ECDSA for bytes32;
    address public verifyingAddress = 0x0000000cCC7439F4972897cCd70994123e0921bC;
    mapping(bytes => bool) public used;

	function challenge(
        string calldata message,
        bytes calldata signature
    ) public {
        bytes32 signedMessageHash = keccak256(abi.encode(message))
            .toEthSignedMessageHash();
        require(
            signedMessageHash.recover(signature) == verifyingAddress,
            "signature not valid"
        );
        
        require(!used[signature]);
        used[signature] = true;
   }


   function verifyHash(bytes32 preCalculatedHash, bytes calldata signature) view external {
        require(preCalculatedHash.recover(signature) == verifyingAddress, "precalculated hash didnt work");
   }

   //the signature as well as the hash are correct
   //what we need to figure out is the correct message to pass to get the expected hash
   //the hash that verifies the transaction is not based on abi.encode version of the transaction data
   //that hash is based on the 

   function challenge2(
    string calldata message,
    bytes calldata signature
    ) public {
        bytes32 signedMessageHash = keccak256(abi.encode(message));
        console.logBytes32(signedMessageHash);
        require(
            signedMessageHash.recover(signature) == verifyingAddress,
            "signature not valid"
        );
        
        require(!used[signature]);
        used[signature] = true;
    }       

}

    /*

        assembly {
            function roundToWord(length) -> numberOfWords {
                numberOfWords := div(length, 0x20)
                if gt(mod(length,0x20),0) {
                    numberOfWords := add(numberOfWords, 1)
                }
            }

            len := calldataload(0x44)
            calldatacopy(mload(0x40),0x64,len)
            messageHash := keccak256(mload(0x40), roundToWord(len))
        }

        */