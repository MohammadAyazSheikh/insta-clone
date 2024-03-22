import DocumentPicker from 'react-native-document-picker';

export const pickSingleDocument = () => {
    return DocumentPicker.pickSingle({
        type: DocumentPicker.types.allFiles,
        presentationStyle: 'any'
    },)
        .catch(err => {
            console.error("Doc Picker error: ", err)
        })
}