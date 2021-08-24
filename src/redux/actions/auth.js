import axios from '../../utils/axios';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { googleSigninConfig } from '../../utils/googleSigninConfig';
import { storeData, deleteData, getAllData } from '../../utils/storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
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
  } catch (error) {
    console.error(error);
  }
};

export const userLogin = () => async (dispatch) => {
  try {
    GoogleSignin.configure(googleSigninConfig);
    const user = await signIn();
    const res = await axios.post('/users/google/login', null, {
      headers: { token: user.idToken },
    });
    storeData({ key: 'access_token', value: res.data.access_token });

    const auth = {
      access_token: res.data.access_token,
    };

    dispatch({ type: LOGIN, payload: auth });
  } catch (e) {
    console.error(e);
  }
};

export const userLogout = () => async (dispatch) => {
  const user = await signOut();

  dispatch({ type: LOGOUT, payload: user });
};
