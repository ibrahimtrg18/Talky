import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  // ScrollView,
  // VirtualizedList,
  FlatList,
  StyleSheet,
} from 'react-native';
// libraries
import { useDispatch, useSelector } from 'react-redux';
// components
import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import Message from '../components/Message';
import UserList from '../components/User/UserList';
// actions
import {
  fetchConversationById,
  fetchConversationChatById,
} from '../redux/actions/conversation';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import BackIcon from '../assets/icons/iconBack.svg';

const Conversion = ({ route }) => {
  const { conversationId } = route.params;
  const dispatch = useDispatch();

  const conversation = useSelector((state) => state.conversation);
  const chats = useSelector((state) => Object.values(state.conversation.chat));

  useEffect(() => {
    (async () => {
      await dispatch(fetchConversationById(conversationId));
      await dispatch(fetchConversationChatById(conversationId));
    })();
  }, [conversationId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon width={28} height={28} style={{ marginRight: 8 }} />
        <Text>Back</Text>
      </View>
      {/* <ScrollView style={styles.body}>
        {chats.map((chat) => (
          <Message key={chat.id} chat={chat} />
        ))}
      </ScrollView> */}

      {/* <VirtualizedList
        style={styles.body}
        data={chats}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <Message key={item.id} chat={item} conversation={conversation} />
        )}
        keyExtractor={(item) => item.id}
        getItemCount={(data) => data.length}
        getItem={(data, index) => {
          return data[index];
        }}
        initialScrollIndex={chats.length - 1}
        onScrollToIndexFailed={() => {}}
      /> */}
      <FlatList
        style={styles.body}
        data={chats}
        renderItem={({ item }) => (
          <Message key={item.id} chat={item} conversation={conversation} />
        )}
        keyExtractor={(item) => item.id}
        initialScrollIndex={chats.length - 1}
      />
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
