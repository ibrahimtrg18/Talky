import React from 'react';
import { View, StyleSheet } from 'react-native';
// utils
import * as Theme from '../utils/theme';

const Line = ({ color }) => {
  const customColor = color && { borderBottomColor: color };

  return <View style={{ ...styles.line, ...customColor }} />;
};

const styles = StyleSheet.create({
  line: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default Line;
