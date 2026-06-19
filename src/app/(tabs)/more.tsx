import React from 'react';
import { View, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useProfileStore } from '../../store/useProfileStore';
import { useBookStore } from '../../store/useBookStore';
import { useSessionStore } from '../../store/useSessionStore';

// Components
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { StatisticsGrid } from '../../components/profile/StatisticsGrid';
import { MonthlyReadingChart } from '../../components/profile/MonthlyReadingChart';
import { ReadingHistoryList } from '../../components/profile/ReadingHistoryList';
import { SettingsMenu } from '../../components/profile/SettingsMenu';

export default function MoreScreen() {
  const { profile, updateProfile, resetStatistics } = useProfileStore();
  const { books, deleteAllBooks } = useBookStore();
  const { sessions, deleteAllSessions } = useSessionStore();
  
  const totalBooks = books.filter(b => b.status === 'Completed').length;
  const totalPages = books.reduce((sum, b) => b.status === 'Completed' ? sum + b.totalPages : sum + b.currentPage, 0);
  const totalReadingTime = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalReadingHours = Math.floor(totalReadingTime / 3600);

  // Compute Streak and Level
  const streak = 12; 
  const levelBadge = totalBooks > 10 ? 'قارئ متقدم' : totalBooks > 5 ? 'قارئ نشط' : 'قارئ مبتدئ';

  const stats = [
    { title: 'الكتب المقروءة', value: totalBooks, icon: 'book.closed.fill', color: Colors.primary },
    { title: 'إجمالي الصفحات', value: totalPages, icon: 'doc.text.fill', color: '#4CAF50' },
    { title: 'ساعات القراءة', value: `${totalReadingHours} س`, icon: 'clock.fill', color: '#FF9800' },
    { title: 'الهدف السنوي', value: profile.yearlyGoal, icon: 'target', color: '#E91E63' },
  ];

  const handleUpdatePhoto = (uri: string) => {
    updateProfile({ photo: uri });
  };

  const confirmAction = (title: string, message: string, onConfirm: () => void) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تأكيد', style: 'destructive', onPress: onConfirm }
      ]
    );
  };

  const settingsSections = [
    {
      title: 'الإعدادات العامة',
      items: [
        { title: 'تعديل الملف الشخصي', icon: 'person.crop.circle', onPress: () => {}, color: Colors.primary },
        { title: 'تغيير لغة التطبيق', icon: 'globe', onPress: () => {}, color: '#2196F3' },
        { title: 'تحديث هدف القراءة', icon: 'flag', onPress: () => {}, color: '#4CAF50' },
        { title: 'إعدادات الإشعارات', icon: 'bell.fill', onPress: () => updateProfile({ notifications: !profile.notifications }), color: '#FF9800' },
        { title: 'المظهر (ليلي/نهاري)', icon: 'moon.fill', onPress: () => updateProfile({ theme: profile.theme === 'dark' ? 'light' : 'dark' }), color: '#673AB7' },
      ]
    },
    {
      title: 'إدارة البيانات (خطر)',
      items: [
        { 
          title: 'حذف جميع الكتب', 
          icon: 'trash.fill', 
          isDestructive: true,
          onPress: () => confirmAction('حذف جميع الكتب', 'هل أنت متأكد من حذف جميع الكتب؟ لا يمكن التراجع عن هذا الإجراء.', deleteAllBooks) 
        },
        { 
          title: 'مسح سجل القراءة بالكامل', 
          icon: 'clock.badge.xmark', 
          isDestructive: true,
          onPress: () => confirmAction('مسح السجل', 'هل أنت متأكد من مسح سجل القراءة بالكامل؟', deleteAllSessions) 
        },
        { 
          title: 'إعادة ضبط الإحصائيات لصفر', 
          icon: 'arrow.counterclockwise', 
          isDestructive: true,
          onPress: () => confirmAction('إعادة الضبط', 'هل أنت متأكد من إعادة ضبط جميع الإحصائيات؟', resetStatistics) 
        },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <ProfileHeader 
          profile={profile} 
          streak={streak} 
          levelBadge={levelBadge} 
          onUpdatePhoto={handleUpdatePhoto} 
        />
        
        <View style={styles.bodyContent}>
          <StatisticsGrid stats={stats} />
          <MonthlyReadingChart sessions={sessions} />
          <ReadingHistoryList sessions={sessions} books={books} />
          <SettingsMenu sections={settingsSections} />
        </View>
      </ScrollView>
    </View>
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
  bodyContent: {
    paddingHorizontal: 20,
    marginTop: 10,
  }
});
