import React from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';
import { Block } from './Block';
import { theme } from './theme';

interface GamePieceProps {
  piece: number[][];
  size: number;
  onDragRelease: (position: { x: number; y: number }) => void;
}

export const GamePiece: React.FC<GamePieceProps> = ({ piece, size, onDragRelease }) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        onDragRelease({ x: gestureState.moveX, y: gestureState.moveY });
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
    >
      {piece.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => (
            cell ? (
              <Block
                key={`${i}-${j}`}
                size={size}
                isActive={true}
                color={theme.colors.neonBlue}
              />
            ) : null
          ))}
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
