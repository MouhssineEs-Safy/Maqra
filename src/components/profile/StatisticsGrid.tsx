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
      <SymbolView name={icon as any} size={28} tintColor={color} />
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
    marginBottom: 30,
  },
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...Shadows.medium,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    alignItems: 'center',
  },
  value: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
