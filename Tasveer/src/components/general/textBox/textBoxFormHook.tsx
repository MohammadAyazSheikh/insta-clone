import React from 'react';
import { useController, FieldValues, Control, RegisterOptions } from 'react-hook-form';
import TextBox, { textBoxProp } from './textBox';
import { TextInput } from 'react-native-paper';

type props = {
    control: Control<FieldValues> | undefined ,
    name: string,
    rules: RegisterOptions,
    usePaper?: boolean,
} & textBoxProp;

const TextBoxHookForm = ({ usePaper, name, control, error, rules, ...otherProps }: props) => {
    const {
        field: {
            value,
            onChange,
            onBlur,
        }
    } = useController({
        control,
        name,
        rules,
    });
    return (
        // <Controller
        //     control={control}
        //     rules={rules}
        //     render={({ field: { onChange, onBlur, value } }) => (
        //         <TextBox
        //             {...otherProps}
        //             value={value}
        //             onChangeText={onChange}
        //             error={error}
        //         />
        //     )}
        //     name={name}
        // />
        usePaper ?
            <TextInput
                value={value}
                onChangeText={onChange}
                error={!!error}
                // {...otherProps}
            />
            :
            <TextBox
                {...otherProps}
                value={value}
                onChangeText={onChange}
                // onBlur={onBlur}
                error={error}
            />
    )
}

export default TextBoxHookForm;