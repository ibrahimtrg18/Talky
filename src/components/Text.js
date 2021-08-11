import React from 'react';
import { Text, StyleSheet } from 'react-native';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
import { getFontWeight } from '../utils/getFontWeight';

const CustomText = ({ size, color, weight, ...props }) => {
  const customFontSize = size && { fontSize: normalize(size) };
  const customFontColor = color && { color };
  const customWeight = getFontWeight(weight || 500);

  return (
    <Text
      {...props}
      style={{
        ...styles.text,
        ...customFontSize,
        ...customFontColor,
        ...customWeight,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.text,
    fontSize: normalize(16),
  },
});

export default CustomText;
