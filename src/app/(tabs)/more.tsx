import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Shadows } from '../../constants/Colors';
import { useProfileStore } from '../../store/useProfileStore';
import { useBookStore } from '../../store/useBookStore';
import { SymbolView } from 'expo-symbols';

// Reusable Stat Card styled for RTL Arabic theme
const ArabicStatCard = ({ title, value, iconName }: { title: string, value: string | number, iconName: string }) => (
  <View style={styles.statCard}>
    <View style={styles.statIconContainer}>
       <SymbolView name={iconName as any} size={24} tintColor={Colors.primary} />
    </View>
    <View style={styles.statTextContainer}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  </View>
);

export default function MoreScreen() {
  const { profile } = useProfileStore();
  const books = useBookStore((state) => state.books);
  
  const totalBooks = books.filter(b => b.status === 'Completed').length;
  const totalPages = books.reduce((sum, b) => b.status === 'Completed' ? sum + b.totalPages : sum + b.currentPage, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الإحصائيات والملف الشخصي</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
             <SymbolView name="person.crop.circle.fill" size={80} tintColor={Colors.accent} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.streak}>🔥 سلسلة القراءة: 12 يوماً</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <ArabicStatCard title="إجمالي الكتب" value={totalBooks} iconName="book.closed.fill" />
          <ArabicStatCard title="إجمالي الصفحات" value={totalPages} iconName="doc.text.fill" />
          <ArabicStatCard title="وقت القراءة" value="24 س" iconName="clock.fill" />
          <ArabicStatCard title="الهدف السنوي" value={profile.yearlyGoal} iconName="target" />
        </View>

        {/* Chart Placeholder */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>القراءة الشهرية</Text>
          <View style={styles.chartPlaceholder}>
            <SymbolView name="chart.bar.fill" size={48} tintColor={Colors.accent} />
            <Text style={styles.placeholderText}>سيتم عرض الرسم البياني هنا</Text>
          </View>
        </View>

        {/* History Placeholder */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>سجل القراءة</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>قرأت 20 صفحة من العادات الذرية</Text>
            <Text style={styles.historyDate}>اليوم</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>أنهيت كتاب لغز المنزل الغامض</Text>
            <Text style={styles.historyDate}>أمس</Text>
          </View>
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
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    ...Shadows.soft,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  streak: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(43, 103, 119, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTextContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  chartSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 12,
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  placeholderText: {
    marginTop: 12,
    color: Colors.textMuted,
    fontSize: 14,
  },
  historyItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'right',
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 12,
  },
});
