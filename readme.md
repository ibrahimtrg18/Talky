# Talkyu

## Setting Up

### Requirement Stack Technology

- Node.js v16.13.1
- Yarn

### Environment

- Development

  create new file `.env.development` in `root` directory

  ```
  API_URL=http://192.168.100.41:3000/api
  SOCKET_URL=http://192.168.100.41:3000/
  GOOGLE_WEB_CLIENT_ID=******
  GOOGLE_ANDROID_CLIENT_ID=******
  ```

- Production

  ```
  API_URL=https://talky.ibrahimtarigan.me/api
  SOCKET_URL=https://talky.ibrahimtarigan.me/
  GOOGLE_WEB_CLIENT_ID=******
  GOOGLE_ANDROID_CLIENT_ID=******
  ```

### Release Keystore

create new file `release.keystore.properties` in `./android`

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=******
MYAPP_UPLOAD_KEY_PASSWORD=******
```

## Running App

### Development Android

```
yarn android:dev
```

### Production Android

```
yarn android:dev
```
