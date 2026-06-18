import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

interface CategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        return (
          <Pressable
            key={category}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelect(category)}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row-reverse', // Ensure pills align RTL
  },
  pill: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12, // margin on left for RTL spacing
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  textSelected: {
    color: Colors.surface,
  },
});
