// libraries
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
// components
import Text from '../components/Text';
// icons
import ChevronLeft from '../assets/icons/iconChevronLeft.svg';

const Header = (props) => {
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
      style={[
        styles.header,
        shadow && styles.headerBoxShadow,
        customBackgroundColor,
      ]}
    >
      <View style={styles.leftContent}>
        {showBack ? (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft
              width={normalize(24)}
              height={normalize(24)}
              style={styles.icon}
            />
          </Pressable>
        ) : (
          leftContent && <View>{leftContent}</View>
        )}
      </View>
      <View>
        {title ? (
          <Text weight={700} size={18}>
            {title}
          </Text>
        ) : (
          centerContent && <View>{centerContent}</View>
        )}
      </View>
      <View style={styles.rightContent}>{rightContent && rightContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: normalize(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  headerBoxShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 2,
  },
  icon: {},
  leftContent: {
    alignItems: 'flex-start',
    marginLeft: normalize(16),
  },
  rightContent: {
    alignItems: 'flex-end',
    marginRight: normalize(16),
  },
});

export default Header;
