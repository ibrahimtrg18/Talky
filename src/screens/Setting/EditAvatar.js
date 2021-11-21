// libraries
import React from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
// components
import Header from '../../components/Header';
import Button from '../../components/Button';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';

const EditAvatar = () => {
  const [photo, setPhoto] = React.useState(null);

  const onSelectPhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Avatar" showBack />
      <View style={styles.content}>
        {photo && (
          <>
            <Image source={{ uri: photo.assets[0].uri }} style={styles.image} />
          </>
        )}
        <Button title="Choose Photo" rounded={8} onPress={onSelectPhoto} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: normalize(16),
  },
});

export default EditAvatar;
