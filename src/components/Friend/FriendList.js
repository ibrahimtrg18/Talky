import React, { useEffect } from 'react';
import { View, VirtualizedList, StyleSheet } from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
// components
import FriendItem from './FriendItem';
// utils
import { normalize } from '../../utils/normalize';
// actions
import { fetchFriends } from '../../redux/actions/friend';

const FriendList = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => Object.values(state.friend));

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  return (
    <View style={styles.friendList}>
      <VirtualizedList
        data={friends}
        initialNumToRender={4}
        renderItem={({ item }) => <FriendItem key={item.id} user={item.user} />}
        keyExtractor={(item) => item.key}
        getItemCount={(data) => data.length}
        getItem={(data, index) => {
          return data[index];
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // friend
  friendList: {
    paddingVertical: normalize(8),
  },
});

export default FriendList;
