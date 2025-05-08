import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { GameState, Player } from '../../models/game.model';
import { SquareComponent } from '../square/square.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [SquareComponent]
})
export class BoardComponent implements OnInit, OnDestroy {
  gameState!: GameState;
  private subscription!: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // Inscrever-se no observável do estado do jogo
    this.subscription = this.gameService.gameState$.subscribe(state => {
      this.gameState = state;
    });
  }

  // Limpar a inscrição quando o componente for destruído
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Método para fazer um movimento no tabuleiro
  makeMove(index: number): void {
    this.gameService.makeMove(index);
  }

  // Método para reiniciar o jogo
  resetGame(): void {
    this.gameService.resetGame();
  }

  // Getter para obter o status atual do jogo
  get status(): string {
    if (this.gameState.winner) {
      return `Vencedor: ${this.gameState.winner}`;
    } else if (this.gameService.isDraw()) {
      return 'Empate!';
    } else {
      return `Próximo jogador: ${this.gameState.xIsNext ? 'X' : 'O'}`;
    }
  }
}