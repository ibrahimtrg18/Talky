import React from 'react';
import { View, VirtualizedList, Text, StyleSheet } from 'react-native';
// components
import UserItem from './UserItem';
// utils
import { normalize } from '../../utils/normalize';

const UserList = ({ users, type, message }) => {
  if (users && Array.isArray(users) && users.length > 0) {
    return (
      <View style={styles.userList}>
        <Text>{type}</Text>
        <VirtualizedList
          data={users}
          initialNumToRender={4}
          renderItem={({ item }) => <UserItem key={item.id} user={item} />}
          keyExtractor={(item) => item.id}
          getItemCount={(data) => data.length}
          getItem={(data, index) => {
            return data[index];
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>{message ? message : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // friend
  userList: {
    paddingVertical: normalize(8),
  },
});

export default UserList;
