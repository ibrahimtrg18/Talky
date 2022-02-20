import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
// libraries
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
// components
import AppBar from '../components/AppBar';
import Message from '../components/Message';
import Reply from '../components/Reply';
// actions
import {
  fetchConversationById,
  fetchConversationChatById,
  addConversationChat,
} from '../redux/actions';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';

const Conversion = ({ route }) => {
  const { conversationId } = route.params;
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [otherUsersConversation, setOtherUserConversation] = useState([]);
  const [numberOfLines, setNumberOfLines] = useState(1);

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

  const onSendReply = () => {
    try {
      if (message && message) {
        socket.emit('createChat', {
          conversation: {
            id: conversationId,
          },
          type: 'TEXT',
          message,
        });
        setMessage('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      if (numberOfLines <= 3) {
        setNumberOfLines(numberOfLines + 1);
      }
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
      <FlatList
        style={styles.body}
        data={chats}
        renderItem={({ item }) => (
          <Message key={item.id} chat={item} conversation={conversation} />
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.footer}>
        <Reply
          text={message}
          onTextChange={(text) => setMessage(text)}
          placeholder="Message"
          onSendReply={onSendReply}
          numberOfLines={numberOfLines}
          onKeyPress={onKeyPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: normalize(16),
  },
  footer: {
    flexDirection: 'row',
  },
});

export default Conversion;
