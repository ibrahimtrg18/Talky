// libraries
import React, { useMemo, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
// libraries
import { useDispatch, useSelector } from 'react-redux';
// components
import AppBar from '../components/AppBar';
import UserAvatarImage from '../components/User/UserAvatarImage';
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
import { Socket } from '../utils/socket';
// apis
import UploadsAPI from '../apis/UploadsAPI';

const Conversion = ({ navigation, route }) => {
  const { conversationId } = route.params;
  const dispatch = useDispatch();
  const uploadsAPI = new UploadsAPI();
  const [message, setMessage] = useState('');
  const [otherUsersConversation, setOtherUserConversation] = useState([]);
  const [numberOfLines, setNumberOfLines] = useState(1);

  const auth = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation);
  const conversationUsers = useSelector((state) =>
    Object.values(state.conversation.users),
  );
  const chats = useSelector((state) => Object.values(state.conversation.chats));
  const socket = useMemo(() => new Socket(auth.access_token), []);

  useEffect(() => {
    socket.initiateSocket();

    socket.subscribeSocket('createChat', async (msg) => {
      dispatch(addConversationChat(msg.data));
    });

    return () => socket.disconnectSocket();
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
        socket.sendSocket('createChat', {
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
      <AppBar
        showBack
        title={otherUsersConversation[0]?.name}
        rightContent={
          <Pressable
            onPress={() =>
              navigation.navigate('Profile', {
                userId: otherUsersConversation[0]?.id,
              })
            }
          >
            <UserAvatarImage
              name={otherUsersConversation[0]?.name}
              src={`${uploadsAPI.userAvatar(
                otherUsersConversation[0]?.avatar,
              )}`}
              textSize={12}
              width={normalize(32)}
              height={normalize(32)}
            />
          </Pressable>
        }
      />
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
