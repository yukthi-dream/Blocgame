import React, { useState, useEffect, useCallback } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GameBoard } from '../components/GameBoard';
import { theme } from '../components/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import {generatePieceSet} from '../components/PieceGenerator';




const BOARD_SIZE = 10;
const windowWidth = Dimensions.get('window').width;
const BLOCK_SIZE = (windowWidth - theme.spacing.lg * 2 - theme.spacing.sm * 2) / BOARD_SIZE;

export default function GameScreen({ navigation }: any) {  const [board, setBoard] = useState<number[][]>(Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0)));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentPieces, setCurrentPieces] = useState(generatePieceSet(3));
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    loadHighScore();
    setupSound();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const loadHighScore = async () => {
    try {
      const stored = await AsyncStorage.getItem('highScore');
      if (stored) setHighScore(parseInt(stored));
    } catch (e) {
      console.error('Failed to load high score');
    }
  };

  const setupSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/pop.mp3')
    );
    setSound(sound);
  };

  const playSound = async () => {
    try {
      await sound?.replayAsync();
    } catch (e) {
      console.error('Failed to play sound');
    }
  };

  const handlePiecePlacement = useCallback(async (piece: number[][], position: { x: number; y: number }) => {
    // Convert screen coordinates to board coordinates
    const boardX = Math.floor((position.x - boardPosition.x) / BLOCK_SIZE);
    const boardY = Math.floor((position.y - boardPosition.y) / BLOCK_SIZE);

    if (canPlacePiece(board, piece, boardX, boardY)) {
      const newBoard = placePiece(board, piece, boardX, boardY);
      setBoard(newBoard);
      playSound();
      
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      if (linesCleared > 0) {
        const newScore = score + calculateScore(linesCleared);
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          await AsyncStorage.setItem('highScore', newScore.toString());
        }
      }
      setBoard(clearedBoard);
      
      // Generate new pieces if needed
      if (currentPieces.length < 3) {
        setCurrentPieces([...currentPieces, ...generatePieceSet(3 - currentPieces.length)]);
      }
    }
  }, [board, score, highScore]);

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0)));
    setScore(0);
    setGameOver(false);
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, '#2A2A4C']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons name="arrow-left" size={32} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>SCORE</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          <TouchableOpacity onPress={resetGame}>
            <MaterialCommunityIcons name="refresh" size={32} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.boardContainer}>
          <GameBoard board={board} blockSize={BLOCK_SIZE} />
        </View>

        {gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Button title="Play Again" onPress={resetGame} variant="primary" />
            <Button 
              title="Main Menu" 
              onPress={() => navigation.navigate('Home')} 
              variant="glass" 
              style={styles.menuButton} 
            />
          </View>
        )}
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
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  scoreValue: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  boardContainer: {
    alignItems: 'center',
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  gameOverText: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xl,
  },
  menuButton: {
    marginTop: theme.spacing.md,
  },
});
