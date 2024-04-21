import React from 'react';
import { ScrollView } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import CustomButton from '../../components/general/customButton/customButton';
import { useAppDispatch } from '../../redux/hooks';
import TextBox from '../../components/general/textBox/textBox';
import IconAnt from 'react-native-vector-icons/AntDesign'
import { TextRegular } from '../../components/general/text/text';
import { childScreenProps } from './signupScreen';
import { isValidUsername } from '../../utils/functions/validations';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';




export default function SelectUserName({
    setData,
    setErr,
    data,
    err,
    setActiveScreen,
}: childScreenProps) {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const dispatch = useAppDispatch();



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.scroll}>
                <Animated.View
                    style={styles.containerChild}
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                >
                    <TextRegular
                        style={styles.txtChildTitle}
                    >
                        Choose username
                    </TextRegular>

                    <TextRegular
                        style={styles.txtChildSubTitle}
                    >
                        You can always change it later.
                    </TextRegular>
                    {/* ----Text input---- */}
                    <TextBox
                        placeholder='Ex: john123'
                        value={data?.username}
                        onChangeText={(value) => {
                            setData({
                                ...data,
                                username: value
                            });
                            if (!isValidUsername(value)) {
                                setErr({
                                    ...err,
                                    username: 'Username can only be use letters, numbers, underscores and periods.'
                                });
                            } else {
                                setErr({
                                    ...err,
                                    username: '',
                                })
                            }
                        }}
                        error={err.username}
                        iconRight={<RenderIcon
                            setData={setData}
                            setErr={setErr}
                            err={err}
                            data={data}
                        />
                        }
                    />
                    {/* Next button */}
                    <CustomButton
                        disabled={Boolean(!data?.username || err?.username)}
                        buttonText='Next'
                        onPress={() => setActiveScreen && setActiveScreen('password')}
                    />
                </Animated.View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const RenderIcon = ({ err, data, setData, setErr }: childScreenProps) => {
    const colors = useAppThemeColors();
    if (!data.username) {
        return null;
    }
    if (!err.username && data.username) {
        return <IconAnt
            size={24}
            name='check'
            color={'#3BB75C'}
        />
    }
    if (err.username && data.username) {
        return <IconAnt
            onPress={() => {
                setErr({
                    ...err,
                    username: ''
                });
                setData({
                    ...data,
                    username: '',
                })
            }}
            size={24}
            name='close'
            color={colors.grey1}
        />
    }

}
