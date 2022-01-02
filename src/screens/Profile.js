// libraries
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
import { USER_AVATAR_IMAGE } from '../utils/constants';
// components
import Header from '../components/Header';
import Text from '../components/Text';
// icons
import SettingIcon from '../assets/icons/iconSetting.svg';

const Profile = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const auth = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.user);
  const [firstLetterName, setFirstLetterName] = useState('');

  const onImageError = () => {
    const firstLetterName = account.name.split(' ');
    if (firstLetterName.length == 2) {
      setFirstLetterName(
        `${firstLetterName[0].charAt(0)}${firstLetterName[1].charAt(0)}`,
      );
    } else {
      setFirstLetterName(firstLetterName[0].charAt(0));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Profile"
        showBack
        rightContent={
          <Pressable onPress={() => navigation.navigate('Setting')}>
            <SettingIcon width={normalize(24)} height={normalize(24)} />
          </Pressable>
        }
      />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {firstLetterName ? (
            <View
              style={[
                styles.avatar,
                { borderRadius: Math.round(width + height) / 2 },
                styles.avatarText,
              ]}
            >
              <Text color={Theme.white} size={28}>
                {firstLetterName}
              </Text>
            </View>
          ) : (
            <Image
              source={{
                uri: `${USER_AVATAR_IMAGE}?userId=${
                  auth.id
                }&time=${Date.now()}`,
              }}
              style={[
                styles.avatar,
                { borderRadius: Math.round(width + height) / 2 },
              ]}
              onError={(e) => onImageError(e)}
            />
          )}
          <Text size={20} weight={700} style={styles.name}>
            {account.name}
          </Text>
          <Text size={16} weight={400}>
            {account.email}
          </Text>
          <Text size={14} weight={300}>
            {account.totalFriends || 0} Friends
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  content: {
    marginVertical: normalize(16),
    marginHorizontal: normalize(32),
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: normalize(100),
    height: normalize(100),
    marginBottom: normalize(16),
    alignItems: 'center',
    resizeMode: 'contain',
  },
  avatarText: {
    justifyContent: 'center',
    backgroundColor: Theme.primary,
  },
  name: {
    textTransform: 'capitalize',
  },
});

export default Profile;
