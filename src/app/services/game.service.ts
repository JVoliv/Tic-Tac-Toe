import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState, Player } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Estado inicial do jogo
  private initialState: GameState = {
    squares: Array(9).fill(null),
    xIsNext: true,
    winner: null,
    history: [],
    stepNumber: 0
  };

  // BehaviorSubject para permitir que componentes se inscrevam em mudanças de estado
  private gameStateSubject = new BehaviorSubject<GameState>({...this.initialState});
  
  constructor() {
    this.resetGame();
  }

  // Observable para componentes assinarem
  get gameState$(): Observable<GameState> {
    return this.gameStateSubject.asObservable();
  }

  // Obter o estado atual do jogo
  get gameState(): GameState {
    return this.gameStateSubject.getValue();
  }

  // Realizar um movimento no jogo
  makeMove(squareIndex: number): void {
    // Verifica se o movimento é válido
    if (this.gameState.winner || this.gameState.squares[squareIndex]) {
      return;
    }

    const currentState = this.gameState;
    const squares = [...currentState.squares];
    const history = currentState.history.slice(0, currentState.stepNumber);
    
    // Atualiza o quadrado com o símbolo do jogador atual
    squares[squareIndex] = currentState.xIsNext ? 'X' : 'O';
    
    // Cria um novo estado de jogo
    const newState: GameState = {
      squares,
      xIsNext: !currentState.xIsNext,
      winner: this.calculateWinner(squares),
      history: [...history, {...currentState}],
      stepNumber: currentState.stepNumber + 1
    };
    
    // Atualiza o estado do jogo
    this.gameStateSubject.next(newState);
  }

  // Voltar para um movimento anterior no histórico
  jumpTo(step: number): void {
    if (step < 0 || step >= this.gameState.history.length) {
      return;
    }

    const historyState = this.gameState.history[step];
    const newState: GameState = {
      ...historyState,
      history: this.gameState.history,
      stepNumber: step
    };
    
    this.gameStateSubject.next(newState);
  }

  // Reiniciar o jogo
  resetGame(): void {
    this.gameStateSubject.next({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      history: [],
      stepNumber: 0
    });
  }

  // Calcular o vencedor
  private calculateWinner(squares: Player[]): Player {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
      [0, 4, 8], [2, 4, 6]             // Linhas diagonais
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  // Verificar se o jogo terminou em empate
  isDraw(): boolean {
    return !this.gameState.winner && this.gameState.squares.every(square => square !== null);
  }
}