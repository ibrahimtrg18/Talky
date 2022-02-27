import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AuthAPI from '../../apis/AuthAPI';
import { googleSigninConfig } from '../../utils/googleSigninConfig';
import {
  storeData,
  getData,
  clearData,
  ACCESS_TOKEN,
  GOOGLE_ID_TOKEN,
  ID,
  LOGIN_WITH,
  GOOGLE,
} from '../../utils/storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

GoogleSignin.configure(googleSigninConfig);

const signInGoogle = async () => {
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

export const userLoginGoogle = () => async (dispatch) => {
  try {
    const user = await signInGoogle();

    if (!user) {
      return;
    }

    const res = await AuthAPI.googleLogin({
      idToken: user.idToken,
      serverAuthCode: user.serverAuthCode,
    });

    await storeData({ key: ACCESS_TOKEN, value: res.data.access_token });
    await storeData({ key: GOOGLE_ID_TOKEN, value: user.idToken });
    await storeData({ key: ID, value: res.data.id });
    await storeData({ key: LOGIN_WITH, value: GOOGLE });

    const auth = {
      id: res.data.id,
      access_token: res.data.access_token,
    };

    dispatch({ type: LOGIN, payload: auth });
  } catch (e) {
    console.error(e);
  }
};

const signOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const userIsSignIn = () => async (dispatch) => {
  try {
    if (await getData(ACCESS_TOKEN)) {
      const auth = {
        id: await getData(ID),
        access_token: await getData(ACCESS_TOKEN),
      };

      dispatch({ type: LOGIN, payload: auth });
    } else {
      dispatch(userLogout());
    }
  } catch (e) {
    console.error(e);
  }
};

export const userLoginAccount = (payload) => async (dispatch, getState) => {
  try {
    const res = await AuthAPI.accountLogin(payload);
    await storeData({ key: ACCESS_TOKEN, value: res.data.access_token });
    await storeData({ key: ID, value: res.data.id });

    const auth = {
      id: res.data.id,
      access_token: res.data.access_token,
    };

    dispatch({ type: LOGIN, payload: auth });
    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    if ((await getData(LOGIN_WITH)) === GOOGLE) {
      await signOutGoogle();
    }
    await clearData();

    dispatch({ type: LOGOUT });
  } catch (e) {
    console.error(e);
  }
};
