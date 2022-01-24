// libraries
import React from 'react';
import { SafeAreaView, View, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
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
            userId={auth.id}
            width={150}
            height={150}
          />
          <Text size={20} weight={700} style={styles.name}>
            {account?.name}
          </Text>
          <Text size={16} weight={400}>
            {account?.email}
          </Text>
          <Text size={14} weight={300}>
            {account?.totalFriends || 0} Friends
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
