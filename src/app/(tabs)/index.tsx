import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useBookStore } from '../../store/useBookStore';
import { useProfileStore } from '../../store/useProfileStore';
import { BookCard } from '../../components/BookCard';
import { GoalCard } from '../../components/GoalCard';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { SymbolView } from 'expo-symbols';

export default function LibraryScreen() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const books = useBookStore((state) => state.books);
  const addBook = useBookStore((state) => state.addBook);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDummyBook = () => {
    addBook({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      language: 'English',
      totalPages: 218,
      currentPage: 0,
      status: 'To Read',
      rating: 0,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
        <View style={styles.avatar}>
          <SymbolView name="person.crop.circle.fill" size={40} tintColor={Colors.majorelleBlue} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SymbolView name="magnifyingglass" size={20} tintColor={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, authors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard 
            book={item} 
            onPress={() => router.push(`/book/${item.id}`)} 
          />
        )}
        ListHeaderComponent={<GoalCard />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FloatingActionButton onPress={handleAddDummyBook} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
  },
  listContent: {
    paddingBottom: 100,
  },
});
