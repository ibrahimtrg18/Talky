import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// apis
import UploadsAPI from '../../apis/UploadsAPI';
// components
import Text from '../Text';
import UserAvatarImage from './UserAvatarImage';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// icons
import ChevronRightIcon from '../../assets/icons/iconChevronRight.svg';

const UserItem = ({ user }) => {
  const uploadsAPI = new UploadsAPI();
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('Profile', {
      userId: user.id,
    });
  };

  const renderDescription = (user) => {
    const totalFriends = user.total_friends;

    if (user.friends && Array.isArray(user.friends) && user.friends > 0) {
      const friendStatus = user.friends[0]?.status || null;
      if (friendStatus) {
        switch (friendStatus) {
          case 'AGREEMENT':
            return 'Requesting';
          case 'ACCEPT':
            return 'Friend';
          default:
            return `${totalFriends} friends`;
        }
      }
    } else {
      return `${totalFriends} friends`;
    }
  };

  return (
    <Pressable onPress={onClick} android_ripple={{ color: Theme.gray100 }}>
      <View style={styles.userItemContainer}>
        <UserAvatarImage
          name={user?.name}
          src={`${uploadsAPI.userAvatar(user?.avatar)}`}
          width={normalize(48)}
          height={normalize(48)}
          style={[styles.userItemAvatar]}
        />
        <View style={styles.userItemMain}>
          <Text
            style={styles.userName}
            color={Theme.text}
            weight={600}
            size={16}
          >
            {user.name}
          </Text>
          {user.total_friends && (
            <Text
              style={styles.userFriend}
              color={Theme.dark}
              weight={400}
              size={14}
            >
              {renderDescription(user)}
            </Text>
          )}
        </View>
        <ChevronRightIcon width={24} height={24} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(20),
  },
  userItemAvatar: {
    marginRight: normalize(16),
  },
  userItemMain: {
    flex: 1,
  },
  userName: {
    textTransform: 'capitalize',
  },
});

export default UserItem;
