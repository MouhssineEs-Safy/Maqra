import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Shadows } from '../../../constants/Colors';
import { useBookStore } from '../../../store/useBookStore';
import { useImagePicker } from '../../../hooks/useImagePicker';
import { SymbolView } from 'expo-symbols';
import { Image } from 'expo-image';
import { Language } from '../../../types';

export default function EditBookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const book = useBookStore((state) => state.books.find((b) => b.id === id));
  const updateBook = useBookStore((state) => state.updateBook);
  const { pickImage } = useImagePicker();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [language, setLanguage] = useState<Language>('Arabic');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setTotalPages(book.totalPages.toString());
      setLanguage(book.language);
      setCoverImage(book.coverImage || null);
    }
  }, [book]);

  if (!book) {
    return (
      <View style={styles.centerContainer}>
        <Text>Book not found</Text>
      </View>
    );
  }

  const handleSelectImage = async (useCamera: boolean) => {
    const uri = await pickImage(useCamera);
    if (uri) {
      setCoverImage(uri);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !author.trim() || !totalPages.trim()) {
      Alert.alert('تنبيه', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const pages = parseInt(totalPages, 10);
    if (isNaN(pages) || pages <= 0) {
      Alert.alert('تنبيه', 'يرجى إدخال عدد صفحات صحيح');
      return;
    }

    updateBook(book.id, {
      title: title.trim(),
      author: author.trim(),
      totalPages: pages,
      language,
      coverImage: coverImage || undefined,
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerIcon}>
          <SymbolView name="xmark" size={24} tintColor={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>تعديل الكتاب</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.imageSection}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverPreview} />
            ) : (
              <View style={styles.coverPlaceholder}>
                <SymbolView name="photo" size={40} tintColor={Colors.textMuted} />
              </View>
            )}
            
            <View style={styles.imageButtons}>
              <Pressable style={styles.imageBtn} onPress={() => handleSelectImage(true)}>
                <SymbolView name="camera.fill" size={20} tintColor={Colors.surface} />
                <Text style={styles.imageBtnText}>كاميرا</Text>
              </Pressable>
              <Pressable style={[styles.imageBtn, styles.imageBtnSecondary]} onPress={() => handleSelectImage(false)}>
                <SymbolView name="photo.fill.on.rectangle.fill" size={20} tintColor={Colors.primary} />
                <Text style={[styles.imageBtnText, { color: Colors.primary }]}>معرض</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>عنوان الكتاب</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: العادات الذرية"
              value={title}
              onChangeText={setTitle}
              textAlign="right"
              placeholderTextColor={Colors.textMuted}
            />

            <Text style={styles.label}>اسم المؤلف</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: جيمس كلير"
              value={author}
              onChangeText={setAuthor}
              textAlign="right"
              placeholderTextColor={Colors.textMuted}
            />

            <Text style={styles.label}>عدد الصفحات</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: 320"
              value={totalPages}
              onChangeText={setTotalPages}
              keyboardType="number-pad"
              textAlign="right"
              placeholderTextColor={Colors.textMuted}
            />

            <Text style={styles.label}>اللغة</Text>
            <View style={styles.languageRow}>
              {(['Arabic', 'French', 'English'] as Language[]).map((lang) => (
                <Pressable
                  key={lang}
                  style={[styles.langBtn, language === lang && styles.langBtnActive]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text style={[styles.langText, language === lang && styles.langTextActive]}>
                    {lang === 'Arabic' ? 'العربية' : lang === 'French' ? 'الفرنسية' : 'الإنجليزية'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>حفظ التغييرات</Text>
        </Pressable>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  headerIcon: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  coverPreview: {
    width: 140,
    height: 210,
    borderRadius: 12,
    marginBottom: 16,
    ...Shadows.card,
  },
  coverPlaceholder: {
    width: 140,
    height: 210,
    borderRadius: 12,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Shadows.card,
  },
  imageButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  imageBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  imageBtnSecondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  imageBtnText: {
    color: Colors.surface,
    fontWeight: 'bold',
    marginRight: 8,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'right',
  },
  languageRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  langBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  langBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  langText: {
    color: Colors.textMuted,
    fontWeight: '600',
  },
  langTextActive: {
    color: Colors.surface,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
