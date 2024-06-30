import { Module } from '@nestjs/common';
import { TrxPoolController } from './trx-pool.controller';
import { TrxPoolService } from './trx-pool.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionSchema,
} from '../transaction/models/transaction.schema';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionService } from '../transaction/transaction.service';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { Wallet, WalletSchema } from '../wallet/models/wallet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
    TransactionModule,
    WalletModule,
  ],
  controllers: [TrxPoolController],
  providers: [TrxPoolService, TransactionService, WalletService],
})
export class TrxPoolModule {}
