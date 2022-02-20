// libraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
// components
import Input from './Input';
import Button from './Button';
// utils
import { normalize } from '../utils/normalize';
// icons
import SendIcon from '../assets/icons/iconSend.svg';

const Reply = (props) => {
  const {
    text,
    numberOfLines = 1,
    onTextChange,
    placeholder,
    onKeyPress,
    onSendReply,
  } = props;

  return (
    <View style={[styles.chatInputContainer]}>
      <Input
        value={text}
        placeholder={placeholder}
        onChangeText={onTextChange}
        onKeyPress={onKeyPress}
        numberOfLines={numberOfLines}
        rounded={8}
        fontSize={14}
        style={[styles.chatInput]}
        multiline={true}
      />
      <Button
        icon={
          <SendIcon
            width={normalize(24)}
            height={normalize(24)}
            style={[styles.chatButtonIcon]}
          />
        }
        style={styles.chatButton}
        rounded={8}
        onPress={onSendReply}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatInputContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
  },
  chatInput: {
    flex: 1,
    marginRight: normalize(10),
    padding: normalize(12),
  },
  chatButton: {
    position: 'relative',
    padding: normalize(12),
    width: normalize(42),
    height: normalize(42),
  },
  chatButtonIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Reply;
