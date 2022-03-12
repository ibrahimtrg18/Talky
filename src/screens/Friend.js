import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
// components
import AppBar from '../components/AppBar';
import Input from '../components/Input';
import UserList from '../components/User/UserList';
// actions
import { fetchUserFriends } from '../redux/actions';
// hooks
import { useDebounce } from '../hooks/debounce';
// utils
import * as Theme from '../utils/theme';

const Friend = () => {
  const isFocused = useIsFocused();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const userFriend = useSelector((state) => Object.values(state.user.friend));

  useEffect(() => {
    dispatch(fetchUserFriends());
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      userFriend.filter(
        (user) => user.toLowerCase().indexOf(debouncedSearchTerm) > -1,
      );
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    inputRef.current.focus();
  }, [isFocused]);

  console.log('debug userFriend', userFriend);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        showBack
        centerContent={
          <Input
            ref={inputRef}
            placeholder="Search..."
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        }
      />
      <View style={styles.userListContainer}>
        <UserList users={userFriend} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  searchInput: {
    borderWidth: 0,
  },
});

export default Friend;
