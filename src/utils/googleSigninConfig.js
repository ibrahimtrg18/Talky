export const googleSigninConfig = {
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  webClientId:
    '39515346365-ffck4nfekkjo1uv5trfefc08taqjorq7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  androidClientId:
    '39515346365-rft0gllpnlnoj0gfnebt0j63rgeikdhv.apps.googleusercontent.com',
  scopes: ['email', 'profile', 'openid'], // what API you want to access on behalf of the user, default is email and profile
};
