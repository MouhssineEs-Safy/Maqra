import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { Colors, Shadows } from '../../constants/Colors';

interface Stat {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

interface StatisticsGridProps {
  stats: Stat[];
}

const StatCard = ({ title, value, icon, color }: Stat) => (
  <View style={styles.card}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <SymbolView name={icon as any} size={24} tintColor={color} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

export const StatisticsGrid = ({ stats }: StatisticsGridProps) => {
  return (
    <View style={styles.grid}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
