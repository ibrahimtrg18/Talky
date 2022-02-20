import React from 'react';
import { View, VirtualizedList, Text, StyleSheet } from 'react-native';
// components
import ConversationItem from './ConversationItem';
// utils
import { normalize } from '../../utils/normalize';

const ConversationList = ({ conversations, message }) => {
  if (
    conversations &&
    Array.isArray(conversations) &&
    conversations.length > 0
  ) {
    return (
      <View style={styles.userList}>
        <VirtualizedList
          data={conversations}
          initialNumToRender={4}
          renderItem={({ item }) => {
            if (item.type === 'INDIVIDUAL') {
              return (
                <ConversationItem
                  key={item.id}
                  conversation={item}
                  user={item.users[0]}
                />
              );
            } else if (item.type === 'GROUP') {
              const user = {
                name: 'Group',
              };
              return <ConversationItem key={item.id} user={user} />;
            }
          }}
          keyExtractor={(item) => item.id}
          getItemCount={(data) => data.length}
          getItem={(data, index) => {
            return data[index];
          }}
          style={[styles.list]}
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
  list: {
    paddingVertical: normalize(8),
  },
});

export default ConversationList;
