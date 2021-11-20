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
import { updateAccount } from '../../redux/actions/user';
// components
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';

const initialValues = {
  newPassword: '',
  confirmationPassword: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required('New Password is required'),
  confirmationPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must be match',
  ),
});

const EditPassword = () => {
  const dispatch = useDispatch();
  const [modeConfirmation, setModeConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
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
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
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
          resetForm();
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
        formik.resetForm();
      }
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [modeConfirmation]);

  console.log(JSON.stringify(formik.values, null, 2));

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Profile" showBack />
      <FormikProvider value={formik}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'New Password'}
              type="password"
              rounded={8}
              value={formik.values.newPassword}
              onChangeText={formik.handleChange('newPassword')}
              onBlur={formik.handleBlur('newPassword')}
              secureTextEntry={showPassword}
              showPassword={showPassword}
              setShowPassword={(show) => setShowPassword(show)}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <Text style={styles.errorMessage}>
                {formik.errors.newPassword}
              </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder={'Confirmation Password'}
              type="password"
              rounded={8}
              value={formik.values.confirmationPassword}
              onChangeText={formik.handleChange('confirmationPassword')}
              onBlur={formik.handleBlur('confirmationPassword')}
              secureTextEntry={showPassword}
              showPassword={showPassword}
              setShowPassword={(show) => setShowPassword(show)}
            />
            {formik.errors.confirmationPassword &&
              formik.touched.confirmationPassword && (
                <Text style={styles.errorMessage}>
                  {formik.errors.confirmationPassword}
                </Text>
              )}
          </View>
          <Button
            onPress={formik.handleSubmit}
            title="Submit"
            rounded={8}
            style={styles.button}
            disabled={formik.isSubmitting || modeConfirmation}
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
              placeholder={'Current Password'}
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

export default EditPassword;
