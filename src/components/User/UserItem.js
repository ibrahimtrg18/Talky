import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
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

const UserItem = ({ user, onUserClick }) => {
  const uploadsAPI = new UploadsAPI();

  return (
    <Pressable onPress={() => (onUserClick ? onUserClick() : null)}>
      <View style={styles.userItem}>
        <UserAvatarImage
          name={user?.name}
          src={`${uploadsAPI.userAvatar(user?.avatar)}`}
        />
        <View style={styles.userMid}>
          <View style={styles.userMidHead}>
            <Text style={styles.textTransform} color={Theme.text} size={16}>
              {user.name}
            </Text>
          </View>
        </View>
        <ChevronRightIcon width={24} height={24} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(8),
  },
  userLeft: {
    width: normalize(50),
    height: normalize(50),
  },
  userMid: {
    flex: 1,
    paddingHorizontal: normalize(8),
  },
  userMidHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    textTransform: 'capitalize',
  },
});

export default UserItem;
