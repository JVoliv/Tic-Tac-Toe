export type Player = 'X' | 'O' | null;

export interface GameState {
  squares: Player[];       // Array representando o estado do tabuleiro
  xIsNext: boolean;        // Indica se é a vez do jogador X
  winner: Player;          // O vencedor do jogo (X, O ou null se não houver)
  history: GameState[];    // Histórico dos estados do jogo
  stepNumber: number;      // Número do movimento atual
}