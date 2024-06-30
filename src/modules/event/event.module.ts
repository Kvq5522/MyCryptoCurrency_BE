import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from '../blockchain/models/block.schema';
import { BlockchainService } from '../blockchain/blockchain.service';
import { EventGateway } from './event.gateway';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Block.name,
        schema: BlockSchema,
      },
    ]),
    forwardRef(() => BlockchainModule),
  ],
  providers: [BlockchainService, EventGateway],
  exports: [EventGateway],
})
export class EventModule {}
