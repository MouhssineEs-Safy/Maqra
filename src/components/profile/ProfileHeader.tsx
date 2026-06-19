import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Colors, Shadows } from '../../constants/Colors';
import { Profile } from '../../types';
import * as ImagePicker from 'expo-image-picker';

interface ProfileHeaderProps {
  profile: Profile;
  streak: number;
  levelBadge: string;
  onUpdatePhoto: (uri: string) => void;
}

export const ProfileHeader = ({ profile, streak, levelBadge, onUpdatePhoto }: ProfileHeaderProps) => {
  
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('نحتاج إلى إذن للوصول إلى معرض الصور الخاص بك.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onUpdatePhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
        <View style={styles.avatarContainer}>
          <Image
            source={profile.photo ? { uri: profile.photo } : require('../../../assets/images/default-avatar.png')}
            style={styles.avatar}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.cameraIconContainer}>
            <SymbolView name="camera.fill" size={16} tintColor={Colors.background} />
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{profile.name}</Text>
      
      <View style={styles.badgesContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 {streak} يوماً متتالياً</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: 'rgba(43, 103, 119, 0.1)' }]}>
          <Text style={[styles.badgeText, { color: Colors.primary }]}>⭐ {levelBadge}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.background,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
});
