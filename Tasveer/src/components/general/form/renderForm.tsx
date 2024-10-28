import React, { useState } from 'react';
import { View, TextInput, TextInputProps, ViewStyle, Text } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import uuid from 'react-native-uuid';
import TextBox from '../textBox/textBox';

type inputProps = TextInputProps;

type formProps<T> = {
  containerStyle?: ViewStyle;
  inputList: inputType[];
  data: T | any,
  setData: React.Dispatch<T | any>,
  err: T | any,
  setErr: React.Dispatch<T | any>,
}

const Form = <T,>({
  containerStyle = {},
  inputList = [],
  data,
  setData,
  err,
  setErr
}: formProps<T>) => {
  const { styles } = useFunctionalOrientation(responsiveStyles);
  return (
    <View style={[styles.container, containerStyle]}>
      {
        inputList.map(input => (
          <TextBox
            key={input.name}
            keyboardType={input?.keyboardType}
            placeholder={input?.placeHolder}
            label={input?.label}
            error={err[input?.name]}
            value={data[input?.name]}
            onChangeText={(value) => {
              setData({
                ...data,
                [input?.name]: value,
              })
              if (input?.required && !value) {
                setErr({
                  ...err,
                  [input?.name]: `${input.name} is required`,
                })
              }
              else {
                setErr({
                  ...err,
                  [input?.name]: null,
                })
              }
            }}
          />
        ))
      }
    </View>
  );
};

export default Form;
