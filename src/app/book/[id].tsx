import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/Colors';
import { useBookStore } from '../../store/useBookStore';
import { useSessionStore } from '../../store/useSessionStore';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { ProgressBar } from '../../components/ProgressBar';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const book = useBookStore((state) => state.books.find((b) => b.id === id));
  const updateProgress = useBookStore((state) => state.updateProgress);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const addSession = useSessionStore((state) => state.addSession);

  const [pagesToLog, setPagesToLog] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  if (!book) {
    return (
      <View style={styles.centerContainer}>
        <Text>Book not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('حذف الكتاب', 'هل أنت متأكد من رغبتك في حذف هذا الكتاب؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => {
        deleteBook(book.id);
        router.back();
      }}
    ]);
  };

  const handleLogReading = () => {
    const pages = parseInt(pagesToLog, 10);
    if (isNaN(pages) || pages <= 0) {
      Alert.alert('تنبيه', 'يرجى إدخال عدد صفحات صحيح');
      return;
    }
    
    // Create a dummy session duration (e.g. 1 minute per page for demo)
    const duration = pages * 60; 
    addSession({
      bookId: book.id,
      startTime: Date.now() - (duration * 1000),
      endTime: Date.now(),
      duration,
      pagesRead: pages
    });

    updateProgress(book.id, pages);
    setPagesToLog('');
    setIsLogging(false);
  };

  const progress = book.totalPages > 0 ? book.currentPage / book.totalPages : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftIcons}>
          <Pressable style={styles.headerIcon} onPress={handleDelete}>
             <SymbolView name="trash" size={24} tintColor={Colors.text} />
          </Pressable>
          <Pressable style={styles.headerIcon} onPress={() => router.push(`/book/edit/${book.id}`)}>
             <SymbolView name="pencil" size={24} tintColor={Colors.text} />
          </Pressable>
          <Pressable style={styles.headerIcon}>
             <SymbolView name="bookmark" size={24} tintColor={Colors.text} />
          </Pressable>
        </View>
        <Pressable style={styles.headerIcon} onPress={() => router.back()}>
           <SymbolView name="arrow.right" size={24} tintColor={Colors.text} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cover */}
        <View style={styles.coverContainer}>
          {book.coverImage ? (
            <Image 
              source={{ uri: book.coverImage }} 
              style={styles.cover} 
              contentFit="cover" 
              transition={300}
            />
          ) : (
            <View style={styles.placeholderCover}>
              <Text style={styles.placeholderText}>{book.title.charAt(0)}</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        {/* Badges */}
        <View style={styles.badgesRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>تطوير الذات</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>{book.totalPages} صفحة</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>اللغة العربية</Text></View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>عن الكتاب</Text>
          <Text style={styles.description}>
            مجموعة من المقالات التي تتناول قضايا اجتماعية وإنسانية بأسلوب أدبي يجمع بين البساطة والعمق، ويدعو للتأمل في تفاصيل الحياة اليومية والوعي بالذات.
          </Text>
        </View>

        {/* Quotes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>أبرز النصوص</Text>
          <View style={styles.quoteCard}>
            <SymbolView name="chevron.left" size={20} tintColor={Colors.textMuted} />
            <Text style={styles.quoteText}>
              "إن أجمل لحظات الحياة هي تلك التي نقضيها في محاولة فهم أنفسنا، بعيداً عن ضجيج توقعات الآخرين."
            </Text>
            <SymbolView name="chevron.right" size={20} tintColor={Colors.textMuted} />
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>تقييمك</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} style={styles.star}>
                <SymbolView 
                  name={star <= (book.rating || 0) ? "star.fill" : "star"} 
                  size={32} 
                  tintColor={star <= (book.rating || 0) ? "#FFD700" : Colors.textMuted} 
                />
              </Pressable>
            ))}
          </View>
        </View>
        
        {/* Padding for absolute button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      {!isLogging ? (
        <View style={styles.footer}>
          <Pressable style={styles.readButton} onPress={() => setIsLogging(true)}>
            <Text style={styles.readButtonText}>قراءة الآن</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.footerLog}>
          <Text style={styles.logTitle}>كم صفحة قرأت اليوم؟</Text>
          <View style={styles.logInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="عدد الصفحات"
              keyboardType="number-pad"
              value={pagesToLog}
              onChangeText={setPagesToLog}
              textAlign="right"
            />
            <Pressable style={styles.logButton} onPress={handleLogReading}>
              <Text style={styles.logButtonText}>حفظ</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={() => setIsLogging(false)}>
              <SymbolView name="xmark" size={20} tintColor={Colors.textMuted} />
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerIcon: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  coverContainer: {
    width: 160,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 24,
    ...Shadows.card,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  badge: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 24,
    textAlign: 'right',
  },
  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    ...Shadows.soft,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  ratingContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: 8,
  },
  star: {
    marginHorizontal: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.background,
  },
  readButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadows.floating,
  },
  readButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerLeftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLog: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.floating,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 12,
  },
  logInputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 16,
  },
  logButton: {
    backgroundColor: Colors.primary,
    height: 48,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 12, // margin on right for RTL
  },
  logButtonText: {
    color: Colors.surface,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 12,
  },
});
