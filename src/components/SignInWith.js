import React from 'react';
import { Button, StyleSheet } from 'react-native';

const SignInWith = (props) => {
  return <Button {...props} style={{ ...styles.button, ...props.styles }} />;
};

const styles = StyleSheet.create({
  button: {},
});

export default SignInWith;
