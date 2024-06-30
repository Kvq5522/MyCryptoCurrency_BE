import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as Mongoose from 'mongoose';
import ChainUtil from 'src/utils/chain-util';

export type TransactionDocument = HydratedDocument<Transaction>;

export class Transaction {
  @Prop()
  trxId: string;

  @Prop()
  type: string;

  @Prop({
    type: Mongoose.Schema.Types.Mixed,
  })
  input: any;

  @Prop({
    type: Mongoose.Schema.Types.Mixed,
  })
  output: any;

  constructor() {
    this.trxId = ChainUtil.genId();
    this.type = null;
    this.input = null;
    this.output = null;
  }
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
