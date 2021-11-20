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
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// components
import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';
// actions
import { registerUser } from '../redux/actions/user';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const initialValues = { name: '', email: '', password: '' };

const validationSchema = Yup.object().shape({
  name: Yup.string().min(8).max(26).required('Name is required'),
  email: Yup.string().email().min(3).max(320).required('Email is required'),
  password: Yup.string().min(8).max(128).required('Password is required'),
});

const Register = ({ navigation }) => {
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
              Sign up new Account
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                setSubmitting(true);
                dispatch(registerUser(values));
                navigation.navigate('Login');
                resetForm();
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
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder={'fullname'}
                      rounded={8}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorMessage}>{errors.name}</Text>
                    )}
                  </View>
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
                    disabled={isSubmitting}
                  />
                  <View style={styles.footer}>
                    <Text size={14}>Already have an account?</Text>
                    <Text
                      size={14}
                      color={Theme.primary}
                      onPress={() => navigation.navigate('Login')}
                    >
                      Sign in here
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

export default Register;
