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
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 8,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Theme.primary,
    color: Theme.white,
    elevation: 5,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.white,
    color: Theme.text,
    elevation: 5,
  },
});

export default Message;
