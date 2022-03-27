import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokerService } from './poker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {


  constructor(
    private readonly pokerService: PokerService
  ) { }

  ngOnInit(): void {
    this.pokerService.sendMessage('Olá');
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
