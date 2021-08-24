import React from 'react';
import { SafeAreaView, View, Image, Button, StyleSheet } from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
// components
import Text from '../components/Text';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import SearchIcon from '../assets/icons/iconSearch.svg';
// images
import Avatar from '../assets/images/avatar.png';
// actions
import { userLogout } from '../redux/actions/auth';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={Avatar} />
        <Text>{!!user && !!user.user && user.user.name}</Text>
        <SearchIcon width={28} height={28} />
        <Button title="logout" onPress={() => dispatch(userLogout())} />
      </View>
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
