import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
// components
import AppBar from '../components/AppBar';
import Input from '../components/Input';
import UserList from '../components/User/UserList';
// actions
import { searchUser } from '../redux/actions';
// hooks
import { useDebounce } from '../hooks/debounce';
// utils
import * as Theme from '../utils/theme';

const Search = () => {
  const isFocused = useIsFocused();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const userSearch = useSelector((state) => Object.values(state.user.search));

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchUser(searchTerm));
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    inputRef.current.focus();
  }, [isFocused]);

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
        <UserList users={userSearch} />
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

export default Search;
