import React, { useState } from 'react';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import SelectUserName from './selectUserName';
import SelectPassword from './selectPassword';
import SelectPhoneEmail from './selectPhoneEmail';



export type childScreenProps = {
    setData: React.Dispatch<React.SetStateAction<signUpProps>>;
    data: signUpProps;
    setErr: React.Dispatch<React.SetStateAction<signUpPropsErr>>;
    err: signUpPropsErr,
    setActiveScreen?: React.Dispatch<React.SetStateAction<signUpTabProps>>;
    activeScreen?: signUpTabProps
}

export type signUpTabProps = 'username' | 'password' | 'phoneEmail' | 'verifyPhone' | 'verifyEmail';

export type signUpProps = {
    username?: string,
    password?: string,
    phone?: string,
    countryCode?: string,
    email?: string,
}

export type signUpPropsErr = {
    username?: string,
    password?: string,
    phone?: string,
    email?: string,
}

export default function Signup() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const [data, setData] = useState<signUpProps>({});
    const [err, setErr] = useState<signUpPropsErr>({});
    const [activeScreen, setActiveScreen] = useState<signUpTabProps>('username');

    if (activeScreen == 'username')
        return (
            <SelectUserName
                setData={setData}
                data={data}
                setErr={setErr}
                err={err}
                setActiveScreen={setActiveScreen}
                activeScreen={activeScreen}
            />
        );

   else if (activeScreen == 'password')
        return (
            <SelectPassword
                setData={setData}
                data={data}
                setErr={setErr}
                err={err}
                setActiveScreen={setActiveScreen}
                activeScreen={activeScreen}
            />
        );
   else 
   //(activeScreen == 'phoneEmail')
        return (
            <SelectPhoneEmail
                setData={setData}
                data={data}
                setErr={setErr}
                err={err}
                setActiveScreen={setActiveScreen}
                activeScreen={activeScreen}
            />
        );

}

