import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/Colors';
import { useBookStore } from '../../store/useBookStore';
import { useProfileStore } from '../../store/useProfileStore';
import { QuoteCard } from '../../components/QuoteCard';
import { SectionHeader } from '../../components/SectionHeader';
import { HorizontalBookCard } from '../../components/HorizontalBookCard';
import { SymbolView } from 'expo-symbols';

// Reusable Goal Card styled for the new theme
const GoalCard = () => {
  const { profile } = useProfileStore();
  const books = useBookStore((state) => state.books);
  const booksReadThisYear = books.filter(b => b.status === 'Completed').length;
  const progress = profile.yearlyGoal > 0 ? booksReadThisYear / profile.yearlyGoal : 0;

  return (
    <View style={styles.goalCard}>
      <View style={styles.goalContent}>
        <Text style={styles.goalTitle}>هدف القراءة السنوي</Text>
        <Text style={styles.goalSubtitle}>
          قرأت {booksReadThisYear} من أصل {profile.yearlyGoal} كتب
        </Text>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circleBackground}>
           <Text style={styles.circleText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const books = useBookStore((state) => state.books);

  const readingBooks = books.filter(b => b.status === 'Reading' || b.status === 'Completed');
  const recommendedBooks = books.filter(b => b.status === 'To Read');
  // For dummy purposes, we'll just slice some books for favorites
  const favoriteBooks = books.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
             <View style={styles.avatar}>
               <SymbolView name="person.fill" size={24} tintColor={Colors.primary} />
             </View>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingTitle}>مرحباً {profile.name}</Text>
            <Text style={styles.greetingSubtitle}>طبت وطابت قراءتك</Text>
          </View>
        </View>

        {/* Goal Card */}
        <GoalCard />

        {/* Quote Card */}
        <QuoteCard />

        {/* Continue Reading Section */}
        <SectionHeader title="واصل القراءة" onPressAll={() => {}} />
        <FlatList
          horizontal
          inverted // RTL scroll
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          data={readingBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HorizontalBookCard 
              book={item} 
              onPress={() => router.push(`/book/${item.id}`)} 
              showProgress 
            />
          )}
        />

        {/* Recommended Section */}
        <SectionHeader title="مختارات لك" onPressAll={() => {}} />
        <FlatList
          horizontal
          inverted // RTL scroll
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          data={recommendedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HorizontalBookCard 
              book={item} 
              onPress={() => router.push(`/book/${item.id}`)} 
            />
          )}
        />

        {/* Favorites Section */}
        <SectionHeader title="الكتب المفضلة" onPressAll={() => {}} />
        <FlatList
          horizontal
          inverted // RTL scroll
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          data={favoriteBooks}
          keyExtractor={(item) => `fav-${item.id}`}
          renderItem={({ item }) => (
            <HorizontalBookCard 
              book={item} 
              onPress={() => router.push(`/book/${item.id}`)} 
            />
          )}
        />
        
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  avatarContainer: {
    marginLeft: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
  },
  greetingSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  goalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  goalContent: {
    flex: 1,
    marginLeft: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  circleContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
