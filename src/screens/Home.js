import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { SafeAreaView, Pressable, View, StyleSheet } from 'react-native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
// apis
import UploadsAPI from '../apis/UploadsAPI';
// components
import AppBar from '../components/AppBar';
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import UserList from '../components/User/UserList';
import ConversationList from '../components/Conversation/ConversationList';
import UserAvatarImage from '../components/User/UserAvatarImage';
// actions
import {
  searchUser,
  fetchUserFriends,
  fetchUserConversations,
} from '../redux/actions';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import SearchIcon from '../assets/icons/iconSearch.svg';

const Home = ({ navigation }) => {
  const uploadsAPI = new UploadsAPI();
  const [query, setQuery] = useState('');
  const bottomSheetRef = useRef(null);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userSearch = useSelector((state) => Object.values(state.user.search));
  const userFriends = useSelector((state) => Object.values(state.user.friend));
  const userConversations = useSelector((state) =>
    Object.values(state.user.conversation),
  );

  useEffect(() => {
    dispatch(fetchUserConversations());
  }, []);

  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        dispatch(searchUser(query));
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [query]);

  // redux
  const account = useSelector((state) => state.user.account);

  // variables snap bottomsheet
  const snapPoints = useMemo(() => ['80%', '100%'], []);

  // callbacks bottomsheet
  const handleSheetChanges = useCallback((index) => {
    if (index >= 0) {
      dispatch(fetchUserFriends());
    }
    if (index >= 0) {
      dispatch(fetchUserFriends());
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Home"
        leftContent={
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <UserAvatarImage
              name={account?.name}
              src={`${uploadsAPI.userAvatar(account?.avatar)}`}
              textSize={12}
              width={normalize(32)}
              height={normalize(32)}
            />
          </Pressable>
        }
        rightContent={
          <Pressable onPress={() => bottomSheetRef.current.snapToIndex(0)}>
            <SearchIcon width={normalize(24)} height={normalize(24)} />
          </Pressable>
        }
      />
      {/* <View style={styles.tabView}>
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
      </View> */}

      {/* !Conversation */}
      <ConversationList conversations={userConversations} />

      {/* !BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.searchContainer}>
            <Input
              ref={searchRef}
              rounded={8}
              style={styles.searchInput}
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            <Pressable>
              <SearchIcon width={22} height={22} />
            </Pressable>
          </View>

          <UserList users={userFriends} type="friend" />
          <UserList users={userSearch} type="search" />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
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
  conversationContainer: {
    paddingHorizontal: normalize(20),
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
