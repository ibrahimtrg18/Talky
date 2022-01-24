// libraries
import React from 'react';
import { SafeAreaView, FlatList, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
// components
import AppBar from '../../components/AppBar';
import Text from '../../components/Text';
// actions
import { userLogout } from '../../redux/actions';
// icons
import ImageIcon from '../../assets/icons/iconImage.svg';
import UserIcon from '../../assets/icons/iconUser.svg';
import LockIcon from '../../assets/icons/iconLock.svg';
import LogOutIcon from '../../assets/icons/iconLogOut.svg';

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();

  const MENUS = [
    {
      id: 'editAvatar',
      icon: ImageIcon,
      title: 'Edit Avatar',
      navigate: 'EditAvatar',
    },
    {
      id: 'editProfile',
      icon: UserIcon,
      title: 'Edit Profile',
      navigate: 'EditProfile',
    },
    {
      id: 'editPassword',
      icon: LockIcon,
      title: 'Edit Password',
      navigate: 'EditPassword',
    },
    {
      id: 'logout',
      icon: LogOutIcon,
      title: 'Logout',
      callback: () => {
        dispatch(userLogout());
      },
    },
  ];

  const Menu = ({ Icon, title, navigate, callback }) => {
    return (
      <Pressable
        onPress={() => {
          if (callback) callback();
          if (navigate) navigation.navigate(navigate);
        }}
        style={styles.menuItem}
      >
        <Icon
          style={styles.menuItemIcon}
          width={normalize(24)}
          height={normalize(24)}
        />
        <Text>{title}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar showBack title="Setting" />
      <FlatList
        data={MENUS}
        renderItem={({ item }) => (
          <Menu
            key={item.id}
            Icon={item.icon}
            title={item.title}
            navigate={item.navigate}
            callback={item.callback}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.white,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
    marginVertical: normalize(4),
  },
  menuItemIcon: {
    marginRight: normalize(8),
  },
});

export default Setting;
