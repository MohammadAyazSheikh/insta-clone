import React, { useState } from 'react';
import {
  Modal,
  ViewProps,
  View,
  Text,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import Header from '../../general/screenHeader/header';
import TextBox from '../../general/textBox/textBox';
import CustomButton from '../../general/customButton/customButton';
import { Picker } from '@react-native-picker/picker';
import { fontStyle } from '../../../theme/fonts';


type modalType = {
  show: boolean;
  centerViewProps?: ViewProps;
  modalViewProps?: ViewProps;
  backDropProps?: ViewProps;
  title?: string,
  buttonText?: string,
  onCLose?: () => void;
  onButtonPress?: (value?: string, image?: string | null) => void;
};

type dataType = {
  balance?: number,
  description?: string,
  receiveAccount?: string,
  date?: Date
}

type dataErrType = {
  balanceErr?: string,
  descriptionErr?: string,
  receiveAccountErr?: string,
  dateErr?: string
}


const AddBalanceModal = ({
  show,
  onCLose = () => null,
  onButtonPress = () => null,
  centerViewProps,
  modalViewProps,
  backDropProps,
  title = 'Add Balance',
  buttonText = 'Submit',
}: modalType) => {
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();
  const [err, setError] = useState<dataErrType | null>(null);
  const [data, setData] = useState<dataType | null>(null);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={onCLose}>
        <View style={styles.backDrop} {...backDropProps} />
        <View style={styles.centeredView} {...centerViewProps}>
          <View style={styles.modalView} {...modalViewProps}>
            {/* header */}
            <Header title={title} onPressLeft={onCLose} />
            {/* body */}
            <View style={styles.body}>
              <View style={styles.row}>
                {/* Balance */}
                <TextBox
                  label={'Balance'}
                  keyboardType='decimal-pad'
                  placeholder="Ex: 100"
                  inputViewStyle={styles.inputStyle}
                  containerStyle={styles.inputContainer}
                  value={data?.balance?.toString()}
                  onChangeText={val => {
                    setData({
                      ...data,
                      balance: parseFloat(val) || undefined,
                    });

                    if (val) {
                      if (typeof parseFloat(val) == 'number' && parseFloat(val) < 0) {
                        setError({
                          ...err,
                          balanceErr: 'Invalid value',
                        });
                      } else {
                        setError({
                          ...err,
                          balanceErr: undefined,
                        });
                      }
                    }
                    else {
                      setError({
                        ...err,
                        balanceErr: 'please enter amount',
                      });
                    }
                  }}
                  error={err?.balanceErr}
                />
                {/* Description */}
                <TextBox
                  label={'Description'}
                  placeholder="Type.."
                  inputViewStyle={styles.inputStyle}
                  containerStyle={styles.inputContainer}
                  value={data?.description?.toString()}
                  onChangeText={val => {
                    setData({
                      ...data,
                      description: val,
                    });

                  }}
                  error={err?.descriptionErr}
                />
              </View>
              <View style={styles.row}>

                {/* Amount to */}
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.txtLabel}>Receive Account</Text>
                  <View style={styles.pickerViewStyle}>
                    <Picker
                      dropdownIconColor={colors.primary1}
                      style={styles.pickerContainerStyle}
                      selectedValue={data?.receiveAccount}
                      onValueChange={(itemValue, itemIndex) =>
                        setData({
                          ...data,
                          receiveAccount: itemValue,
                        })
                      }>
                      {
                        ['Cash', 'Standard Chartered'].map(item => (
                          <Picker.Item
                            key={item}
                            label={item} value={item}
                            style={styles.pickerItemStyle}

                          />
                        ))
                      }

                    </Picker>
                  </View>
                  {err?.receiveAccountErr ?
                    <Text style={[styles.txtErr, { alignSelf: 'center' }]}>{err.receiveAccountErr}</Text>
                    : null
                  }
                </View>
                {/* date */}
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.txtLabel}>Select Date</Text>
                  <CustomButton
                    style={styles.pickerViewStyle}
                    buttonText='2023-December-11'
                    textProps={{ style: styles.txtLabel }}
                  />
                  {err?.dateErr ?
                    <Text style={[styles.txtErr, { alignSelf: 'center' }]}>{err.dateErr}</Text>
                    : null
                  }
                </View>
              </View>

              <CustomButton
                buttonText={buttonText}
                style={styles.btnSubmitStyles}
                onPress={() => {
                  onButtonPress()
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AddBalanceModal;
