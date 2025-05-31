import crypto from "crypto";

/**
 * Encrypt a mnemonic using a password.
 */
export const encryptMnemonic = (mnemonic: string, password: string): string => {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(mnemonic, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

/**
 * Decrypt an encrypted mnemonic using a password.
 */
export const decryptMnemonic = (encrypted: string, password: string): string => {
    const [ivHex, encryptedData] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};



/**
 * Generate a 24-word mnemonic and derive its corresponding private key.
 * 
 */

//functionalities for the minting
//1. create an env file that contains the blockfrost api
//2. mintNf.ts: The mintNFT.ts file contains a function that connects to the Cardano blockchain, builds and signs a transaction to mint an NFT with metadata (like name, image, and description), and submits it to the network, returning the transaction hash as confirmation.
//3. server.ts: The server.ts file sets up an Express.js server that exposes an API endpoint (/mint) which receives NFT data from users, calls the mintNFT function to mint the NFT on the Cardano blockchain, and returns the transaction hash as a response.
//4. The Postm2an request sends the NFT details (like name, image, and description) along with the user's private key and wallet address to the /mint endpoint, which triggers the NFT minting process on the Cardano blockchain.

//offchain functionality for wallet generation
//The generateCardanoWallet function generates a new Cardano wallet by creating a 24-word mnemonic, deriving a base and staking key pair from it, and returning the wallet's ADA address, private key, and mnemonic for storage or further use.

//storage system that checks the authentivcity of a product and 





//finally make a request via postman