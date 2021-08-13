import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleSigninConfig } from '../../utils/googleSigninConfig';

export const LOGIN = 'LOGIN';

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
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

export const userLogin = () => async (dispatch) => {
  GoogleSignin.configure(googleSigninConfig);
  const user = await signIn();

  dispatch({ type: LOGIN, payload: user });
};
