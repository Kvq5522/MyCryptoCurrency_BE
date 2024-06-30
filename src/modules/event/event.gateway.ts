import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Block } from '../blockchain/models/block.schema';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  private blockchain: Array<Block>;

  constructor(private blockchainService: BlockchainService) {
    (async () => {
      this.blockchain = await this.blockchainService.getBlocks();
    })();
  }

  @SubscribeMessage('SYNC_CHAIN')
  async handleSyncChain() {
    this.server.emit('SYNC_CHAIN', this.blockchain);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async afterInit(socket: Socket) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleConnection(socket: Socket): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  async handleDisconnect(socket: Socket) {
    socket.disconnect();
  }
}
