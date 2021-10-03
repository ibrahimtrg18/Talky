import Config from 'react-native-config';

console.log(Config.GOOGLE_WEB_CLIENT_ID);
console.log(Config.GOOGLE_ANDROID_CLIENT_ID);

export const googleSigninConfig = {
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  androidClientId: Config.GOOGLE_ANDROID_CLIENT_ID,
  scopes: ['email', 'profile', 'openid'], // what API you want to access on behalf of the user, default is email and profile
};
