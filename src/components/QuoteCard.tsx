import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../constants/Colors';

export const QuoteCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>اقتباس اليوم</Text>
      <Text style={styles.quote}>
        "كل كتاب تقرأه يمنحك حياة جديدة،{'\n'}وعقلاً جديداً، ورؤية أوسع لهذا العالم"
      </Text>
      <Text style={styles.author}>عباس محمود العقاد</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 16,
    ...Shadows.floating,
  },
  title: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'right',
  },
  quote: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'right',
    marginBottom: 16,
  },
  author: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'left', // Aligned to the opposite side of RTL
  },
});
