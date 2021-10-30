import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
// components
import Text from '../Text';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// icons
import ChevronRightIcon from '../../assets/icons/iconChevronRight.svg';
// images
import Avatar from '../../assets/images/avatar.png';

const UserItem = ({ user }) => {
  return (
    <Pressable>
      <View style={styles.userItem}>
        <Image source={Avatar} style={styles.userLeft} />
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
    width: 50,
    height: 50,
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
