import React from 'react';
import { View, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
// components
import Text from '../Text';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
import { USER_AVATAR_IMAGE } from '../../utils/constants';
// icons
import ChevronRightIcon from '../../assets/icons/iconChevronRight.svg';

const UserItem = ({ user, onUserClick }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Pressable onPress={() => (onUserClick ? onUserClick() : null)}>
      <View style={styles.userItem}>
        <Image
          source={{
            uri: `${USER_AVATAR_IMAGE}?userId=${user.id}&time=${Date.now()}`,
          }}
          style={[
            styles.userLeft,
            { borderRadius: Math.round(width + height) / 2 },
          ]}
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
