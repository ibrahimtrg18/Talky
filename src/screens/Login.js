import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
// libraries
// components
import Text from '../components/Text';
import SignInWith from '../components/SignInWith';
import Line from '../components/Line';
import { useDispatch } from 'react-redux';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import GoogleIcon from '../assets/icons/iconGoogle.svg';
import FacebookIcon from '../assets/icons/iconFacebook.svg';
import AppleIcon from '../assets/icons/iconApple.svg';
// actions
import { userLogin } from '../redux/actions/auth';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>
          <Text size={60} weight={800} style={styles.title}>
            Talky
          </Text>
          <Text size={60} weight={800} style={styles.dot}>
            .
          </Text>
        </Text>
      </View>
      <View style={styles.body}>
        <SignInWith
          Icon={GoogleIcon}
          text="Sign in with Google"
          rounded={8}
          style={styles.button}
          onPress={() => dispatch(userLogin())}
        />
        <SignInWith
          Icon={FacebookIcon}
          text="Sign in with Facebook"
          rounded={8}
          style={styles.button}
        />
        <SignInWith
          Icon={AppleIcon}
          text="Sign in with Apple"
          rounded={8}
          style={styles.button}
        />
        <View style={styles.horizontalRule}>
          <Line />
          <Text style={styles.horizontalRuleText}>or</Text>
          <Line />
        </View>
        <SignInWith
          text="Continue with phone number"
          rounded={8}
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={styles.footer}>
        <Text size={14}>Already have an account?</Text>
        <Text size={14} color={Theme.primary}>
          Sign up here
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingHorizontal: normalize(32),
  },
  // header
  header: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: normalize(16),
  },
  title: {},
  dot: {
    color: Theme.primary,
  },
  // body
  body: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: normalize(16),
  },
  horizontalRule: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  horizontalRuleText: {
    marginHorizontal: normalize(24),
  },
  // footer
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
