import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Block } from './Block';
import { theme } from './theme';

interface GameBoardProps {
  board: number[][];
  blockSize: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, blockSize }) => {
  return (
    <View style={styles.container}>
      {board.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => (
            <Block
              key={`${i}-${j}`}
              size={blockSize}
              isActive={cell !== 0}
              color={getBlockColor(cell)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const getBlockColor = (value: number): string => {
  const colors = [
    theme.colors.neonBlue,
    theme.colors.neonPink,
    theme.colors.neonPurple,
    theme.colors.success,
    theme.colors.warning,
  ];
  return colors[(value - 1) % colors.length];
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  row: {
    flexDirection: 'row',
  },
});
