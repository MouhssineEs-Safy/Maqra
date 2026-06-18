import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Book } from '../types';
import { Colors, Shadows } from '../constants/Colors';
import { ProgressBar } from './ProgressBar';

interface HorizontalBookCardProps {
  book: Book;
  onPress: () => void;
  showProgress?: boolean;
}

export const HorizontalBookCard: React.FC<HorizontalBookCardProps> = ({ book, onPress, showProgress }) => {
  const progress = book.totalPages > 0 ? book.currentPage / book.totalPages : 0;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        {book.coverImage ? (
          <Image source={book.coverImage} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>{book.title.charAt(0)}</Text>
          </View>
        )}
        {showProgress && (
          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} height={4} color={Colors.primary} backgroundColor="rgba(255,255,255,0.5)" />
          </View>
        )}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    marginBottom: 12,
    ...Shadows.soft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
