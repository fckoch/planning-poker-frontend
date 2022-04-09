import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerService } from './poker.service';
import { ChangePositionMessage, Player } from './player';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  tableSize: 8;
  players: Player[]  = [];
  player: Player = {
    name: null,
    vote: null,
    uuid: uuidv4(),
    position: null
  };

  constructor(
    private readonly pokerService: PokerService
  ) { }

  ngOnInit(): void {
    this.pokerService.listenPlayersUpdate().subscribe((players: Player[]) => {
      this.createPlayers();
      this.mapPlayersToView(players);
    });
  }

  mapPlayersToView(players: Player[]): void {
    players.forEach(p => {
      this.players[p.position] = p;
    });
  }

  createPlayers(): void {
    this.players = [];
    for (let i = 0; i < 8; i++) {
      const player: Player = {
        name: '',
        vote: 0,
        uuid: '',
        position: i
      };
      this.players = [...this.players, player];
    }
  }

  ngOnDestroy(): void {

  }

  changePosition(targetPosition: number): void {
    const changePositionMessage: ChangePositionMessage = {
      player: this.player,
      targetPosition: targetPosition
    }
    const changePositionMessageStr = JSON.stringify(changePositionMessage);
    this.pokerService.sendMessage('select place', changePositionMessageStr);
  }

}
