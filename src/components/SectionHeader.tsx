import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

interface SectionHeaderProps {
  title: string;
  onPressAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPressAll }) => {
  return (
    <View style={styles.container}>
      {onPressAll && (
        <Pressable onPress={onPressAll}>
          <Text style={styles.viewAll}>عرض الكل</Text>
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
