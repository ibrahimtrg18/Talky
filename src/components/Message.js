import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
// libraries
import { useSelector } from 'react-redux';
// components
import Text from './Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
import { getFontWeight } from '../utils/getFontWeight';

const colors = [
  '#cb4d62',
  '#6eb7b4',
  '#c1de3a',
  '#87c06f',
  '#26e05c',
  '#365ba8',
  '#9965c6',
  '#584fcf',
];

const Message = ({ chat, conversation }) => {
  const { type } = conversation;
  const { id, message, user } = chat;
  const auth = useSelector((state) => state.auth);

  const randomColor = useMemo(
    () => Math.floor(Math.random() * colors.length),
    [],
  );

  if (type === 'GROUP') {
    if (auth.id === user.id) {
      return (
        <Text key={id} style={[styles.message, styles.currentUserMessage]}>
          {message}
        </Text>
      );
    } else {
      return (
        <View key={id}>
          <Text key={user.id} color={colors[randomColor]} size={14}>
            {user.name}
          </Text>
          <Text style={[styles.message, styles.otherUserMessage]}>
            {message}
          </Text>
        </View>
      );
    }
  } else {
    if (auth.id === user.id) {
      // current user message
      return (
        <Text key={id} style={[styles.message, styles.currentUserMessage]}>
          {message}
        </Text>
      );
    } else {
      // other user message
      return (
        <Text key={id} style={[styles.message, styles.otherUserMessage]}>
          {message}
        </Text>
      );
    }
  }
};

const styles = StyleSheet.create({
  message: {
    padding: normalize(10),
    marginBottom: 4,
    borderRadius: 8,
  },
  currentUserMessage: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primary,
    color: Theme.white,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.white,
    color: Theme.text,
  },
});

export default Message;
