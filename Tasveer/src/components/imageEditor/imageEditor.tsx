import PhotoEditor from "@baronha/react-native-photo-editor";
import { pickImage } from '../../utils/functions/imagePicker';


function openEditor(): Promise<string> {
    return pickImage(async (img) => {
        try {
            const result = await PhotoEditor.open({
                path: `data:${img.mime};base64,${img.data}`!,
                stickers: []
            });
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }, { includeBase64: true })
}




export default openEditor;