import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './models/transaction.schema';
import { Model } from 'mongoose';
import { Wallet } from '../wallet/models/wallet.schema';
import { TRANSACTION_FEE } from 'src/configs/transaction.config';
import { WalletService } from '../wallet/wallet.service';
import ChainUtil from 'src/utils/chain-util';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private readonly walletService: WalletService,
  ) {}

  generateTransaction(to: string, amount: number, type: any) {
    const transaction = new Transaction();
    transaction.type = type;
    transaction.output = {
      to: to,
      amount: amount - TRANSACTION_FEE,
      fee: TRANSACTION_FEE,
    };

    return transaction;
  }

  async createTransaction(
    senderWallet: Wallet,
    to: string,
    amount: number,
    type: any,
  ) {
    if (amount + TRANSACTION_FEE > senderWallet.balance) {
      throw new Error('Amount exceeds balance');
    }

    const transaction = this.generateTransaction(to, amount, type);

    return transaction;
  }

  signTransaction(transaction: Transaction, senderWallet: Wallet) {
    transaction.input = {
      timestamp: Date.now(),
      from: senderWallet.publicKey,
      signature: this.walletService.signTransaction(
        senderWallet,
        ChainUtil.hash(transaction.output),
      ),
    };

    return transaction;
  }

  verifyTransaction(transaction: Transaction) {
    return ChainUtil.verifySignature(
      transaction.input.from,
      transaction.input.signature,
      ChainUtil.hash(transaction.output),
    );
  }

  async getTransactions() {
    return await this.transactionModel.find().exec();
  }
}
