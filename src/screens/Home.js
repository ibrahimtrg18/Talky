import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Pressable,
  View,
  Image,
  StyleSheet,
} from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
// components
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import BottomSheet from '../components/BottomSheet';
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
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const user = useSelector((state) => state.user);

  const onShowBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const onHideBottomSheet = () => {
    Keyboard.dismiss();
    setShowBottomSheet(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled={false}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.header}>
            <Image source={Avatar} />
            <Text>{!!user && !!user.user && user.user.name}</Text>
            <Pressable onPress={onShowBottomSheet}>
              <SearchIcon width={28} height={28} />
            </Pressable>
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

          <BottomSheet
            show={showBottomSheet}
            height={600}
            onOuterClick={onHideBottomSheet}
          >
            <View style={styles.bottomSheetContent}>
              <Pressable
                onPress={onHideBottomSheet}
                style={styles.bottomSheetCloseButton}
              >
                <Text style={styles.buttonText}>X Close</Text>
              </Pressable>
              <View style={styles.searchContainer}>
                <Input rounded={8} style={styles.searchInput} />
                <Pressable>
                  <SearchIcon width={22} height={22} />
                </Pressable>
              </View>
            </View>
          </BottomSheet>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  // bottomSheet
  bottomSheetContent: {
    flex: 1,
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
