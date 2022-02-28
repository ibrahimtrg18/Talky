import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
// apis
import UploadsAPI from '../../apis/UploadsAPI';
// components
import Text from '../Text';
import UserAvatarImage from '../User/UserAvatarImage';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// icons
import ChevronRightIcon from '../../assets/icons/iconChevronRight.svg';

const ConversationItem = ({ conversation, user }) => {
  const uploadsAPI = new UploadsAPI();
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('Conversation', { conversationId: conversation.id });
  };

  return (
    <Pressable onPress={onClick} android_ripple={{ color: Theme.gray100 }}>
      <View style={styles.conversation}>
        <UserAvatarImage
          name={user?.name}
          src={`${uploadsAPI.userAvatar(user?.avatar)}`}
          width={normalize(48)}
          height={normalize(48)}
          style={[styles.avatar]}
        />
        <View style={styles.user}>
          <View style={styles.title}>
            <Text
              style={styles.userName}
              color={Theme.text}
              weight={600}
              size={16}
            >
              {user.name}
            </Text>
            <Text style={styles.time} color={Theme.gray} weight={400} size={10}>
              {moment(conversation.updated_at).fromNow()}
            </Text>
          </View>
          <Text style={styles.body} color={Theme.dark} weight={400} size={14}>
            {conversation.lastMessage}
          </Text>
        </View>
        <ChevronRightIcon width={normalize(24)} height={normalize(24)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  conversation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(20),
  },
  avatar: {
    marginRight: normalize(16),
  },
  user: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    marginRight: normalize(4),
  },
  userName: {
    textTransform: 'capitalize',
  },
  body: {},
});

export default ConversationItem;
