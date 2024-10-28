import React  from 'react';
import {View, Text, Image} from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { getShadow } from '../../../theme/platformSpecificStyles';
import uuid from 'react-native-uuid';
import {TouchableRipple} from 'react-native-paper';
import { Image as imageType } from 'react-native-image-crop-picker';
type prop = {
    imageList:imageType[]
}

export const ImageStackList = ({imageList = []}:prop) => {

    const { styles ,widthToDp:w} = useFunctionalOrientation(responsiveStyles);


  //we want to render less than 4 image box so getting length less than 4
  const imageBoxLen = imageList.slice(0, 3).length;
  const imageListBoxWidth = w(30);
  //image box offset from top of the container
  const imageListBoxTopOffset = 10;
  //image box offset from left of the container
  const imageListBoxLeftOffset = (imageListBoxWidth / 100) * 40;
  // width of container of image box = 1st box of full width + remaining box offset
  const imageListViewWidth =
    imageListBoxWidth + (imageBoxLen - 1) * imageListBoxLeftOffset;

  return (

      <View
        style={[
          styles.imageListView,
          {
            width: imageListViewWidth,
            height:
              // height of container =  width + total offset from top of container
              imageListBoxWidth + imageListBoxTopOffset * (imageBoxLen - 1),
          },
        ]}>
        {
          //render only 3 element
          imageList.slice(0, 3).map((item, index) => (
            // image box
            <View
              key={uuid.v4().toString()}
              style={[
                styles.imageListItemView,
                {
                  width: imageListBoxWidth - 14 + index * 7,
                  left: index * imageListBoxLeftOffset,
                  top:
                    (imageListBoxWidth / 100) * imageListBoxTopOffset * index,
                  ...getShadow({
                    elevation: index * 10,
                    shadowRadius: index * 10,
                  }),
                },
              ]}>
              {
                //   if more than 3 images render last image with more text
                imageList.length > 3 && index == 2 ? (
                  <View style={styles.lastImageBoxStyle}>
                    <Image source={{uri: item.path}} style={styles.imgChatMulti} />
                    <View style={styles.lastImageBoxOverlay}>
                      <Text style={styles.txtMoreImage}>
                        + {imageList.length - imageBoxLen}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Image source={{uri: item.path}} style={styles.imgChatMulti} />
                )
              }
            </View>
          ))
        }
      </View>
     
  );
};
