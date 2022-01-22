// libraries
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import BottomSheet from '@gorhom/bottom-sheet';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// actions
import { updateAccount } from '../../redux/actions';
// components
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';

const initialValues = {
  email: '',
  name: '',
  phoneNumber: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(3).max(320).required('Email is required'),
  name: Yup.string().min(8).max(26).required('Name is required'),
  phoneNumber: Yup.string().max(26).required('Phone Number is required'),
  confirmPassword: Yup.string().min(8).max(128).required('Confirm is required'),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const [modeConfirmation, setModeConfirmation] = useState(false);
  const { account } = useSelector((state) => state.user);
  const inputConfirmationPasswordRef = useRef(null);

  // ref bottomsheet
  const bottomSheetRef = useRef(null);

  // variables snap bottomsheet
  const snapPoints = useMemo(() => ['40%'], []);

  // callbacks bottomsheet
  const handleSheetChanges = useCallback((index) => {
    bottomSheetRef.current.snapToIndex(index);
  }, []);

  const formik = useFormik({
    initialValues: { ...initialValues, ...account },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        if (!modeConfirmation) {
          bottomSheetRef.current.snapToIndex(0);
          setModeConfirmation(true);
          inputConfirmationPasswordRef.current.focus();
        } else {
          const { message } = await dispatch(updateAccount(values));
          ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          bottomSheetRef.current.forceClose();
          setModeConfirmation(false);
        }
        setSubmitting(false);
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      if (modeConfirmation) {
        bottomSheetRef.current.snapToIndex(0);
      }
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      if (modeConfirmation) {
        bottomSheetRef.current.forceClose();
        setModeConfirmation(false);
      }
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [modeConfirmation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Profile" showBack />
      <FormikProvider value={formik}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'username@mail.com'}
              rounded={8}
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            {formik.errors.email && formik.touched.email && (
              <Text style={styles.errorMessage}>{formik.errors.email}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'Name'}
              rounded={8}
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
            />
            {formik.errors.name && formik.touched.name && (
              <Text style={styles.errorMessage}>{formik.errors.name}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'Phone Number'}
              rounded={8}
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <Text style={styles.errorMessage}>
                {formik.errors.phoneNumber}
              </Text>
            )}
          </View>
          <Button
            onPress={formik.handleSubmit}
            title="Submit"
            rounded={8}
            style={styles.button}
            disabled={formik.isSubmitting}
          />
        </View>
      </FormikProvider>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.inputContainer}>
            <Input
              ref={inputConfirmationPasswordRef}
              placeholder={'Confirm Password'}
              rounded={8}
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange('confirmPassword')}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <Text style={styles.errorMessage}>
                  {formik.errors.confirmPassword}
                </Text>
              )}
          </View>
          <Button
            onPress={formik.handleSubmit}
            title="Submit"
            rounded={8}
            style={styles.button}
            disabled={formik.isSubmitting}
          />
        </View>
      </BottomSheet>
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
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: normalize(100),
    height: normalize(100),
    marginBottom: normalize(16),
    alignItems: 'center',
    resizeMode: 'contain',
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
  bottomSheetContent: {
    flex: 1,
    backgroundColor: Theme.white,
    paddingVertical: normalize(16),
    marginHorizontal: normalize(32),
  },
});

export default EditProfile;
