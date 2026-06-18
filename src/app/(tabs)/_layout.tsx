import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { SymbolView } from 'expo-symbols';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="more"
        options={{
          title: 'المزيد',
          tabBarIcon: ({ color }) => <SymbolView name="ellipsis" size={24} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'المفضلة',
          tabBarIcon: ({ color }) => <SymbolView name="heart" size={24} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'المكتبة',
          tabBarIcon: ({ color }) => <SymbolView name="books.vertical" size={24} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'المكتبات',
          tabBarIcon: ({ color }) => <SymbolView name="square.grid.2x2" size={24} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color }) => <SymbolView name="house" size={24} tintColor={color} />,
        }}
      />
    </Tabs>
  );
}
