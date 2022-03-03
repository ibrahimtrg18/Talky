// libraries
import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
// components
import Text from '../../components/Text';
// utils
import * as Theme from '../../utils/theme';
// helpers
import { getFirstCharacter } from '../../helpers/commons';

const UserAvatarImage = (props) => {
  const {
    name = '',
    src,
    textSize = 20,
    backgroundColor = Theme.primary,
  } = props;
  const { width, height } = Dimensions.get('window');
  const [firstLetterName, setFirstLetterName] = useState('');

  const onImageError = () => {
    setFirstLetterName(getFirstCharacter(name));
  };

  if (!name) {
    return null;
  }

  if (firstLetterName) {
    return (
      <View
        style={[
          styles.userAvatar,
          styles.userAvatarText,
          props.width && { width: props.width },
          props.height && { height: props.height },
          { borderRadius: Math.round(width + height) / 2 },
          { backgroundColor },
          props.style,
        ]}
      >
        <Text color={Theme.white} size={textSize}>
          {firstLetterName}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{
        uri: src,
      }}
      style={[
        styles.userAvatar,
        props.width && { width: props.width },
        props.height && { height: props.height },
        { borderRadius: Math.round(width + height) / 2 },
        props.style,
      ]}
      onError={(e) => onImageError(e)}
    />
  );
};

const styles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
  },
  userAvatarText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary,
  },
});

export default UserAvatarImage;
