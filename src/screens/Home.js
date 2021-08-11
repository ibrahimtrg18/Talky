import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
// components
import Text from '../components/Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, []);

  const handleBack = () => {
    history.goBack();
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingHorizontal: normalize(32),
  },
});

export default Home;
