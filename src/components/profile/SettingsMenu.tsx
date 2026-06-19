import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { Colors } from '../../constants/Colors';

interface MenuItem {
  title: string;
  icon: string;
  onPress: () => void;
  color?: string;
  isDestructive?: boolean;
}

interface SettingsMenuProps {
  sections: {
    title: string;
    items: MenuItem[];
  }[];
}

export const SettingsMenu = ({ sections }: SettingsMenuProps) => {
  return (
    <View style={styles.container}>
      {sections.map((section, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, itemIdx) => (
              <TouchableOpacity 
                key={itemIdx} 
                style={[
                  styles.menuItem,
                  itemIdx === section.items.length - 1 ? styles.lastMenuItem : null
                ]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <SymbolView name="chevron.left" size={16} tintColor={Colors.textMuted} />
                <View style={styles.menuItemRight}>
                  <Text style={[
                    styles.menuItemText,
                    item.isDestructive ? { color: '#F44336' } : null
                  ]}>
                    {item.title}
                  </Text>
                  <View style={[
                    styles.iconContainer,
                    item.isDestructive ? { backgroundColor: 'rgba(244, 67, 54, 0.1)' } : { backgroundColor: `${item.color || Colors.primary}15` }
                  ]}>
                    <SymbolView 
                      name={item.icon as any} 
                      size={20} 
                      tintColor={item.isDestructive ? '#F44336' : (item.color || Colors.primary)} 
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'right',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    marginRight: 12,
    fontWeight: '500',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
