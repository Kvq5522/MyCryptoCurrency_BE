import { forwardRef, Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './models/block.schema';
import { BlockchainController } from './blockchain.controller';
import { EventModule } from '../event/event.module';
import { EventGateway } from '../event/event.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Block.name,
        schema: BlockSchema,
      },
    ]),
    forwardRef(() => EventModule),
  ],
  providers: [BlockchainService, EventGateway],
  controllers: [BlockchainController],
  exports: [BlockchainService],
})
export class BlockchainModule {}
