import AsyncStorage from '@react-native-async-storage/async-storage';

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
