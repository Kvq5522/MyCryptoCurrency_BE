import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as Mongoose from 'mongoose';
import ChainUtil from 'src/utils/chain-util';

export type WalletDocument = HydratedDocument<Wallet>;

export class Wallet {
  @Prop()
  balance: number;

  @Prop({
    type: Mongoose.Schema.Types.Mixed,
  })
  keyPair: any;

  @Prop()
  publicKey: string;

  constructor(secret: string) {
    this.balance = 0;
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic('hex');
  }

  toString() {
    return `Wallet - 
    Balance   : ${this.balance}
    PublicKey : ${this.publicKey}`;
  }
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
