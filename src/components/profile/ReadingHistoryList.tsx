import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ReadingSession, Book } from '../../types';
import { EmptyState } from '../common/EmptyState';

interface ReadingHistoryListProps {
  sessions: ReadingSession[];
  books: Book[];
}

export const ReadingHistoryList = ({ sessions, books }: ReadingHistoryListProps) => {
  if (sessions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>سجل القراءة</Text>
        <EmptyState 
          title="لا يوجد سجل" 
          message="ابدأ بقراءة كتاب لتسجيل تقدمك هنا"
        />
      </View>
    );
  }

  // Sort sessions newest first
  const sortedSessions = [...sessions].sort((a, b) => (b.endTime || b.startTime) - (a.endTime || a.startTime));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    
    if (isToday) return 'اليوم';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سجل القراءة</Text>
      {sortedSessions.slice(0, 5).map((session) => {
        const book = books.find(b => b.id === session.bookId);
        return (
          <View key={session.id} style={styles.historyItem}>
            <View style={styles.historyContent}>
              <Text style={styles.historyText}>
                قرأت {session.pagesRead} صفحة من <Text style={styles.bookTitle}>{book?.title || 'كتاب محذوف'}</Text>
              </Text>
              <Text style={styles.historyTime}>{Math.round(session.duration / 60)} دقيقة</Text>
            </View>
            <Text style={styles.historyDate}>{formatDate(session.endTime || session.startTime)}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  historyText: {
    fontSize: 15,
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 4,
  },
  bookTitle: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  historyTime: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '600',
  },
  historyDate: {
    fontSize: 13,
    color: Colors.textMuted,
    marginLeft: 16,
  },
});
