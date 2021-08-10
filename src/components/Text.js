import React from 'react';
import { Text, StyleSheet } from 'react-native';
// utils
import * as Theme from '../utils/theme';

const CustomText = (props) => {
  return (
    <Text {...props} style={{ ...styles.text, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
    color: Theme.text,
  },
});

export default CustomText;
