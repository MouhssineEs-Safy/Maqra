import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../constants/Colors';
import { useProfileStore } from '../store/useProfileStore';
import { useBookStore } from '../store/useBookStore';

export const GoalCard: React.FC = () => {
  const { profile } = useProfileStore();
  const books = useBookStore((state) => state.books);
  
  const booksReadThisYear = books.filter(b => b.status === 'Completed').length;
  const progress = profile.yearlyGoal > 0 ? booksReadThisYear / profile.yearlyGoal : 0;
  
  // Basic circular representation using border radius and overlapping views.
  // For a true SVG circle, we'd use react-native-svg, but we can stick to a simpler UI for now.
  
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>Annual Reading Goal</Text>
        <Text style={styles.subtitle}>
          {booksReadThisYear} of {profile.yearlyGoal} books read
        </Text>
      </View>
      
      <View style={styles.circleContainer}>
        <View style={styles.circleBackground}>
           <Text style={styles.circleText}>{Math.round(progress * 100)}%</Text>
        </View>
        {/* We would overlay a semi-circle or use SVG here for the actual ring progress */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  circleContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: Colors.mintGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
