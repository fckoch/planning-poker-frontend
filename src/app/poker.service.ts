import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map, Observable } from "rxjs";
import { Player } from "./player";

@Injectable()
export class PokerService {


  constructor(
    private readonly socket: Socket
  ) {}

  sendMessage(eventName: string, msg: string): void {
    this.socket.emit(eventName, msg);
  }

  getMessage(eventName: string): any {
    return this.socket.fromEvent(eventName).pipe(map((data: any) => data.msg));
  }

  listenPlayersUpdate(): Observable<Player[]> {
    return this.socket.fromEvent<Player[]>('select place');
  }

}
