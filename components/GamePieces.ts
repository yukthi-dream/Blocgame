export const PIECES = [
  // Single block
  [[1]],
  
  // 2-block pieces
  [[1, 1]],
  [[1], [1]],
  
  // 3-block pieces
  [[1, 1, 1]],
  [[1], [1], [1]],
  [[1, 1], [1]],
  
  // L-shaped pieces
  [[1, 0], [1, 0], [1, 1]],
  [[0, 1], [0, 1], [1, 1]],
  
  // Square piece
  [[1, 1], [1, 1]],
];

export interface Piece {
  shape: number[][];
  color: number;
}

export const generatePieces = (count: number): Piece[] => {
  return Array(count).fill(null).map(() => ({
    shape: PIECES[Math.floor(Math.random() * PIECES.length)],
    color: Math.floor(Math.random() * 5) + 1, // 1-5 for different colors
  }));
};
