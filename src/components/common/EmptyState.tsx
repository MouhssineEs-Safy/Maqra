import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../../constants/Colors';

interface EmptyStateProps {
  title: string;
  message: string;
  imageSource?: any;
}

export const EmptyState = ({ title, message, imageSource }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource || require('../../../assets/images/empty-history.png')}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
