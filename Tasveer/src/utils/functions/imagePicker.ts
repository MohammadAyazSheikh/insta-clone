import ImagePickerMultiple, { Image, Video } from 'react-native-image-crop-picker';
import { grantStoragePermission } from '../permissions/permissions';
import { showDismissAlert } from '../../components/general/alerts/dismissAlert';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
        .catch(err => {
            showDismissAlert({ title: "You denied permission" })
        })


};


///-----for single image selection---------
export const pickImage = (callback: (image: Image) => void) => {
    return grantStoragePermission().then(() => {
        return ImagePickerMultiple.openPicker({
            multiple: false,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 1,
            includeBase64: false,
        })
            .then(image => {
                callback && callback(image);
            })
            .catch(err => {
                console.log(err);
            })
    })
        .catch(err => {
            showDismissAlert({ title: "You denied permission" });
        })

};

// ///-----for single video selection---------
// export const pickSingleVideo = () => {
//     return grantStoragePermission().then(() => {
//         return launchImageLibrary({
//             mediaType: 'video'
//         })
//             .catch(err => {
//                 console.error("Error Video Picker: ", err)
//             })


//     })

// };

// export const captureImage = () => {
//     return launchCamera({ mediaType: 'image' })
//         .catch((err) => console.log("launch camera error: ", err))
// }



