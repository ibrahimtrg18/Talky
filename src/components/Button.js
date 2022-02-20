import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
// components
import Text from './Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const CustomButton = (props) => {
  const { title, icon, rounded, style, textColor, disabled, ...restProps } =
    props;

  const customRounded = rounded && { borderRadius: rounded };
  const customTextColor = textColor && { color: textColor };
  const customDisabled = disabled && { backgroundColor: Theme.lightPrimary };

  if (!title && !icon) {
    return null;
  }

  return (
    <Pressable
      {...restProps}
      style={[styles.button, customRounded, style, customDisabled]}
    >
      {icon ? (
        icon
      ) : (
        <Text style={[styles.text, customTextColor]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primary,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
  },
  text: {
    color: Theme.white,
    fontSize: normalize(18),
  },
});

export default CustomButton;
