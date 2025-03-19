import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from './theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return [theme.colors.primary, theme.colors.neonPurple];
      case 'secondary':
        return [theme.colors.secondary, theme.colors.neonBlue];
      case 'glass':
        return ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'];
      default:
        return [theme.colors.primary, theme.colors.neonPurple];
    }
  };

  const buttonStyles = [
    styles.button,
    styles[size],
    variant === 'glass' && styles.glassButton,
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, styles[size]]}
      >
        <Text style={[
          styles.text,
          variant === 'glass' && styles.glassText
        ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.soft,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    minWidth: 100,
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    minWidth: 150,
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    minWidth: 200,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  glassButton: {
    backgroundColor: theme.colors.glassBg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  glassText: {
    color: 'rgba(255,255,255,0.9)',
  },
});
