// libraries
import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// components
import Text from './Text';
// icons
import ChevronLeft from '../assets/icons/iconChevronLeft.svg';

const AppBar = (props) => {
  const {
    showBack,
    title,
    leftContent,
    centerContent,
    rightContent,
    shadow,
    backgroundColor = Theme.white,
    ...restProps
  } = props;

  const navigation = useNavigation();

  const customBackgroundColor = { backgroundColor: backgroundColor };

  return (
    <View
      {...restProps}
      style={[styles.appBar, styles.appBarBoxShadow, customBackgroundColor]}
    >
      <View style={[styles.leftContent]}>
        {showBack ? (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft width={normalize(24)} height={normalize(24)} />
          </Pressable>
        ) : (
          leftContent && leftContent
        )}
      </View>
      <View
        style={[
          styles.centerContent,
          rightContent
            ? { paddingHorizontal: normalize(32) }
            : { paddingLeft: normalize(32) },
        ]}
      >
        {title ? (
          <Text weight={700} size={16}>
            {title}
          </Text>
        ) : (
          centerContent && centerContent
        )}
      </View>
      <View style={[styles.rightContent]}>{rightContent && rightContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: normalize(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  appBarBoxShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContent: {
    position: 'absolute',
    justifyContent: 'center',
    left: 16,
    zIndex: 2,
  },
  rightContent: {
    position: 'absolute',
    justifyContent: 'center',
    right: 16,
    zIndex: 2,
  },
});

export default AppBar;
