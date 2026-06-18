import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/Colors';
import { useBookStore } from '../../store/useBookStore';
import { ProgressBar } from '../../components/ProgressBar';
import { SymbolView } from 'expo-symbols';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const book = useBookStore((state) => state.books.find((b) => b.id === id));
  const updateProgress = useBookStore((state) => state.updateProgress);

  const [pagesToLog, setPagesToLog] = useState('');

  if (!book) {
    return (
      <View style={styles.centerContainer}>
        <Text>Book not found</Text>
      </View>
    );
  }

  const progress = book.currentPage / book.totalPages;

  const handleLogReading = () => {
    const pages = parseInt(pagesToLog, 10);
    if (isNaN(pages) || pages <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of pages.');
      return;
    }
    updateProgress(book.id, pages);
    setPagesToLog('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.coverContainer}>
        {/* Full size cover placeholder */}
        <View style={styles.largeCover}>
           <Text style={styles.coverTitle}>{book.title.charAt(0)}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{book.language}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: Colors.surface }]}>
            <Text style={[styles.badgeText, { color: Colors.text }]}>{book.status}</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Reading Progress</Text>
            <Text style={styles.progressText}>
              {book.currentPage} / {book.totalPages} pages ({Math.round(progress * 100)}%)
            </Text>
          </View>
          <ProgressBar progress={progress} height={12} />
        </View>

        <View style={styles.logCard}>
          <Text style={styles.logTitle}>Log Reading</Text>
          <View style={styles.logInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Pages read..."
              keyboardType="number-pad"
              value={pagesToLog}
              onChangeText={setPagesToLog}
            />
            <Pressable style={styles.logButton} onPress={handleLogReading}>
              <Text style={styles.logButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.border,
  },
  largeCover: {
    width: 200,
    height: 300,
    backgroundColor: Colors.majorelleBlue,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.card,
  },
  coverTitle: {
    fontSize: 72,
    fontWeight: 'bold',
    color: Colors.surface,
  },
  detailsContainer: {
    padding: 24,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: Colors.terracotta,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  badgeText: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  logCard: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  logInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 12,
  },
  logButton: {
    backgroundColor: Colors.majorelleBlue,
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logButtonText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
});
