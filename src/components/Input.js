import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
// utils
import { normalize } from '../utils/normalize';
import * as Theme from '../utils/theme';
import { getFontWeight } from '../utils/getFontWeight';
// icons
import EyeIcon from '../assets/icons/iconEye.svg';

const Input = React.forwardRef(
  (
    {
      size,
      weight,
      rounded,
      style,
      type,
      showPassword,
      setShowPassword,
      ...props
    },
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const customFontSize = size && { fontSize: normalize(size) };
    const customRounded = rounded && { borderRadius: rounded };
    const customWeight = getFontWeight(weight || 500);

    const onTextInputFocus = () => {
      setIsFocus({
        backgroundColor: Theme.white,
        borderColor: Theme.primary,
        color: Theme.text,
      });
    };

    const onTextInputBlur = () => {
      setIsFocus({
        backgroundColor: Theme.background,
        borderColor: Theme.border,
        color: Theme.text,
      });
    };

    if (type === 'password') {
      return (
        <View style={styles.container}>
          <TextInput
            {...props}
            ref={ref}
            style={[
              styles.input,
              customFontSize,
              customWeight,
              customRounded,
              isFocus,
              style,
            ]}
            onFocus={onTextInputFocus}
            onBlur={onTextInputBlur}
          />
          <EyeIcon
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
      );
    }

    return (
      <TextInput
        {...props}
        ref={ref}
        style={{
          ...styles.input,
          ...customFontSize,
          ...customWeight,
          ...customRounded,
          ...isFocus,
          ...style,
        }}
        onFocus={onTextInputFocus}
        onBlur={onTextInputBlur}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: 16,
    transform: [{ translateY: -23 }],
  },
  input: {
    backgroundColor: Theme.background,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Theme.border,
    color: Theme.text,
    fontSize: normalize(14),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(10),
  },
});

export default Input;
