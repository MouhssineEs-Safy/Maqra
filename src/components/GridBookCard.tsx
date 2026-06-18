import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Book } from '../types';
import { Colors, Shadows } from '../constants/Colors';
import { SymbolView } from 'expo-symbols';

interface GridBookCardProps {
  book: Book;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // 2 columns with 20px padding on sides and 20px between

export const GridBookCard: React.FC<GridBookCardProps> = ({ book, onPress }) => {
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
        <View style={styles.bookmarkContainer}>
           <SymbolView name="bookmark.fill" size={16} tintColor={Colors.primary} />
        </View>
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
    width: CARD_WIDTH,
    marginBottom: 24,
    alignItems: 'center',
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
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
  bookmarkContainer: {
    position: 'absolute',
    top: 12,
    left: 12, // Since it's Arabic RTL visually, bookmark is on the left side of the cover in the reference
    backgroundColor: Colors.surface,
    padding: 6,
    borderRadius: 12,
    ...Shadows.soft,
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
