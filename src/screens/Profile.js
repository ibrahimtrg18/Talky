// libraries
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Image,
  Pressable,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Config from 'react-native-config';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// actions
import { updateAccount } from '../redux/actions/user';
// components
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';

const initialValues = { email: '', name: '', phoneNumber: '' };

const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(3).max(320).required('Email is required'),
  name: Yup.string().min(8).max(26).required('Name is required'),
  phoneNumber: Yup.string().max(26).required('Phone Number is required'),
});

const IMAGE_URL_PREFIX = `${Config.API_URL}/user/account/avatar`;

const Profile = () => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get('window');
  const auth = useSelector((state) => state.auth);
  const { account } = useSelector((state) => state.user);
  const [firstLetterName, setFirstLetterName] = useState('');

  const onImageError = (e) => {
    const newFirstLetterName = account.name.split(' ');
    if (firstLetterName.length >= 2) {
      setFirstLetterName(`${newFirstLetterName[0]}${newFirstLetterName[1]}`);
    } else {
      setFirstLetterName(firstLetterName[0]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" showBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{ ...initialValues, ...account }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);
                console.log(values);
                const { message } = await dispatch(updateAccount(values));
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
              <View style={styles.content}>
                <Pressable>
                  <Image
                    source={{ uri: `${IMAGE_URL_PREFIX}?userId=${auth.id}` }}
                    onError={(e) => onImageError(e)}
                    style={{
                      backgroundColor: Theme.dark,
                      width: width - normalize(64),
                      height: width - normalize(64),
                      marginBottom: normalize(16),
                      borderRadius: Math.round(width + height) / 2,
                    }}
                  />
                </Pressable>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder={'username@mail.com'}
                    rounded={8}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder={'Name'}
                    rounded={8}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder={'Phone Number'}
                    rounded={8}
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text style={styles.errorMessage}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                </View>
                <Button
                  onPress={handleSubmit}
                  title="Submit"
                  rounded={8}
                  style={styles.button}
                  disable={isSubmitting}
                />
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  content: {
    marginVertical: normalize(16),
    marginHorizontal: normalize(32),
  },
  avatar: {
    marginBottom: normalize(16),
    width: '100%',
  },
  inputContainer: {
    marginBottom: normalize(8),
  },
  button: {
    paddingVertical: normalize(14),
  },
  errorMessage: {
    fontSize: normalize(12),
    color: Theme.danger,
  },
});

export default Profile;
