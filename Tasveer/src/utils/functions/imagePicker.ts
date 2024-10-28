import ImagePickerMultiple, { Image, Video } from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { grantStoragePermission } from '../permissions/permissions';

///-----for multiple image selection---------
export const pickMultipleImage = (callback: (images: Image[]) => void) => {
    grantStoragePermission().then(() => {
        ImagePickerMultiple.openPicker({
            multiple: true,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 1,
            includeBase64: false,
        })
            .then(images => {
                callback && callback(images);
            })
            .catch(err => {
                console.log(err);
            });
    })

};



///-----for single video selection---------
export const pickSingleVideo = () => {
    return grantStoragePermission().then(() => {
        return launchImageLibrary({
            mediaType: 'video'
        })
            .catch(err => {
                console.error("Error Video Picker: ", err)
            })


    })

};

export const captureImage = () => {
    return launchCamera({ mediaType: 'image' })
        .catch((err) => console.log("launch camera error: ", err))
}


///-----for single image selection---------
export const pickImage = () => {
    return grantStoragePermission().then(() => {
        return ImagePickerMultiple.openPicker({
            multiple: false,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 1,
            includeBase64: false,
        })
            .catch(err => console.log("ImagePicker Error"))
    })

};
