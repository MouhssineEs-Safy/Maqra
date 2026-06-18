import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { Colors, Shadows } from '../constants/Colors';
import { SymbolView } from 'expo-symbols';

interface FABProps {
  onPress: () => void;
  iconName?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FloatingActionButton: React.FC<FABProps> = ({ onPress, iconName = 'plus' }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[styles.fab, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <SymbolView name={iconName as any} size={28} tintColor={Colors.surface} />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.card,
    elevation: 8,
  },
});
