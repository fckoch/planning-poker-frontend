import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs";

@Injectable()
export class PokerService {

  constructor(
    private readonly socket: Socket
  ) {}

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  getMessage(): any {
    return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  }

}
