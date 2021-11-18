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
import BackIcon from '../assets/icons/iconBack.svg';

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
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.leftContent}
          >
            <BackIcon width={28} height={28} style={styles.icon} />
          </Pressable>
        ) : (
          leftContent && <View>{leftContent}</View>
        )}
      </View>
      <View>
        {title ? (
          <Text weight={700} fontSize={18}>
            {title}
          </Text>
        ) : (
          centerContent && <View>{centerContent}</View>
        )}
      </View>
      <View style={styles.rightContent}>
        {rightContent && <View>{rightContent}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: normalize(56),
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(12),
    justifyContent: 'space-between',
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
    minWidth: normalize(48),
  },
  rightContent: {
    minWidth: normalize(48),
    backgroundColor: Theme.dark,
  },
});

export default Header;
