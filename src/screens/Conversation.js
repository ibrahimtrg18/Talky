import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  // ScrollView,
  // VirtualizedList,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
// libraries
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
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
  addConversationChat,
} from '../redux/actions';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// icons
import BackIcon from '../assets/icons/iconBack.svg';

const Conversion = ({ navigation, route }) => {
  const { conversationId } = route.params;
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const auth = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation);
  const chats = useSelector((state) => Object.values(state.conversation.chat));

  const socket = io(Config.SOCKET_URL, {
    extraHeaders: {
      Authorization: 'Bearer ' + auth.access_token,
    },
    transports: ['websocket'],
  });

  socket.on('connect_error', (err) => console.error(err));
  socket.on('connect_failed', (err) => console.error(err));

  useEffect(() => {
    socket.on('createChat', async (data) => {
      dispatch(addConversationChat(data.data));
    });

    return () => socket.on('disconnect', (err) => console.error(err));
  }, []);

  useEffect(() => {
    (async () => {
      dispatch(fetchConversationById(conversationId));
      dispatch(fetchConversationChatById(conversationId));
    })();
  }, [conversationId]);

  const onSendPress = () => {
    try {
      if (message && message) {
        socket.emit('createChat', {
          conversation: {
            id: conversationId,
          },
          message,
        });
        setMessage('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={28} height={28} style={{ marginRight: 8 }} />
          {/* <Text>Back</Text> */}
        </Pressable>
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
        inverted
        // initialScrollIndex={chats.length - 1}
      />
      <View style={styles.footer}>
        <Input
          style={styles.input}
          value={message}
          placeholder="Message"
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" style={styles.button} onPress={onSendPress} />
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
