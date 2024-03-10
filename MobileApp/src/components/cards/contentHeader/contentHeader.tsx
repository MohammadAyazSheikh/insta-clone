import React from 'react';
import {
  Image,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEnt from 'react-native-vector-icons/Entypo';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { TextBold, TextRegular } from '../../general/text/text';
import UserAvatar from '../../general/avatar/avatar';
import LinearGradient from 'react-native-linear-gradient';



type bannerProps = {
  image?: any,
  title?: string,
  subtile?: string,
  time?: string,
  subtitleIcon?: React.ReactNode,
  containerStyles?: ViewStyle
  onMenuPress?: () => void,
  onTitlePress?: () => void,
}

const ContentHeader = ({
  image,
  title = 'Title',
  subtile = 'Hey You',
  subtitleIcon,
  time = '12h',
  containerStyles,
  onMenuPress = () => '',
  onTitlePress = () => '',
}: bannerProps) => {

  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();

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
      <View style={styles.centerView}>
        <View style={styles.row}>
          <TextBold style={styles.txtTitle}>
            {title}
          </TextBold>
          <TextRegular style={styles.txtSubtitle}>
            {time}
          </TextRegular>
        </View>
        {
          subtile ?
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onTitlePress}
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
            </TouchableOpacity>
            :
            null
        }
      </View>
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

    </View>
  );
};

export default ContentHeader;
