import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// components
import Text from './Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
import { getFontWeight } from '../utils/getFontWeight';

const CustomButton = ({ rounded, style, ...props }) => {
  const customRounded = rounded && { borderRadius: rounded };

  return (
    <TouchableOpacity
      {...props}
      style={{ ...styles.button, ...customRounded, ...style }}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primary,
    paddingVertical: 16,
  },
  text: {
    color: Theme.white,
    fontSize: normalize(16),
  },
});

export default CustomButton;
