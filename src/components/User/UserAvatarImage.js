// libraries
import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
// components
import Text from '../../components/Text';
// apis
import { USER_AVATAR_IMAGE } from '../../apis';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// helpers
import { getFirstCharacter } from '../../helpers/commons';

const UserAvatarImage = (props) => {
  const {
    name = '?',
    userId,
    textSize = 20,
    backgroundColor = Theme.primary,
  } = props;
  const { width, height } = Dimensions.get('window');
  const [firstLetterName, setFirstLetterName] = useState('');

  const onImageError = () => {
    setFirstLetterName(getFirstCharacter(name));
  };

  return (
    <>
      {firstLetterName ? (
        <View
          style={[
            styles.userAvatar,
            styles.userAvatarText,
            props.width && { width: normalize(props.width) },
            props.height && { height: normalize(props.height) },
            { borderRadius: Math.round(width + height) / 2 },
            { backgroundColor },
          ]}
        >
          <Text color={Theme.white} size={textSize}>
            {firstLetterName}
          </Text>
        </View>
      ) : (
        <Image
          source={{
            uri: `${USER_AVATAR_IMAGE}?userId=${userId}`,
          }}
          style={[
            styles.userAvatar,
            props.width && { width: normalize(props.width) },
            props.height && { height: normalize(props.height) },
            { borderRadius: Math.round(width + height) / 2 },
          ]}
          onError={(e) => onImageError(e)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
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

export default UserAvatarImage;
