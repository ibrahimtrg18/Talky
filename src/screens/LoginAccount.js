import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ToastAndroid,
  View,
  StyleSheet,
} from 'react-native';
// libraries
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// components
import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';
// actions
import { userLoginAccount } from '../redux/actions/auth';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const initialValues = { email: '', password: '' };

const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(3).max(320).required('Email is required'),
  password: Yup.string().min(8).max(128).required('Password is required'),
});

const LoginAccount = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

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
                Talkyu
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);
                const { message } = await dispatch(userLoginAccount(values));
                ToastAndroid.show(message, ToastAndroid.SHORT);
                setSubmitting(false);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
              values,
              isSubmitting,
            }) => (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.input}>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder={'username@mail.com'}
                      rounded={8}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.input}>
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder={'********'}
                      rounded={8}
                      type={'password'}
                      secureTextEntry={showPassword}
                      showPassword={showPassword}
                      setShowPassword={(show) => setShowPassword(show)}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>
                </View>

                <View style={styles.submitContainer}>
                  <Button
                    onPress={handleSubmit}
                    title="Submit"
                    rounded={8}
                    style={styles.button}
                    disable={isSubmitting}
                  />
                  <View style={styles.footer}>
                    <Text size={14}>Already have an account?</Text>
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
    marginBottom: normalize(8),
  },
  errorMessage: {
    fontSize: normalize(12),
    color: Theme.danger,
  },
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

export default LoginAccount;
