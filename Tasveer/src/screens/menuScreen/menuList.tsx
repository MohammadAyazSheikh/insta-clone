

import uuid from "react-native-uuid";
import { useStyles } from "react-native-unistyles";
import IconMt from "@expo/vector-icons/MaterialIcons";
import IconIo from "@expo/vector-icons/Ionicons";
import IconEnt from "@expo/vector-icons/Entypo";
import IconFn from "@expo/vector-icons/Fontisto";
import IconFe from "@expo/vector-icons/Feather";
import IconOc from "@expo/vector-icons/Octicons";
import IconMtc from "@expo/vector-icons/MaterialCommunityIcons";
import IconAnt from "@expo/vector-icons/AntDesign";

import React from "react";

export type MenuListDataType = {
    id: string,
    title: string,
    Icon: React.ReactNode,
    routeName: string,
    onPress?: () => void,
}
export type itemType = {
    title: string,
    data: MenuListDataType[]
}


export function getMenu(): itemType[] {
    const { theme: { colors } } = useStyles();
    return (
        [
            {
                title: "How you use Tasveer",
                data: [
                    {
                        id: uuid.v4().toString(),
                        title: "Saved",
                        Icon: <IconIo name={'bookmark-outline'} color={colors.secondary1} size={24} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Archive",
                        Icon: <IconEnt name="back-in-time" size={24} color={colors.secondary1} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Your activity",
                        Icon: <IconFe name="activity" size={24} color={colors.secondary1} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Notification",
                        Icon: <IconIo name="notifications-outline" size={24} color={colors.secondary1} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Time management",
                        Icon: <IconIo name="time-outline" size={24} color={colors.secondary1} />,
                        routeName: "",
                    }
                ],

            },
            {
                title: "Who can see your content",
                data: [
                    {
                        id: uuid.v4().toString(),
                        title: "Account privacy",
                        Icon: <IconIo name="lock-closed-outline" size={24} color={colors.secondary1} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Close friends",
                        Icon: <IconAnt name="staro" size={24} color={colors.secondary1} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Blocked",
                        Icon: <IconMt name="block" size={24} color={colors.secondary1} />,
                        routeName: "",
                    },
                    {
                        id: uuid.v4().toString(),
                        title: "Hide Story",
                        Icon: <IconMt name="hide-source" size={24} color={colors.secondary1} />,
                        routeName: "",
                    }
                ],

            },

        ]
    )
}

