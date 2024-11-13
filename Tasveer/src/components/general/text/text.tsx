import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { fontConfig, fontFamily } from "../../../theme/fonts";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type textProps = {
    children?: React.ReactNode
}
    & TextProps

export const TextRegular = ({
    children,
    ...rest
}: textProps) => {
    const { styles } = useStyles(styleSheet);
    return (
        <Text
            allowFontScaling={fontConfig.allowScaling}
            {...rest}
            style={[styles.regular, styles.common, rest.style,]}
        >
            {children || ''}
        </Text>
    )
};

export const TextBold = ({
    children,
    ...rest
}: textProps) => {
    const { styles } = useStyles(styleSheet);
    return (
        <Text
            allowFontScaling={fontConfig.allowScaling}
            {...rest}
            style={[styles.bold, styles.common, rest.style,]}
        >
            {children || ''}
        </Text>
    )
};

export const TextSemiBold = ({
    children,
    ...rest
}: textProps) => {
    const { styles } = useStyles(styleSheet);
    return (
        <Text
            allowFontScaling={fontConfig.allowScaling}
            {...rest}
            style={[styles.semiBold, styles.common, rest.style,]}
        >
            {children || ''}
        </Text>
    )
};

export const TextItalic = ({
    children,
    ...rest
}: textProps) => {
    const { styles } = useStyles(styleSheet);
    return (
        <Text
            allowFontScaling={fontConfig.allowScaling}
            {...rest}
            style={[styles.italic, styles.common, rest.style,]}
        >
            {children || ''}
        </Text>
    )
};

export const TextBoldItalic = ({
    children,
    ...rest
}: textProps) => {
    const { styles } = useStyles(styleSheet);
    return (
        <Text
            allowFontScaling={fontConfig.allowScaling}
            {...rest}
            style={[styles.boldItalic, styles.common, rest.style,]}
        >
            {children || ''}
        </Text>
    )
};



const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors, fontSize } = theme;
    return ({
        regular: {
            fontFamily: fontFamily.regular,
        },
        bold: {
            fontFamily: fontFamily.bold,
        },
        semiBold: {
            fontFamily: fontFamily.semiBold,
        },
        boldItalic: {
            fontFamily: fontFamily.boldItalic,
        },
        italic: {
            fontFamily: fontFamily.italic,
        },
        common: {
            fontSize: fontSize.md,
            color: colors.secondary1,
        }
    })
})
