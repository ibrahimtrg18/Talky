import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
// libraries
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// components
import Text from '../components/Text';
import SignInWith from '../components/SignInWith';
import Line from '../components/Line';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
import { googleSigninConfig } from '../utils/googleSigninConfig';
// icons
import GoogleIcon from '../assets/icons/iconGoogle.svg';
import FacebookIcon from '../assets/icons/iconFacebook.svg';
import AppleIcon from '../assets/icons/iconApple.svg';

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    GoogleSignin.configure(googleSigninConfig);
    isSignedIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(userInfo);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

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
          onPress={signIn}
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
          onPress={() => history.push('/home')}
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
