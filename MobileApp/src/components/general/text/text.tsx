import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { fontConfig, fontFamily } from "../../../theme/fonts";

type textProps = {
    children?: React.ReactNode
}
    & TextProps

export const TextRegular = ({
    children,
    ...rest
}: textProps) => (
    <Text
        allowFontScaling={fontConfig.allowScaling}
        {...rest}
        style={[style.regular, style.common, rest.style,]}
    >
        {children || ''}
    </Text>
);

export const TextBold = ({
    children,
    ...rest
}: textProps) => (
    <Text
        allowFontScaling={fontConfig.allowScaling}
        {...rest}
        style={[style.bold, style.common, rest.style,]}
    >
        {children || ''}
    </Text>
);

export const TextItalic = ({
    children,
    ...rest
}: textProps) => (
    <Text
        allowFontScaling={fontConfig.allowScaling}
        {...rest}
        style={[style.italic, style.common, rest.style,]}
    >
        {children || ''}
    </Text>
);

export const TextBoldItalic = ({
    children,
    ...rest
}: textProps) => (
    <Text
        allowFontScaling={fontConfig.allowScaling}
        {...rest}
        style={[style.boldItalic, style.common, rest.style,]}
    >
        {children || ''}
    </Text>
);


const style = StyleSheet.create({
    regular: {
        fontFamily: fontFamily.regular,
    },
    bold: {
        fontFamily: fontFamily.bold,
    },
    boldItalic: {
        fontFamily: fontFamily.boldItalic,
    },
    italic: {
        fontFamily: fontFamily.italic,
    },
    common: {
        fontSize: 14,
    }
})