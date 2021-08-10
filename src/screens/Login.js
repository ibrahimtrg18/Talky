import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
// components
import Text from '../components/Text';
import SignInWith from '../components/SignInWith';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text>Talky</Text>
          <Text style={styles.dot}>.</Text>
        </Text>
      </View>
      <View>
        <SignInWith title="Google" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(60),
  },
  dot: {
    color: Theme.primary,
  },
});

export default Login;
