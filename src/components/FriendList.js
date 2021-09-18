import React, { useEffect } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
// components
import Text from '../components/Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import ChevronRightIcon from '../assets/icons/iconChevronRight.svg';
// images
import Avatar from '../assets/images/avatar.png';
// actions
import { fetchFriends } from '../redux/actions/friend';

const FriendList = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => Object.values(state.friend));

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  const FriendItem = ({ friend }) => (
    <Pressable>
      <View style={styles.friendItem}>
        <Image source={Avatar} style={styles.friendLeft} />
        <View style={styles.friendMid}>
          <View style={styles.friendMidHead}>
            <Text color={Theme.text} size={16}>
              {friend.user.name}
            </Text>
          </View>
        </View>
        <ChevronRightIcon width={24} height={24} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.friendList}>
      {friends.map((friend) => (
        <FriendItem key={friend.user.id} friend={friend} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  // friend
  friendList: {
    backgroundColor: '#0000FF',
    paddingVertical: normalize(8),
  },
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

export default FriendList;
