import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './models/wallet.schema';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  signTransaction(wallet: Wallet, dataHash: any) {
    return wallet.keyPair.sign(dataHash);
  }
}
