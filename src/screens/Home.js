import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
// components
import Text from '../components/Text';
import Button from '../components/Button';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import SearchIcon from '../assets/icons/iconSearch.svg';
import ChevronRightIcon from '../assets/icons/iconChevronRight.svg';
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
      <View style={styles.tabView}>
        <Button
          title="Chat"
          style={styles.tabViewButtonActive}
          textColor={Theme.black}
          rounded={8}
        />
        <Button
          title="Call"
          style={styles.tabViewButton}
          textColor={Theme.black}
          rounded={8}
        />
      </View>
      <View style={styles.conversationList}>
        <View style={styles.conversationItem}>
          <Image source={Avatar} style={styles.conversationLeft} />
          <View style={styles.conversationMid}>
            <View style={styles.conversationMidHead}>
              <Text color={Theme.text} size={16}>
                Name
              </Text>
              <Text color={Theme.dark} size={12}>
                Time
              </Text>
            </View>
            <Text color={Theme.dark} size={14}>
              Message
            </Text>
          </View>
          <ChevronRightIcon width={24} height={24} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
    paddingTop: normalize(16),
  },
  // header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(32),
    marginBottom: normalize(16),
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
    marginHorizontal: normalize(32),
    backgroundColor: Theme.background,
    borderRadius: 8,
  },
  tabViewButton: {
    flex: 1,
    margin: normalize(8),
    backgroundColor: 'transparent',
  },
  tabViewButtonActive: {
    flex: 1,
    margin: normalize(8),
    backgroundColor: Theme.white,
    shadowColor: Theme.black,
    shadowOpacity: 0.01,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 12,
  },
  // conversation
  conversationList: {},
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(32),
  },
  conversationLeft: {
    width: 50,
    height: 50,
  },
  conversationMid: {
    flex: 1,
    paddingHorizontal: normalize(8),
  },
  conversationMidHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;
