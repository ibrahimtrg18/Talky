import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
// libraries
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
  const user = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={Avatar} />
        <SearchIcon width={28} height={28} />
      </View>
      <Text>{user.idToken}</Text>
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
