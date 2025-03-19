export interface GameState {
  board: number[][];
  score: number;
  highScore: number;
  isGameOver: boolean;
  currentPiece?: number[][];
}

export interface Position {
  row: number;
  col: number;
}

export const BOARD_SIZE = 10;

export const createEmptyBoard = (): number[][] => {
  return Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
};

export const checkGameOver = (board: number[][], piece: number[][]): boolean => {
  // Implementation for checking if the game is over
  return false;
};

export const clearLines = (board: number[][]): { newBoard: number[][], linesCleared: number } => {
  let linesCleared = 0;
  const newBoard = [...board];

  // Check rows
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (newBoard[i].every(cell => cell !== 0)) {
      newBoard[i].fill(0);
      linesCleared++;
    }
  }

  // Check columns
  for (let j = 0; j < BOARD_SIZE; j++) {
    if (board.every(row => row[j] !== 0)) {
      for (let i = 0; i < BOARD_SIZE; i++) {
        newBoard[i][j] = 0;
      }
      linesCleared++;
    }
  }

  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number): number => {
  return linesCleared * 100;
};
