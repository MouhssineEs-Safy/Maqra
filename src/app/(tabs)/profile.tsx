import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useProfileStore } from '../../store/useProfileStore';
import { useBookStore } from '../../store/useBookStore';
import { useSessionStore } from '../../store/useSessionStore';
import { StatCard } from '../../components/StatCard';
import { SymbolView } from 'expo-symbols';

export default function ProfileScreen() {
  const { profile } = useProfileStore();
  const books = useBookStore((state) => state.books);
  const sessions = useSessionStore((state) => state.sessions);

  const totalBooksRead = books.filter(b => b.status === 'Completed').length;
  const totalPagesRead = sessions.reduce((sum, s) => sum + s.pagesRead, 0);
  const totalReadingTimeMins = Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / 60);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
             <SymbolView name="person.crop.circle.fill" size={80} tintColor={Colors.majorelleBlue} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.goalText}>Yearly Goal: {profile.yearlyGoal} books</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Statistics</Text>
        
        <View style={styles.statsRow}>
          <StatCard 
            title="Books Read" 
            value={totalBooksRead} 
            icon={<SymbolView name="book.closed.fill" size={24} tintColor={Colors.terracotta} />}
          />
          <StatCard 
            title="Pages Read" 
            value={totalPagesRead} 
            icon={<SymbolView name="doc.text.fill" size={24} tintColor={Colors.mintGreen} />}
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard 
            title="Reading Time" 
            value={`${totalReadingTimeMins}m`} 
            icon={<SymbolView name="clock.fill" size={24} tintColor={Colors.warmBeige} />}
          />
          <StatCard 
            title="Current Streak" 
            value={"12 Days"} 
            icon={<SymbolView name="flame.fill" size={24} tintColor={Colors.terracotta} />}
          />
        </View>

        {/* We would place a Chart component here based on monthly reads */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Reading Activity Chart</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  goalText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: Colors.textMuted,
    fontSize: 16,
  },
});
