import { Controller, Get, Post } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { EventGateway } from '../event/event.gateway';

@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly service: BlockchainService,
    private readonly socket: EventGateway,
  ) {}

  @Get('get-blocks')
  getBlocks() {
    return this.service.getBlocks();
  }

  @Post('mine')
  mineBlock() {}
}
