// libraries
import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
// components
import Header from '../../components/Header';
import Button from '../../components/Button';
// utils
import { normalize } from '../../utils/normalize';
import * as Theme from '../../utils/theme';
import { USER_AVATAR_IMAGE } from '../../utils/constants';
// actions
import {
  uploadUserAccountAvatar,
  fetchAccount,
} from '../../redux/actions/user';

const EditAvatar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [photo, setPhoto] = React.useState(null);
  const { width, height } = Dimensions.get('window');

  const onSelectPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropperCircleOverlay: true,
      cropping: true,
    })
      .then((image) => {
        console.log(JSON.stringify(image, null, 2));

        if (image) {
          setPhoto(image);
        }
      })
      .catch(() => {
        console.log('cancel');
      });
  };

  const onUploadPhoto = async () => {
    const data = new FormData();

    data.append('avatar', {
      name: photo.path.split('/').pop(),
      type: photo.mime,
      uri: photo.path,
    });

    await dispatch(uploadUserAccountAvatar(data));
    await dispatch(fetchAccount());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Avatar" showBack />
      <View style={styles.content}>
        {photo ? (
          <>
            <Image
              source={{ uri: photo.path }}
              style={[
                styles.avatar,
                { borderRadius: Math.round(width + height) / 2 },
              ]}
            />
            <Button
              title="Upload Photo"
              rounded={8}
              onPress={onUploadPhoto}
              style={[
                styles.actionBtn,
                {
                  width: width - normalize(128),
                },
              ]}
            />
          </>
        ) : (
          <Image
            source={{
              uri: `${USER_AVATAR_IMAGE}?userId=${auth.id}&time=${Date.now()}`,
            }}
            style={[
              styles.avatar,
              { borderRadius: Math.round(width + height) / 2 },
            ]}
          />
        )}
        <Button
          title="Choose Photo"
          rounded={8}
          onPress={onSelectPhoto}
          style={[
            styles.actionBtn,
            styles.choosePhotoBtn,
            {
              width: width - normalize(128),
            },
          ]}
          textColor={Theme.black}
        />
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
  avatar: {
    width: 300,
    height: 300,
    marginBottom: normalize(16),
    alignItems: 'center',
    resizeMode: 'contain',
  },
  actionBtn: {
    margin: normalize(8),
  },
  choosePhotoBtn: {
    backgroundColor: Theme.white,
    borderWidth: 1,
    borderColor: Theme.text,
    color: Theme.text,
  },
});

export default EditAvatar;
