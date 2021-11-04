import React, { useEffect } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
// libraries
import { useDispatch, useSelector } from 'react-redux';
// components
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import UserList from '../components/User/UserList';
// actions
import { fetchConversationById } from '../redux/actions/conversation';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import BackIcon from '../assets/icons/iconBack.svg';

const Conversion = ({ route }) => {
  const { conversationId } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConversationById(conversationId));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon width={28} height={28} style={{ marginRight: 8 }} />
        <Text>Back</Text>
      </View>
      <ScrollView style={styles.body}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <Input placeholder="Message" style={styles.input} />
        <Button title="Send" style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(12),
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: normalize(16),
  },
  footer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  button: {},
});

export default Conversion;
