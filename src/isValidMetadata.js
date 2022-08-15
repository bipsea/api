import axios from "axios";

/**
 * Validate Lit evmContractConditions with on chain data
 * @param _metadataUri JSON _metadata from IPFS
 * @returns true if valid, false if not
 */
export default async function isValid_metadata(_metadata) {
  try {
    // get contract addresses from github
    const contractAddresses = await axios.get("https://raw.githubusercontent.com/bipsea/contract/main/contractAddresses.json").then((res) => res.data);
    // get contract address
    const contractAddress = contractAddresses[_metadata.chain];
    if (!contractAddress) throw new Error("No contract address found");

    // check title
    const isValidTitle = typeof _metadata.title === "string" && _metadata.title.length > 0;
    // check description
    const isValidDescription = typeof _metadata.description === "string" && _metadata.description.length > 0;
    // check chain
    const isValidChain = typeof _metadata.chain === "string" && _metadata.chain.length > 0 && _metadata.chain === _metadata.evmContractConditions[0].chain && _metadata.chain === _metadata.evmContractConditions[2].chain && _metadata.chain === _metadata.evmContractConditions[4].chain;
    // check price
    const isValidPrice = !isNaN(_metadata.price) && _metadata.price === _metadata.evmContractConditions[2].returnValueTest.value && "price" === _metadata.evmContractConditions[2].returnValueTest.key && "=" === _metadata.evmContractConditions[2].returnValueTest.comparator;
    // check seller
    const isValidSeller = typeof _metadata.seller === "string" && _metadata.seller.length > 0 && _metadata.seller === _metadata.evmContractConditions[0].returnValueTest.value && "seller" === _metadata.evmContractConditions[0].returnValueTest.key && "=" === _metadata.evmContractConditions[0].returnValueTest.comparator;
    // check itemId
    const isValidItemId = !isNaN(_metadata.itemId) && _metadata.itemId === _metadata.evmContractConditions[0].functionParams[0] && _metadata.itemId === _metadata.evmContractConditions[2].functionParams[0] && _metadata.itemId === _metadata.evmContractConditions[4].functionParams[0] && "purchase" === _metadata.evmContractConditions[4].functionName && "true" === _metadata.evmContractConditions[4].returnValueTest.value;
    // check filename
    const isValidFilename = typeof _metadata.filename === "string" && _metadata.filename.length > 0;
    // check encryptedFileUri
    const isValidEncryptedFileUri = typeof _metadata.encryptedFileUri === "string" && _metadata.encryptedFileUri.length > 0;
    // check evmContractConditions
    const isValidEvmContractConditions = _metadata.evmContractConditions.length === 5;
    // check encryptedSymmetricKey
    const isValidEncryptedSymmetricKey = typeof _metadata.encryptedSymmetricKey === "string" && _metadata.encryptedSymmetricKey.length > 0;
    // check contract address
    const isValidContractAddress = contractAddress === _metadata.evmContractConditions[0].contractAddress && contractAddress === _metadata.evmContractConditions[2].contractAddress && contractAddress === _metadata.evmContractConditions[4].contractAddress;

    // console.log({ isValidTitle, isValidDescription, isValidChain, isValidPrice, isValidSeller, isValidItemId, isValidFilename, isValidEncryptedFileUri, isValidEvmContractConditions, isValidEncryptedSymmetricKey, isValidContractAddress });
    return isValidTitle && isValidDescription && isValidChain && isValidPrice && isValidSeller && isValidItemId && isValidFilename && isValidEncryptedFileUri && isValidEvmContractConditions && isValidEncryptedSymmetricKey && isValidContractAddress;
  } catch (err) {
    console.error(err);
    return false;
  }
}
