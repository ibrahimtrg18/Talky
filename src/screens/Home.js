import React, { useEffect } from 'react';
import { SafeAreaView, Pressable, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// libraries
import { useSelector, useDispatch } from 'react-redux';
// apis
import UploadsAPI from '../apis/UploadsAPI';
// components
import AppBar from '../components/AppBar';
import ConversationList from '../components/Conversation/ConversationList';
import UserAvatarImage from '../components/User/UserAvatarImage';
// actions
import { fetchUserConversations } from '../redux/actions';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import SearchIcon from '../assets/icons/iconSearch.svg';
import MessageIcon from '../assets/icons/iconMessage.svg';

const Home = ({ navigation }) => {
  const uploadsAPI = new UploadsAPI();

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const auth = useSelector((state) => state.auth);
  const userConversations = useSelector((state) =>
    Object.values(state.user.conversation),
  );

  useEffect(() => {
    dispatch(fetchUserConversations());
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Home"
        leftContent={
          <Pressable
            onPress={() =>
              navigation.navigate('Profile', {
                userId: auth.id,
                isOwnProfile: true,
              })
            }
          >
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
          <Pressable onPress={() => navigation.navigate('Search')}>
            <SearchIcon width={normalize(24)} height={normalize(24)} />
          </Pressable>
        }
      />

      {/* !Conversation */}
      <ConversationList conversations={userConversations} />

      {/* Float Button */}
      <Pressable style={styles.floatButton}>
        <MessageIcon width={normalize(24)} height={normalize(24)} />
      </Pressable>
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
  floatButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Theme.primary,
    padding: normalize(12),
    borderRadius: 8,
  },
});

export default Home;
