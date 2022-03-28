import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerService } from './poker.service';
import { Player } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  players: { [key: number]: Player } = {};
  playerCurrentPosition: number = null;
  player: Player = {
    name: null,
    vote: null
  }

  constructor(
    private readonly pokerService: PokerService
  ) { }

  ngOnInit(): void {
    // this.pokerService.sendMessage('Olá');
    console.log(this.players)
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  changePosition(position: number): void {
    if (this.playerCurrentPosition) {
      this.updatePlayer(this.playerCurrentPosition, null, null);
    }
    this.updatePlayer(position, this.player.name, this.player.vote);
    this.playerCurrentPosition = position;
  }

  updatePlayer(position: number, name: string, vote: number): void {
    this.players[position] = {
      name: name,
      vote: vote
    }
  }

}
