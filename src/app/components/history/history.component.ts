import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { GameState } from '../../models/game.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [NgForOf, NgIf],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  standalone: true
})
export class HistoryComponent implements OnInit, OnDestroy {
  gameState!: GameState;
  private subscription!: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = this.gameService.gameState$.subscribe(state => {
      this.gameState = state;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  jumpTo(step: number): void {
    this.gameService.jumpTo(step);
  }
}