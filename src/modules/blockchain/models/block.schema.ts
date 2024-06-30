import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as Mongoose from 'mongoose';

export type BlockDocument = HydratedDocument<Block>;

@Schema()
export class Block {
  @Prop()
  prevHash: string;

  @Prop()
  hash: string;

  @Prop({ type: Mongoose.Schema.Types.Mixed })
  data: any;

  @Prop()
  validator: string;

  @Prop()
  signature: string;

  @Prop()
  timestamp: number;

  constructor(
    timestamp: number,

    prevHash: string,
    hash: string,
    data: any,
    validator: string,
    signature: string,
  ) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.validator = validator;
    this.signature = signature;
  }

  toString() {
    return `Block - 
    Timestamp : ${this.timestamp}
    Last Hash : ${this.prevHash}
    Hash      : ${this.hash}
    Data      : ${this.data}
    Validator : ${this.validator}
    Signature : ${this.signature}`;
  }
}

export const BlockSchema = SchemaFactory.createForClass(Block);
