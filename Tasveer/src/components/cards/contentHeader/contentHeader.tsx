import React from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import IconMtc from '@expo/vector-icons/MaterialCommunityIcons';
import IconEnt from '@expo/vector-icons/Entypo';
import IconAnt from '@expo/vector-icons/AntDesign';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { TextBold, TextRegular } from '../../general/text/text';
import UserAvatar from '../../general/avatar/avatar';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';





type bannerProps = {
  image?: any,
  title?: string,
  subtile?: string,
  time?: string,
  subtitleIcon?: React.ReactNode,
  containerStyles?: ViewStyle
  onMenuPress?: () => void,
  onTitlePress?: () => void,
  onCancel?: () => void
}

const ContentHeader = ({
  image,
  title = 'Title',
  subtile = 'Hey You',
  subtitleIcon,
  time,
  containerStyles,
  onMenuPress = () => '',
  onTitlePress = () => '',
  onCancel
}: bannerProps) => {

  const { styles, theme: { colors } } = useStyles(styleSheet);

  const icon = <IconMtc
    name={"movie-play"}
    color={colors.secondary1}
    size={14}
  />
  return (
    <View style={[styles.container, containerStyles]}>
      {/* gradient for back faded view*/}
      {/* <LinearGradient
        colors={[
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.0)",
        ]}
        style={[styles.gradientView]}
      /> */}
      <UserAvatar
        image={image}
        size={50}
        name={title}
      />
      {/* -----center view ---- */}
      <TouchableOpacity
        style={styles.centerView}
        onPress={onTitlePress}
        activeOpacity={0.7}
      >
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <TextBold style={styles.txtTitle} numberOfLines={1}>
              {title}
            </TextBold>
          </View>
          {time ?
            <TextRegular style={styles.txtSubtitle}>
              {time}
            </TextRegular>
            :
            null
          }
        </View>
        {
          subtile ?
            <View
              style={styles.row}
            >
              {
                subtitleIcon ?
                  subtitleIcon
                  :
                  icon
              }
              <TextRegular style={styles.txtSubtitle}>
                {subtile}
              </TextRegular>
            </View>
            :
            null
        }
      </TouchableOpacity>
      {/* ---- Menu button ---- */}
      <ButtonRipple
        onPress={onMenuPress}
        style={styles.btnMenu}
      >
        <IconEnt
          name={"dots-three-vertical"}
          color={colors.secondary1}
          size={14}
        />
      </ButtonRipple>
      {onCancel && <ButtonRipple
        onPress={onCancel}
        style={styles.btnMenu}
      >
        <IconAnt
          name={"close"}
          color={colors.secondary1}
          size={14}
        />
      </ButtonRipple>}
    </View>
  );
};

export default ContentHeader;
