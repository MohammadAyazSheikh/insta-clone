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
  totalDue?: number,
  paidAmount?: number,
  accountTo?: string,
}

type dataErrType = {
  totalDueErr?: string,
  paidAmountErr?: string,
  accountToErr?: string,
}


const AddNewPayModal = ({
  show,
  onCLose = () => null,
  onButtonPress = () => null,
  centerViewProps,
  modalViewProps,
  backDropProps,
  title = 'Add Pay',
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
                {/* Total due amount */}
                <TextBox
                  label={'Total Due'}
                  placeholder="Ex: 100"
                  inputViewStyle={styles.inputStyle}
                  containerStyle={styles.inputContainer}
                  value={data?.paidAmount?.toString()}
                  onChangeText={val => {
                    setData({
                      ...data,
                      totalDue: parseFloat(val) || undefined,
                    });

                    if (val) {
                      if (typeof parseFloat(val) == 'number' && parseFloat(val) < 0) {
                        setError({
                          ...err,
                          totalDueErr: 'Invalid value',
                        });
                      } else {
                        setError({
                          ...err,
                          totalDueErr: undefined,
                        });
                      }
                    }
                    else {
                      setError({
                        ...err,
                        totalDueErr: 'please enter amount',
                      });
                    }
                  }}
                  error={err?.totalDueErr}
                />
                {/* Paid Amount */}
                <TextBox
                  label={'Paid Amount'}
                  placeholder="Ex: 100"
                  inputViewStyle={styles.inputStyle}
                  containerStyle={styles.inputContainer}
                  value={data?.paidAmount?.toString()}
                  onChangeText={val => {
                    setData({
                      ...data,
                      paidAmount: parseFloat(val) || undefined,
                    });

                    if (val) {
                      if (typeof parseFloat(val) == 'number' && parseFloat(val) < 0) {
                        setError({
                          ...err,
                          paidAmountErr: 'Invalid value',
                        });
                      } else {
                        setError({
                          ...err,
                          paidAmountErr: undefined,
                        });
                      }
                    }
                    else {
                      setError({
                        ...err,
                        paidAmountErr: 'please enter amount',
                      });
                    }
                  }}
                  error={err?.paidAmountErr}
                />
              </View>
              <View style={styles.row}>
                {/* Remaining Dues */}
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.txtLabel}> Remaining Dues </Text>
                  <View style={[styles.pickerViewStyle, styles.dueView, { justifyContent: 'flex-start', paddingLeft: 10 }]}>
                    <Text
                      allowFontScaling={fontStyle.fontScale}
                      style={styles.txtLabel}
                    >
                      0.0
                    </Text>
                  </View>
                </View>
                {/* Amount to */}
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.txtLabel}>Amount To</Text>
                  <View style={styles.pickerViewStyle}>
                    <Picker
                      dropdownIconColor={colors.primary1}
                      style={styles.pickerContainerStyle}
                      selectedValue={data?.accountTo}
                      onValueChange={(itemValue, itemIndex) =>
                        setData({
                          ...data,
                          accountTo: itemValue,
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
                  {err?.accountToErr ?
                    <Text style={[styles.txtErr, { alignSelf: 'center' }]}>{err.accountToErr}</Text>
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
export default AddNewPayModal;
