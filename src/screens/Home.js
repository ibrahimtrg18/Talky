import React, { useEffect } from 'react';
import {
  BackHandler,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from 'react-native';
// libraries
import { useHistory } from 'react-router-native';
import { useSelector } from 'react-redux';
// components
import Text from '../components/Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import SearchIcon from '../assets/icons/iconSearch.svg';
// images
import Avatar from '../assets/images/avatar.png';

const Home = () => {
  const history = useHistory();

  const user = useSelector((state) => state.user);

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
      <View style={styles.header}>
        <Image source={Avatar} />
        <SearchIcon width={28} height={28} />
      </View>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
    paddingHorizontal: normalize(32),
    paddingTop: normalize(16),
  },
  // header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Home;
