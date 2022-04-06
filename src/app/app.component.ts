import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerService } from './poker.service';
import { Player } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  players: { [key: number]: Player } = {};
  player: Player = {
    name: null,
    vote: null,
    position: null
  }

  constructor(
    private readonly pokerService: PokerService
  ) { }

  ngOnInit(): void {
    this.pokerService.listenPlayersUpdate().subscribe((players: Player[]) => {
      this.players = players;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  changePosition(position: number): void {
    this.player.position = position;
    const player = JSON.stringify(this.player);
    this.pokerService.sendMessage('select place', player);
  }

  updatePlayer(name: string, vote: number, position: number): void {
    this.players[position] = {
      name: name,
      vote: vote,
      position: position
    }
  }

}
