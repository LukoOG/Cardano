import { generateMnemonic, mnemonictoPrivateKey } from "@lucid-evolution/lucid";
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
 */
export const generateWallet = async (): Promise<{ mnemonic: string; privateKey: string }> => {
    const mnemonic = generateMnemonic();
    const privateKey = await mnemonicToPrivateKey(mnemonic);
    return { mnemonic, privateKey };
};

