import * as elliptic from 'elliptic';
import { SHA256 } from 'crypto-js';
import { v1 } from 'uuid';

const EDSAA = new elliptic.eddsa('ed25519');

class ChainUtil {
  static genKeyPair(secret: string) {
    return EDSAA.keyFromSecret(secret);
  }

  static genId() {
    return v1();
  }

  static hash(data: any) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey: string, signature: any, dataHash: string) {
    return EDSAA.keyFromPublic(publicKey).verify(dataHash, signature);
  }
}

export default ChainUtil;
