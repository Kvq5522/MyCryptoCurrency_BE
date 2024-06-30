import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { WalletService } from '../wallet/wallet.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
  ) {}

  @Get('get-transactions')
  getTransactions() {
    return this.transactionService.getTransactions();
  }

  @Post('transact')
  transact(@Body() body: any) {
    const { to, amount, type, from } = body;

    const transaction = this.transactionService.createTransaction(
      from,
      to,
      amount,
      type,
    );
  }
}
