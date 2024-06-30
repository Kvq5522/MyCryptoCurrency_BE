import { Injectable } from '@nestjs/common';
import { Transaction } from '../transaction/models/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class TrxPoolService {
  private transactions: Array<Transaction>;

  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    private readonly transactionService: TransactionService,
  ) {
    (async () => {
      this.transactions = await this.getTransactions();
    })();
  }

  async getTransactions() {
    return await this.transactionService.getTransactions();
  }

  async addTransaction(transaction: Transaction) {
    await this.transactionModel.create(transaction);
    this.transactions.push(transaction);
  }

  validTransactions() {
    return this.transactions.filter((transaction) => {
      if (!this.transactionService.verifyTransaction(transaction)) {
        return false;
      }

      return true;
    });
  }
}
