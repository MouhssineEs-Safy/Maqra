import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Colors } from '../../constants/Colors';

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
        },
        tabBarActiveTintColor: Colors.majorelleBlue,
        tabBarInactiveTintColor: Colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <SymbolView name="books.vertical" size={24} tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <SymbolView name="person" size={24} tintColor={color} />,
        }}
      />
    </Tabs>
  );
}

