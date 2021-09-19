import React, { useRef, useMemo, useCallback } from 'react';
import { SafeAreaView, Pressable, View, Image, StyleSheet } from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
import Animated from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
// components
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import FriendList from '../components/FriendList';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import SearchIcon from '../assets/icons/iconSearch.svg';
import ChevronRightIcon from '../assets/icons/iconChevronRight.svg';
// images
import Avatar from '../assets/images/avatar.png';
// actions
import { fetchProfile } from '../redux/actions/user';

const Home = () => {
  const bottomSheetRef = useRef(null);
  const searchRef = useRef(null);

  // redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  // variables snap bottomsheet
  const snapPoints = useMemo(() => ['80%', '100%'], []);

  // callbacks bottomsheet
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerUser}>
          <Image source={Avatar} style={styles.headerUserImage} />
          <Text style={styles.headerUserName}>{!!profile && profile.name}</Text>
        </View>
        <Pressable onPress={() => bottomSheetRef.current.snapToIndex(0)}>
          <SearchIcon width={28} height={28} />
        </Pressable>
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.searchContainer}>
            <Input ref={searchRef} rounded={8} style={styles.searchInput} />
            <Pressable>
              <SearchIcon width={22} height={22} />
            </Pressable>
          </View>

          <FriendList />
        </View>
      </BottomSheet>
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
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUserName: {
    marginLeft: 16,
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
  // bottomSheet
  bottomSheetContent: {
    height: '100%',
    padding: 16,
    backgroundColor: Theme.white,
    elevation: 4,
  },
  bottomSheetCloseButton: { marginBottom: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
});

export default Home;
