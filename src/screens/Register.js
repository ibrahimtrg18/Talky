import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  View,
  StyleSheet,
} from 'react-native';
// libraries
import { Formik } from 'formik';
// components
import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.headerContainer}>
            <Text>
              <Text size={40} weight={800} style={styles.title}>
                Talky
              </Text>
              <Text size={40} weight={800} style={styles.dot}>
                .
              </Text>
            </Text>
            <Text size={18} weight={600} style={styles.title}>
              Sign in with Account
            </Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
              values,
            }) => (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder={'username@mail.com'}
                    rounded={8}
                    style={styles.input}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder={'********'}
                    rounded={8}
                    style={styles.input}
                    type={'password'}
                    secureTextEntry={showPassword}
                    showPassword={showPassword}
                    setShowPassword={(show) => setShowPassword(show)}
                  />
                  <Text size={14} color={Theme.black} style={styles.forgot}>
                    Forgot Password?
                  </Text>
                </View>

                <View style={styles.submitContainer}>
                  <Button
                    onPress={handleSubmit}
                    title="Submit"
                    rounded={8}
                    style={styles.button}
                  />
                  <View style={styles.footer}>
                    <Text size={14}>Don't have an account?</Text>
                    <Text
                      size={14}
                      color={Theme.primary}
                      onPress={() => navigation.navigate('Register')}
                    >
                      Sign up here
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: normalize(16),
  },
  title: {
    paddingVertical: normalize(16),
  },
  dot: {
    color: Theme.primary,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: normalize(32),
    justifyContent: 'space-between',
  },
  inputContainer: {},
  submitContainer: {
    paddingBottom: normalize(16),
  },
  input: {
    marginBottom: normalize(16),
  },
  errorMessage: {},
  forgot: {
    textDecorationLine: 'underline',
    marginBottom: normalize(16),
  },
  button: {
    marginTop: 'auto',
    marginBottom: normalize(16),
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
