import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './theme';

interface BlockProps {
  color?: string;
  size: number;
  isActive?: boolean;
}

export const Block: React.FC<BlockProps> = ({ color = theme.colors.neonBlue, size, isActive = true }) => {
  if (!isActive) return <View style={[styles.empty, { width: size, height: size }]} />;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LinearGradient
        colors={[color, color.replace('1)', '0.7)')]}
        style={styles.block}
      >
        <View style={styles.shine} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  block: {
    flex: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    margin: 1,
  },
  shine: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
  },
});
