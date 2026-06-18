import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useBookStore } from '../../store/useBookStore';
import { CategoryPills } from '../../components/CategoryPills';
import { GridBookCard } from '../../components/GridBookCard';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { SymbolView } from 'expo-symbols';

const CATEGORIES = ['كتب عامة', 'الأدب', 'روايات', 'علوم دينية'];

export default function LibraryScreen() {
  const router = useRouter();
  const books = useBookStore((state) => state.books);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  // For dummy purposes, we won't strictly filter by these exact categories since our mock data might not match perfectly,
  // but we will filter by search query.
  const filteredBooks = books.filter(book => 
    book.title.includes(searchQuery) ||
    book.author.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>المكتبة</Text>
      </View>

      <View style={styles.searchContainer}>
        <SymbolView name="magnifyingglass" size={20} tintColor={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن كتاب، مؤلف، أو تصنيف..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.textMuted}
          textAlign="right"
        />
      </View>

      <CategoryPills 
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GridBookCard 
            book={item} 
            onPress={() => router.push(`/book/${item.id}`)} 
          />
        )}
      />

      <FloatingActionButton onPress={() => router.push('/book/add')} iconName="plus" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row', // icon left, input right
    alignItems: 'center',
    backgroundColor: Colors.border,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
  gridContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
});
