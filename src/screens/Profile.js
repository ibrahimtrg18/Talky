// libraries
import React, { useEffect } from 'react';
import { SafeAreaView, View, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// apis
import UploadsAPI from '../apis/UploadsAPI';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// components
import AppBar from '../components/AppBar';
import Text from '../components/Text';
import UserAvatarImage from '../components/User/UserAvatarImage';
// actions
import { fetchUser } from '../redux/actions';
// icons
import SettingIcon from '../assets/icons/iconSetting.svg';

const Profile = ({ navigation, route }) => {
  const { userId, isOwnProfile } = route.params;
  const uploadsAPI = new UploadsAPI();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) dispatch(fetchUser(userId));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title={isOwnProfile ? 'Profile' : user?.name}
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
            name={user?.name}
            src={`${uploadsAPI.userAvatar(user?.avatar)}`}
            width={normalize(120)}
            height={normalize(120)}
            textSize={40}
            style={[styles.avatar]}
          />
          <Text size={16} weight={700} style={[styles.name]}>
            {user?.name}
          </Text>
          <Text size={10} weight={500} style={[styles.friend]}>
            {user?.totalFriends || 0} Friends
          </Text>
          <Text size={10} weight={500} style={[styles.bio]}>
            {user?.email}
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
