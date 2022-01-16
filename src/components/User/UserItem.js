import React, { useState } from 'react';
import { View, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
// components
import Text from '../Text';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
import { USER_AVATAR_IMAGE } from '../../apis';
// icons
import ChevronRightIcon from '../../assets/icons/iconChevronRight.svg';
// helpers
import { getFirstCharacter } from '../../helpers/commons';

const UserItem = ({ user, onUserClick }) => {
  const { width, height } = Dimensions.get('window');
  const [firstLetterName, setFirstLetterName] = useState('');

  const onImageError = () => {
    setFirstLetterName(getFirstCharacter(user.name));
  };

  return (
    <Pressable onPress={() => (onUserClick ? onUserClick() : null)}>
      <View style={styles.userItem}>
        {firstLetterName ? (
          <View
            style={[
              styles.userAvatar,
              { borderRadius: Math.round(width + height) / 2 },
              styles.userAvatarText,
            ]}
          >
            <Text color={Theme.white} size={20}>
              {firstLetterName}
            </Text>
          </View>
        ) : (
          <Image
            source={{
              uri: `${USER_AVATAR_IMAGE}?userId=${user.id}&time=${Date.now()}`,
            }}
            style={[
              styles.userAvatar,
              { borderRadius: Math.round(width + height) / 2 },
            ]}
            onError={(e) => onImageError(e)}
          />
        )}
        <View style={styles.userMid}>
          <View style={styles.userMidHead}>
            <Text style={styles.textTransform} color={Theme.text} size={16}>
              {user.name}
            </Text>
          </View>
        </View>
        <ChevronRightIcon width={24} height={24} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(8),
  },
  userLeft: {
    width: normalize(50),
    height: normalize(50),
  },
  userMid: {
    flex: 1,
    paddingHorizontal: normalize(8),
  },
  userMidHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    textTransform: 'capitalize',
  },
  userAvatar: {
    width: normalize(50),
    height: normalize(50),
  },
  userAvatarText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary,
  },
});

export default UserItem;
