import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Colors, Shadows } from '../../constants/Colors';
import { Profile } from '../../types';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

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
      <LinearGradient
        colors={[Colors.primary, '#1a4b57']}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTopDecoration} />
      </LinearGradient>

      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={handlePickImage} activeOpacity={0.9} style={styles.avatarWrapper}>
          <Image
            source={profile.photo ? { uri: profile.photo } : require('../../../assets/images/default-avatar.png')}
            style={styles.avatar}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.cameraBadge}>
            <SymbolView name="camera.fill" size={16} tintColor={Colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{profile.name}</Text>
        
        <View style={styles.badgesContainer}>
          <View style={styles.streakBadge}>
            <SymbolView name="flame.fill" size={16} tintColor="#FFF" style={styles.badgeIcon} />
            <Text style={styles.streakBadgeText}>{streak} يوم</Text>
          </View>
          <View style={styles.levelBadge}>
            <SymbolView name="star.fill" size={16} tintColor={Colors.primary} style={styles.badgeIcon} />
            <Text style={styles.levelBadgeText}>{levelBadge}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  headerBackground: {
    position: 'absolute',
    top: -200, // Extend up to cover safe area
    left: 0,
    right: 0,
    height: 350,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    ...Shadows.medium,
  },
  headerTopDecoration: {
    position: 'absolute',
    top: 180,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 40, // Push content down over the gradient
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
    ...Shadows.large,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: Colors.surface,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: Colors.surface,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    ...Shadows.soft,
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.surface, // Name is now white against the dark gradient
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  badgesContainer: {
    flexDirection: 'row-reverse',
    gap: 12,
  },
  streakBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...Shadows.soft,
  },
  streakBadgeText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 6,
  },
  levelBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.soft,
  },
  levelBadgeText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 6,
  },
  badgeIcon: {
    marginLeft: 0,
  }
});
