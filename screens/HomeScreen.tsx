import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { theme } from '../components/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={[theme.colors.background, '#2A2A4C']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <MaterialCommunityIcons 
            name="puzzle" 
            size={48} 
            color={theme.colors.neonBlue} 
          />
          <Text style={styles.title}>BLOCK PUZZLE</Text>
          <Text style={styles.subtitle}>NEON EDITION</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="PLAY NOW"            onPress={() => navigation.navigate('Game')}
            size="large"
            style={styles.button}
          />
          <Button
            title="LEADERBOARD"            onPress={() => navigation.navigate('Game')}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title="STORE"            onPress={() => navigation.navigate('Game')}
            variant="glass"
            style={styles.button}
          />
          <Button
            title="SETTINGS"            onPress={() => navigation.navigate('Game')}
            variant="glass"
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>HIGH SCORE: 12,450</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xl * 2,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.neonBlue,
    marginTop: theme.spacing.xs,
    letterSpacing: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
  footer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
});
