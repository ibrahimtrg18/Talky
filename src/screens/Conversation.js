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
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import Input from '../components/Input';
import Message from '../components/Message';
// actions
import {
  fetchConversationById,
  fetchConversationChatById,
  addConversationChat,
} from '../redux/actions';
// utils
import { normalize } from '../utils/normalize';

const Conversion = ({ route }) => {
  const { conversationId } = route.params;
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [otherUsersConversation, setOtherUserConversation] = useState([]);

  const auth = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation);
  const conversationUsers = useSelector((state) =>
    Object.values(state.conversation.users),
  );
  const chats = useSelector((state) => Object.values(state.conversation.chats));

  const socket = io(Config.SOCKET_URL, {
    extraHeaders: {
      Authorization: 'Bearer ' + auth.access_token,
    },
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connection', () => console.log('connection'));

    socket.on('connect_error', (err) => console.error(err));
    socket.on('connect_failed', (err) => console.error(err));

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

  useEffect(() => {
    if (conversationUsers.length > 0) {
      const filterConversation = conversationUsers.filter(
        (user) => user.id !== auth.id,
      );
      setOtherUserConversation(filterConversation);
    }
  }, [conversationUsers.length]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar showBack title={otherUsersConversation[0]?.name} />
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
