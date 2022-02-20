import AsyncStorage from '@react-native-community/async-storage';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const GOOGLE_ID_TOKEN = 'GOOGLE_ID_TOKEN';
export const ID = 'ID';
export const LOGIN_WITH = 'LOGIN_WITH';
export const GOOGLE = 'GOOGLE';

export const storeData = async ({ key, value }) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error('error storeData: ', e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.error('error getData: ', e);
  }
};

export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    console.error('error getData: ', e);
  }
};

export const getAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return result.map((req) => JSON.parse(req)).forEach(console.log);
  } catch (error) {
    console.error(error);
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};
