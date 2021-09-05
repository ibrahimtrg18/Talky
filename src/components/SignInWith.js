import React from 'react';
import { TouchableHighlight, View, StyleSheet, Platform } from 'react-native';
// components
import Text from './Text';
// utils
import { normalize } from '../utils/normalize';

const SignInWith = ({ Icon, text, rounded, ...props }) => {
  const customRounded = rounded && { borderRadius: rounded };
  const customCenter = !Icon && { justifyContent: 'center' };

  return (
    <TouchableHighlight
      {...props}
      style={[styles.buttonContainer, customRounded, props.style]}
    >
      <View style={[styles.container, customCenter]}>
        {Icon && <Icon style={styles.icon} width={28} height={28} />}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
    }),
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 26,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
    marginRight: 38,
  },
  text: {
    fontSize: normalize(16),
  },
});

export default SignInWith;
