export const PIECES = [
  // Single block
  [[1]],
  
  // Two blocks
  [[1, 1]],
  [[1], [1]],
  
  // Three blocks
  [[1, 1, 1]],
  [[1], [1], [1]],
  [[1, 1], [1]],
  
  // Four blocks
  [[1, 1], [1, 1]], // Square
  [[1, 1, 1, 1]], // Line
  [[1], [1], [1], [1]], // Vertical line
  [[1, 1, 1], [0, 1, 0]], // T shape
];

export const generateRandomPiece = (): number[][] => {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
};

export const generatePieceSet = (count: number): number[][][] => {
  return Array(count).fill(0).map(() => generateRandomPiece());
};
