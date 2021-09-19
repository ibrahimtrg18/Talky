import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
// components
import Text from '../../components/Text';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// icons
import ChevronRightIcon from '../../assets/icons/iconChevronRight.svg';
// images
import Avatar from '../../assets/images/avatar.png';

const FriendItem = ({ user }) => {
  return (
    <Pressable>
      <View style={styles.friendItem}>
        <Image source={Avatar} style={styles.friendLeft} />
        <View style={styles.friendMid}>
          <View style={styles.friendMidHead}>
            <Text color={Theme.text} size={16}>
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
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(8),
  },
  friendLeft: {
    width: 50,
    height: 50,
  },
  friendMid: {
    flex: 1,
    paddingHorizontal: normalize(8),
  },
  friendMidHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FriendItem;
