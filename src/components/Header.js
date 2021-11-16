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

const Header = ({ title, backgroundColor = Theme.white }) => {
  const navigation = useNavigation();

  const customBackgroundColor = { backgroundColor: backgroundColor };

  return (
    <View
      style={[styles.header, styles.headerBoxShadow, customBackgroundColor]}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <BackIcon width={28} height={28} style={styles.icon} />
      </Pressable>
      {title && <Text>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(12),
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
  icon: {
    marginRight: 8,
  },
});

export default Header;
