import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './models/block.schema';
import { Model } from 'mongoose';
import SHA256 from 'crypto-js/sha256';

@Injectable()
export class BlockchainService {
  private chain: Array<Block>;
  private genesisBlock: Block = new Block(
    Date.now(),
    '',
    '',
    'GENESIS_BLOCK',
    '',
    '',
  );

  constructor(@InjectModel(Block.name) private blockModel: Model<Block>) {
    (async () => {
      this.chain = await this.getBlocks();

      if (this.chain.length === 0) {
        await this.blockModel.create(this.genesisBlock);
      }
    })();
  }

  async getBlocks() {
    return await this.blockModel.find().exec();
  }

  hashBlock(timestamp: number, prevHash: string, data: any) {
    return SHA256(`${timestamp}${prevHash}${data}`).toString();
  }

  async addBlock(prevBlock: Block, data: any) {
    const timestamp = Date.now();
    const prevHash = prevBlock.hash;
    const hash = this.hashBlock(timestamp, prevHash, data);

    const newBlock = new Block(timestamp, prevHash, hash, data, '', '');

    await this.blockModel.create(newBlock);
    this.chain.push(newBlock);
  }

  isValidChain(chain: Array<Block>) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(this.genesisBlock)) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const prevBlock = chain[i - 1];

      if (block.prevHash !== prevBlock.hash) {
        return false;
      }

      if (
        block.hash !==
        this.hashBlock(block.timestamp, block.prevHash, block.data)
      ) {
        return false;
      }
    }

    return true;
  }

  replaceChain(newChain: Array<Block>) {
    if (newChain.length <= this.chain.length) {
      throw new Error('Received chain is not longer than the current chain.');
    }

    if (!this.isValidChain(newChain)) {
      throw new Error('Received chain is invalid.');
    }

    this.chain = newChain;
  }
}
