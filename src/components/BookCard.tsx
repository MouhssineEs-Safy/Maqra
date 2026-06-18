import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Book } from '../types';
import { Colors, Shadows } from '../constants/Colors';
import { ProgressBar } from './ProgressBar';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const progress = book.currentPage / book.totalPages;

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
      </View>
      
      <View style={styles.content}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
          <Text style={styles.language}>{book.language}</Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}% Done
            </Text>
          </View>
          <ProgressBar progress={progress} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    ...Shadows.card,
  },
  imageContainer: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.soft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.majorelleBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  language: {
    fontSize: 12,
    color: Colors.terracotta,
    fontWeight: '500',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
