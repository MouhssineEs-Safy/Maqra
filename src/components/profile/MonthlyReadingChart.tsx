import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Colors, Shadows } from '../../constants/Colors';
import { ReadingSession } from '../../types';

interface MonthlyReadingChartProps {
  sessions: ReadingSession[];
}

export const MonthlyReadingChart = ({ sessions }: MonthlyReadingChartProps) => {
  // Aggregate pages read by month for the last 6 months
  const processData = () => {
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const currentMonth = new Date().getMonth();
    const data = [];
    
    // Go back 5 months + current month
    for (let i = 5; i >= 0; i--) {
      let targetMonth = currentMonth - i;
      let targetYear = new Date().getFullYear();
      if (targetMonth < 0) {
        targetMonth += 12;
        targetYear -= 1;
      }
      
      const monthSessions = sessions.filter(s => {
        const d = new Date(s.endTime || s.startTime);
        return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
      });
      
      const pagesRead = monthSessions.reduce((sum, s) => sum + s.pagesRead, 0);
      
      data.push({
        value: pagesRead,
        label: months[targetMonth],
        frontColor: Colors.primary,
      });
    }
    
    return data;
  };

  const barData = processData();
  const maxValue = Math.max(...barData.map(d => d.value), 10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>القراءة الشهرية (صفحات)</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barData}
          barWidth={28}
          spacing={20}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: Colors.textMuted, fontSize: 10 }}
          noOfSections={4}
          maxValue={maxValue + (maxValue * 0.2)}
          isAnimated
          showGradient
          gradientColor={Colors.accent}
          frontColor={Colors.primary}
          labelWidth={40}
          xAxisLabelTextStyle={{ color: Colors.text, fontSize: 10, textAlign: 'center' }}
          rtl={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
