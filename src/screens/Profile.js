// libraries
import React from 'react';
import { SafeAreaView, View, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
// apis
import UploadsAPI from '../apis/UploadsAPI';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// components
import AppBar from '../components/AppBar';
import Text from '../components/Text';
import UserAvatarImage from '../components/User/UserAvatarImage';
// icons
import SettingIcon from '../assets/icons/iconSetting.svg';

const Profile = ({ navigation }) => {
  const uploadsAPI = new UploadsAPI();
  const auth = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
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
          <UserAvatarImage
            name={account?.name}
            src={`${uploadsAPI.userAvatar(account?.avatar)}`}
            width={normalize(120)}
            height={normalize(120)}
            textSize={40}
            style={[styles.avatar]}
          />
          <Text size={16} weight={700} style={[styles.name]}>
            {account?.name}
          </Text>
          <Text size={10} weight={500} style={[styles.friend]}>
            {account?.totalFriends || 0} Friends
          </Text>
          <Text size={10} weight={500} style={[styles.bio]}>
            {account?.email}
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
    marginBottom: normalize(10),
  },
  avatarText: {
    justifyContent: 'center',
    backgroundColor: Theme.primary,
  },
  name: {
    textTransform: 'capitalize',
    marginBottom: normalize(4),
  },
  friend: {
    marginBottom: normalize(4),
    color: Theme.gray,
  },
  bio: {
    marginBottom: normalize(4),
  },
});

export default Profile;
